# 07 — Revisao Agentica (F30)

## 7.1 Objetivo

A revisao agentica e o passo que transforma achados automaticos em decisoes rastreadas. Para cada achado, um agente de IA le o **codigo real** (+-30 linhas de contexto) e decide se o ponto e uma **raiz** que precisa de alteracao ou um **downstream** que sera resolvido pela correcao da raiz.

Este processo e o que separa a analise de uma simples busca textual — cada decisao e fundamentada em leitura de codigo, com justificativa documentada.

## 7.2 Schema de Entrada (TR_B####.csv)

Cada batch de revisao contem achados enriquecidos:

| Campo | Tipo | Descricao |
|-------|------|-----------|
| `id_achado` | hash | Identificador unico do achado |
| `fonte_pipeline` | enum | F01-F12_MAIN, F13-F22_GAP, etc. |
| `sistema` | string | SEGBR, ULTRON, SIMULADORES |
| `repositorio` | string | Nome do repositorio |
| `arquivo` | path | Caminho relativo ao arquivo |
| `linha` | int | Numero da linha flagada |
| `token_campo` | string | Variavel/campo detectado |
| `classificacao_doc` | enum | CNPJ, CPF, MISTA, IND |
| `contexto_codigo` | text | +-30 linhas ao redor da linha flagada |
| `chamadores_no_repo` | text | Arquivos no mesmo repo que chamam este metodo |
| `cruzamento_sql_model` | text | Coluna SQL correspondente (se existe) |

## 7.3 Schema de Saida (TR_B####_reviewed.csv)

| Campo | Valores Validos | Regras |
|-------|----------------|--------|
| `decisao_revisada` | CONFIRMA_ALTERAR, DOWNSTREAM_ABSORVIDO, UPSTREAM_ADICIONAR, FALSO_POSITIVO, INCONCLUSIVO | Nunca vazio |
| `escopo_impacto` | LOCAL, INTRA_ARQUIVO, CROSS_ARQUIVO, CROSS_REPOSITORIO | Indica raio de impacto |
| `raiz_arquivo` | path | Obrigatorio se DOWNSTREAM_ABSORVIDO |
| `raiz_linha` | int | Obrigatorio se DOWNSTREAM_ABSORVIDO |
| `cascata_cross_arquivo` | `arquivo:linha:motivo;...` | Obrigatorio se UPSTREAM_ADICIONAR |
| `sql_migration` | SIM, NAO, VERIFICAR | SIM requer `sql_detalhe` |
| `sql_detalhe` | text | ALTER TABLE concreto quando aplicavel |
| `motivo_detalhado` | text (4 partes) | Min 2 frases: ANTES -> DEPOIS |
| `status_lote` | REVIEWED, INCONCLUSIVO | Status de conclusao do batch |

## 7.4 Taxonomia de Decisoes

### CONFIRMA_ALTERAR (CA)

**Significado**: Esta linha e a **raiz do problema** — uma operacao que assume CNPJ numerico.

**Criterios**:
- Coercao numerica explicita (`Long.parseLong`, `CAST AS BIGINT`, `CLng`)
- Declaracao de tipo numerico para campo CNPJ (`int nr_cnpj`, `BIGINT`)
- Regex/mascara que rejeita alfanumerico (`[0-9]{14}`)
- Strip de nao-digitos em campo CNPJ (`replaceAll(\D)`)

**Exemplo**:
```java
// Linha 45 de CnpjValidator.java
long cnpjNumerico = Long.parseLong(cnpj.replaceAll("\\D", ""));
// Decisao: CONFIRMA_ALTERAR
// Motivo: parseLong forca CNPJ como numerico; replaceAll remove letras validas
```

### DOWNSTREAM_ABSORVIDO (DA)

**Significado**: Esta linha **usa** um valor ja processado pela raiz — quando a raiz for corrigida, este ponto sera automaticamente resolvido.

**Criterios**:
- Usa variavel que recebeu valor de uma funcao/campo ja marcado como CA
- Chama metodo que internamente faz coercao (ja flagado)
- Propaga valor sem nova operacao numerica

**Campos obrigatorios**: `raiz_arquivo` + `raiz_linha` (onde esta a raiz)

