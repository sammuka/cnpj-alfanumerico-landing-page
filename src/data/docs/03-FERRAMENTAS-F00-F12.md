# 03 — Ferramentas do Pipeline Principal (F00-F12)

## 3.1 Visao Geral

O pipeline principal contem 13 ferramentas que cobrem desde o inventario ate o backlog priorizado. Cada ferramenta recebe um `RuntimeContext` compartilhado contendo configuracoes, arquivos indexados, achados acumulados e o dicionario de aliases.

### Formato de Saida Padrao

Todas as ferramentas produzem achados no formato `Finding` com 13 colunas:

```
sistema, repositorio, ferramenta, arquivo, linha, token_campo,
classificacao_doc, tipo_indicio, risco, precisa_avaliacao_agentica,
motivo, evidencia, score
```

CSVs sao paginados em blocos de 300 linhas: `F01_SEGBR_p1.csv`, `F01_SEGBR_p2.csv`, etc.

---

## 3.2 F00 — SQL Model (cnpj-impact-analyzer-sql-model)

**Objetivo**: Identificar colunas com tipo numerico em tabelas que armazenam CNPJ/CPF.

**Metodo**:
- Parseia 1.349 scripts `CREATE TABLE` nos repositorios SQL do ULTRON
- Identifica colunas cujo nome contem aliases de documento (cnpj, cpf, documento, etc.)
- Classifica o tipo da coluna como problematico (BIGINT, INT, SMALLINT, TINYINT, NUMERIC) ou correto (VARCHAR, NVARCHAR, CHAR)

**Saida**:

| Metrica | Valor |
|---------|-------|
| Repositorios analisados | 20 |
| Tabelas com colunas doc | 86 |
| Total de ocorrencias | 191 |
| Colunas VARCHAR/NVARCHAR (corretas) | 121 |
| **Colunas numericas (requerem ALTER)** | **70** |
| Migracoes ALTER TABLE identificadas | **97** |

**Score**: 5.0 (todas CONFIRMA_ALTERAR — tipo numerico e incompativel com alfanumerico).

---

## 3.3 F01 — Inventario

**Objetivo**: Baseline de volume — contagem de arquivos por sistema, repositorio, extensao e camada arquitetural.

**Metodo**:
- Indexa todos os arquivos fonte filtrados por `include_extensions.txt`
- Exclui paths em `exclude_globs` (node_modules, .git, dist, build, etc.)
- Infere repositorio a partir da estrutura de diretorios
- Infere camada arquitetural (ENTRADA, REGRA, PERSISTENCIA, BANCO, INTEGRACAO, TESTE, OUTROS)

**Tipos de achado**:
- `INVENTARIO_TOTAL`: contagem total por sistema
- `INVENTARIO_REPOSITORIO`: contagem por repositorio
- `INVENTARIO_EXTENSAO`: contagem por extensao
- `INVENTARIO_CAMADA`: contagem por camada

**Classificacao**: IND (informacional)
**Risco**: BAIXO

---

## 3.4 F02 — Descoberta de Aliases

**Objetivo**: Construir um dicionario vivo de aliases CNPJ a partir do codigo.

**Metodo**:
1. Carrega 148 seeds de `aliases_seed.txt`
2. Varre cada arquivo fonte buscando linhas com fragmentos dos seeds
3. Extrai tokens (3-64 caracteres: `[a-zA-Z0-9_]`)
4. Valida como alias de alta precisao:
   - Contem fragmento forte (`cnpj`, `cgc`, `pessoa_juridica`)
   - Ou tem assinatura documental com classificacao CNPJ/MISTA
5. Filtra ruido:
   - Prefixos de teste (`test_`, `mock_`, `fake_`)
   - Sufixos genericos (`_service`, `_controller`, `_repository`)
   - Partes genericas (`service`, `controller`, `util`)
6. Persiste aliases descobertos em `global_aliases.json`

**Regra estrategica**: SIMULADORES participa da descoberta; seus aliases enriquecem o dicionario global para todos os sistemas.

**Resultado**: 148 seeds --> 1.843 aliases confirmados.

**Tipos de achado**:
- `DICIONARIO_ALIAS_DESCOBERTO`: novo alias encontrado
- `DICIONARIO_COBERTURA_REPO`: cobertura de aliases por repositorio

---

## 3.5 F03 — Varredura Lexical

**Objetivo**: Busca de padroes usando o dicionario completo de aliases.

**Metodo**:
1. Compila regex: `(?i)\b(alias1|alias2|...)\b` (case-insensitive, word boundaries, aliases ordenados por comprimento decrescente)
2. Varre cada linha nao-comentario de cada arquivo
3. Ignora aliases ambiguos (ex.: `documento` sozinho) a menos que haja contexto (cnpj/cpf/cgc na mesma linha ou proximidade)
4. Classifica cada achado via `classify_doc()`

**Scores**:
- CNPJ/MISTA: 3.0
- CPF: 1.5
- IND: 1.0

**Tipo de achado**: `ROTINA_OU_CAMPO_REFERENCIA`

**Filtro de comentarios**: `is_comment_line()` detecta 8+ padroes de comentario (SQL: `--`, Python: `#`, VB6: `'`/`REM`, C/Java/JS: `//`/`/*`, HTML: `<!--`).

---

## 3.6 F04 — Assinaturas Estruturais

**Objetivo**: Identificar aliases CNPJ em definicoes de funcao, classe, procedure, etc.

**Metodo**:
1. Filtra apenas arquivos de codigo (`vb`, `bas`, `cls`, `frm`, `cs`, `asp`, `aspx`, `py`, `java`, `js`, `jsx`, `ts`, `tsx`, `php`, `sql`, `prc`, `pkb`, `pks`)
2. Busca linhas com keyword estrutural: `class`, `def`, `function`, `sub`, `public`, `private`, `protected`, `create procedure/function/view/table`, `select`, `insert`, `update`
3. Verifica se a mesma linha contem alias do dicionario
4. Classifica e gera achado

**Scores**:
- CNPJ/MISTA: 4.0
- CPF: 2.0

**Tipo de achado**: `ASSINATURA_ESTRUTURAL`

---

## 3.7 F05 — Validacoes e Mascaras

**Objetivo**: Detectar regras de validacao numerica que rejeitariam CNPJ alfanumerico.

**Padroes detectados**:
- `[0-9]{14}` e `\d{14}` (regex numerico de 14 digitos)
- `isdigit()`, `isnumeric()`, `IsNumeric()`
- `somente_numer`, `only_digits`, `apenas_numeros`
- `mascara`, `mask`, `formato`

**Metodo**:
1. Busca padroes de validacao em cada linha
2. Contextualiza com linha anterior (para capturar comentarios-hint)
3. Valida contexto documental (referencia a CNPJ/documento)

**Scores**:
- CNPJ/MISTA: 4.2
- CPF: 2.1

**Tipo de achado**: `VALIDACAO_MASCARA_NUMERICA`

---

## 3.8 F06 — Conversao Numerica

**Objetivo**: Detectar conversoes forcadas de string para numero em campos CNPJ.