**Exemplo**:
```java
// Linha 78 de PropostaService.java
String cnpjFormatado = formatarCnpj(cnpjNumerico); // cnpjNumerico vem da raiz
// Decisao: DOWNSTREAM_ABSORVIDO
// Raiz: CnpjValidator.java:45
```

### FALSO_POSITIVO (FP)

**Significado**: O achado **nao e CNPJ** ou e irrelevante.

**Criterios**:
- Campo e claramente nao-documento (`log_level`, `pageNumber`, `amount`)
- Token e exclusivamente CPF sem contexto CNPJ
- Codigo morto (comentado, dead code)
- Framework/biblioteca que nao manipula CNPJ real

### INCONCLUSIVO (INC)

**Significado**: Contexto insuficiente para decidir.

**Criterios**:
- Interface sem implementacao visivel
- Codigo gerado automaticamente sem contexto
- Referencia ambigua sem chamadores visiveis

## 7.5 Rastreabilidade de Cascata

A principal inovacao do F30 e o **tracking de cascata**: quando uma raiz e identificada, todos os pontos downstream sao marcados como DOWNSTREAM_ABSORVIDO com referencia explicita a raiz.

### Exemplo Real: SEGBR ValidaCpfCnpj

```
RAIZ: SEGBR/objetos/Classe/modLocal.bas:234 — ValidaCpfCnpj()
  |
  +-- DOWNSTREAM: SEGBR/objetos/Classe/163518/Prestador.cls:45
  +-- DOWNSTREAM: SEGBR/objetos/Classe/163520/Segurado.cls:78
  +-- DOWNSTREAM: SEGBR/objetos/Classe/163522/Beneficiario.cls:92
  +-- ... (47 arquivos no total)
```

Corrigir `ValidaCpfCnpj()` na raiz resolve automaticamente os 47 pontos downstream. Sem cascata tracking, cada ponto seria contado como item separado no backlog.

### Impacto do Cascata

| Sem cascata | Com cascata | Reducao |
|-------------|-------------|---------|
| 14.232 itens (todos CA) | 6.819 CA + 7.413 DA | 52,1% |

## 7.6 Controle de Qualidade

### QA Sampling (Wave 2+)

A partir da Wave 2, cada batch exige **minimo 20 linhas com verificacao de fonte** marcadas com prefixo `[QA_SRC]` no campo `motivo_agentico`.

Isso garante que o agente realmente leu o codigo fonte, nao apenas classificou pelo nome do token.

### Heuristicas Conservadoras

1. `rotina_*` tokens sem contexto CNPJ explicito --> INCONCLUSIVO (nao FP)
2. CPF puro sem contexto CNPJ --> NAO_CNPJ/SEM_ACAO
3. Campos hibridos (`nr_cpf_cnpj`) --> sempre CONFIRMA_ALTERAR (String suporta ambos)
4. Quando em duvida --> CONFIRMA_ALTERAR (conservador: prefere falso positivo a falso negativo)

### Ownership Exclusivo

- Cada batch (Bxxxx) tem ownership exclusivo por agente
- Nenhum agente escreve no batch de outro
- Consolidacao central apos cada wave
- Retomada por `controle_lotes.csv` (status PENDING/DONE)

## 7.7 Execucao em Numeros

### Batches por Grupo

| Grupo | Batches | Proposito |
|-------|---------|-----------|
| G1 | 28 | SEGBR achados GAP |
| G2 | 63 | ULTRON achados GAP |
| G3 | 42 | Achados complementares |
| G5 | 27 | Achados cross-system |
| G6 | 60 | Achados adicionais |
| G7 | 1.274 | Bulk ULTRON principal |
| GEXT | 67 | GAP CA nao cobertos |
| **Total** | **1.561** | |

### Resultado Final

| Decisao | Achados | Percentual |
|---------|---------|-----------|
| **CONFIRMA_ALTERAR** | **6.819** | **44,5%** |
| DOWNSTREAM_ABSORVIDO | 7.413 | 48,4% |
| FALSO_POSITIVO | 1.092 | 7,1% |
| INCONCLUSIVO | 1 | 0,01% |
| **Total revisado** | **15.325** | **100%** |

### Por Sistema (CA)

| Sistema | CA | % do Total |
|---------|---:|----------:|
| ULTRON | 3.773 | 55,3% |
| SEGBR | 1.742 | 25,5% |
| SIMULADORES | 1.304 | 19,1% |