**Padroes detectados**:
- `parseInt`, `parseLong`, `parseFloat` (Java/JS)
- `int()`, `long()`, `float()` (Python)
- `Convert.ToInt32`, `Convert.ToInt64` (C#)
- `CLng`, `CInt`, `CDbl` (VB6)
- `CAST(... AS INT/BIGINT)` (SQL)
- `to_number`, `to_int` (PL/SQL)
- `replace(\D)`, `regexp_replace`, `translate` (strip de nao-digitos)

**Scores**:
- CNPJ/MISTA: 4.5
- CPF: 2.0

**Tipo de achado**: `NUMERIC_CONVERSION`

---

## 3.9 F07 — Schema SQL

**Objetivo**: Detectar tipos numericos e constraints em definicoes de coluna SQL.

**Metodo**:
1. Parseia definicoes de coluna: `col_name TYPE(size)`
2. Identifica colunas documentais (nome contem cnpj, cpf, documento, inscricao, pessoa_juridica)
3. Classifica tipo:
   - Numerico (bigint, int, numeric, decimal) --> ALTO risco
   - String (varchar, nvarchar, char) --> informacional
4. Detecta constraints numericas (CHECK, WHERE com restricao de digitos)

**Scores**:
- Tipo numerico: 5.0
- Tipo string com constraint numerica: 3.0

**Tipos de achado**: `SCHEMA_TIPO_COLUNA`, `SCHEMA_CONSTRAINT_NUMERICA`

---

## 3.10 F08 — Contratos API

**Objetivo**: Detectar restricoes numericas em schemas de API.

**Padroes detectados**:
- `[0-9]{14}` / `\d{14}` em atributos de validacao
- `@Size` / `@Length` / `maxLength` com valor 14
- `pattern=digits` / `pattern="[0-9]*"`
- `somente_numer` / `only_digits` em campos de request/response

**Contexto**: Busca em linhas que contenham hints de campo documental (cnpj, cpf, documento, etc.)

**Scores**:
- CNPJ/MISTA: 4.0
- CPF: 2.0

**Tipo de achado**: `SCHEMA_API_NUMERICO`

---

## 3.11 F09 — Rotinas Mistas CPF+CNPJ

**Objetivo**: Detectar codigo que mistura tratamento de CPF e CNPJ na mesma rotina.

**Metodo**:
1. **Padrao explicito**: busca `cpf_cnpj`, `cnpj_cpf`, `nr_cpf_cnpj` na linha
2. **Padrao em assinatura**: busca patterns mistos em definicoes de funcao
3. **Padrao a nivel de arquivo**: conta hits CPF e CNPJ no arquivo; se ambos > 0 mas sem referencia mista explicita, marca como contexto misto indireto

**Scores**:
- Misto explicito: 5.0
- Assinatura mista: 5.2
- Contexto misto a nivel de arquivo: 3.5

**Risco**: ALTO para explicito/assinatura, MEDIO para nivel de arquivo

**Tipo de achado**: `ASSINATURA_MULTILINE` (para misto)

---

## 3.12 F10 — Trilha de Fluxo

**Objetivo**: Agregar achados por token across camadas para mostrar impacto cross-layer.

**Metodo**:
1. Agrupa achados de F03-F09 por (repositorio, token_campo)
2. Para cada grupo, acumula:
   - Camadas tocadas (ENTRADA, REGRA, PERSISTENCIA, etc.)
   - Ferramentas que detectaram (F03, F04, F06, etc.)
   - Riscos e classificacoes
3. Calcula score composto: `camadas + ferramentas + multiplicador_risco`
4. Ordena por score (maior impacto primeiro)

**Evidencia**: `camadas=>ENTRADA>REGRA>PERSISTENCIA;ferramentas=F03,F04,F06`

**Tipo de achado**: `TRILHA_FLUXO`

---

## 3.13 F11 — Impacto em Testes

**Objetivo**: Identificar testes que falharam com CNPJ alfanumerico.

**Metodo**:
1. Identifica repositorios impactados (com achados CNPJ/MISTA em F03-F10)
2. Busca arquivos de teste/spec/fixture nesses repos
3. Procura padroes numericos: `\d{14}`, `[0-9]{14}`, `only_digits`, `isnumeric`
4. Valida contexto de alias
5. Se repositorio nao tem testes --> flag `LACUNA_TESTE` (ausencia de cobertura)

**Scores**:
- LACUNA_TESTE (sem testes): 5.0 / Risco ALTO
- Restricao numerica em teste: 3.5 / Risco MEDIO

**Tipo de achado**: `BIAS_FIXTURE_TESTE`

---

## 3.14 F12 — Backlog Priorizado

**Objetivo**: Deduplicar e consolidar todos os achados em um backlog tecnico priorizado.

**Metodo**:
1. Agrupa achados de F03-F11 por (repositorio, arquivo, token_campo, linha)
2. Para cada grupo, acumula:
   - Ferramentas que detectaram
   - Riscos, classificacoes
   - Amostras de evidencia por ferramenta
3. Calcula score composto: `len(ferramentas) + (4.0 se ALTO, 2.0 se MEDIO, 1.0 se BAIXO)`
4. Ordena por score (maior prioridade primeiro)

**Evidencia**: `fontes=F03,F04,F06;amostra=[F03]sample | [F04]sample | [F06]sample`

**Tipo de achado**: `BACKLOG_PRIORIZADO`

Este e o achado que alimenta diretamente a fila da revisao agentica (F30).
