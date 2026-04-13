# 05 — Ferramentas Complement e Refinamento (F23-F32)

## 5.1 Pipeline Complement (F23-F29)

### Motivacao

Apos a execucao dos pipelines principal (F01-F12) e GAP (F13-F22), a analise de resultados revelou **7 gaps adicionais** que motivaram a criacao de ferramentas complementares:

| Gap | Descricao | Ferramenta |
|-----|-----------|------------|
| G1 | Assinaturas de funcao com parametros em multiplas linhas | F23 |
| G2 | Comparacoes de comprimento (`.length() == 14`) | F24 |
| G3 | Ranges numericos (`cnpj > 10000000000000`) | F25 |
| G4 | Schemas OpenAPI/Swagger/GraphQL com tipo numerico | F26 |
| G5 | Anotacoes ORM de serializacao numerica | F27 |
| G6 | Migracoes de banco (Flyway/Liquibase) | F28 |
| G7 | Coercao SQL implicita (joins e filtros com literal numerico) | F29 |

O pipeline complement opera em `cnpj-impact-analyzer-complement/` com arquitetura modular propria.

---

### F23 — Assinaturas Multiline

**Objetivo**: Capturar assinaturas de funcao onde o keyword e o alias CNPJ estao em linhas diferentes.

**Problema**: F04 busca keyword + alias na mesma linha. Em Java/Python formatado, parametros ficam em linhas separadas:

```java
public ResponseEntity<Void> atualizarCadastro(
    @RequestParam Long cnpjRaiz,    // <-- alias na linha abaixo do keyword
    @RequestBody CadastroDTO dto
) {
```

**Metodo**: Janela deslizante de 6 linhas — se keyword aparece em qualquer linha da janela e alias em outra, gera achado.

**Tipo**: `ASSINATURA_MULTILINE`

---

### F24 — Comparacoes de Comprimento

**Objetivo**: Detectar validacoes de comprimento fixo em 14 caracteres.

**Padroes**:
- `.length() == 14` / `.length() != 14`
- `len(cnpj) == 14` / `Len(cnpj) = 14`
- `size() == 14` / `.size == 14`
- `String.format("%014d", ...)` (padding numerico para 14)

**Tipo**: `COMPARACAO_COMPRIMENTO`

---

### F25 — Ranges Numericos

**Objetivo**: Detectar ranges numericos que assumem CNPJ como numero.

**Padroes**:
- `cnpj > 10000000000000` / `cnpj < 99999999999999`
- `@Min(10000000000000)` / `@Max(99999999999999)`
- `BETWEEN 10000000000000 AND 99999999999999`
- Range check em VB6: `If cnpj >= 10000000000000 Then`

**Tipo**: `RANGE_NUMERICO_CNPJ`

---

### F26 — OpenAPI/Swagger/GraphQL

**Objetivo**: Detectar schemas de API com tipagem numerica em campos CNPJ.

**Padroes OpenAPI/Swagger**:
```yaml
cnpj:
  type: integer
  format: int64
```

**Padroes GraphQL**:
```graphql
type Empresa {
  cnpj: Int!
}
```

**Tipo**: `SCHEMA_API_NUMERICO`

---

### F27 — Anotacoes ORM/Serializacao

**Objetivo**: Detectar anotacoes de mapeamento que forcam tipo numerico.

**Padroes**:
- `@JsonFormat(shape = Shape.NUMBER)` (Jackson)
- `@Column(columnDefinition = "BIGINT")` (JPA)
- `@Type(type = "long")` (Hibernate)
- `@Serializer(using = LongSerializer.class)`
- `NumberFormat(style = NumberFormat.Style.NUMBER)`

**Tipo**: `ANNOTATION_SERIALIZACAO_NUMERICA`

---

### F28 — Migracoes DB

**Objetivo**: Detectar migracoes Flyway/Liquibase com tipos numericos para CNPJ.

**Padroes**:
- Flyway: `V*.sql` com `ALTER TABLE ... ADD cnpj BIGINT`
- Liquibase: `<column name="cnpj" type="BIGINT"/>`
- Scripts de migracao com `MODIFY COLUMN nr_cnpj INT`

**Tipo**: `MIGRACAO_DB_NUMERICA`

---

### F29 — Coercao SQL Implicita

**Objetivo**: Detectar coercao implicita em SQL onde CNPJ e tratado como numero.

**Padroes**:
- `WHERE cnpj = 12345678000100` (literal numerico sem aspas)
- `SUM(cnpj)` / `AVG(cnpj)` (funcao agregada numerica)
- `cnpj + 1` / `cnpj * 10` (aritmetica em campo documento)
- `ORDER BY cnpj` em coluna INT (ordenacao numerica vs. alfanumerica)

**Tipo**: `COERCAO_SQL_IMPLICITA`

---

### Resultados do Pipeline Complement

| Metrica | Valor |
|---------|-------|
| Total de achados carregados | 10.507 |
| CONFIRMA_ALTERAR | 535 |
| Inconclusivos pendentes | 3.276 |

---

## 5.2 F30 — Reavaliacao com Rastreabilidade

> Detalhado no documento [07-REVISAO-AGENTICA-F30.md](07-REVISAO-AGENTICA-F30.md)

**Objetivo**: Revisar cada achado com leitura de codigo real (+-30 linhas), classificando como raiz (CONFIRMA_ALTERAR) ou downstream (DOWNSTREAM_ABSORVIDO).

**Execucao**: 1.561 batches, 15.325 achados revisados, 100% de cobertura.

---

## 5.3 F31 — Pente-Fino de Falsos Positivos

**Objetivo**: Identificar e remover falsos positivos remanescentes apos F30.

**Metodo**: 6 filtros heuristicos aplicados a 159 candidatos com contexto +-30 linhas:

| Filtro | Criterio | Candidatos | FPs Confirmados |
|--------|----------|-----------|-----------------|
| **PF1** | Token exclusivamente CPF (sem contexto CNPJ) | 42 | ~42 |
| **PF2** | NUMERIC(N<=11) em coluna nao-documento | 28 | ~24 |
| **PF3** | Tabelas PPE_*/pessoa_fisica_tb (exclusivamente CPF) | 31 | ~18 |
| **PF4** | sql_migration + contexto puramente CPF | 18 | ~12 |
| **PF5** | BIAS_FIXTURE_TESTE + contexto puramente CPF | 24 | ~8 |
| **PF6** | RANGE_NUMERICO_CNPJ revisitado (ranges de CPF) | 16 | ~6 |
| **Total** | | **159** | **110** |

**Resultado**: Backlog de 6.613 --> **6.503** (reducao de 1,7%)

### Exemplos de FPs Removidos

- `pessoa_juridica` em linha comentada de VB6 (codigo morto)
- `NUMERIC(11)` em coluna `cd_cpf` (CPF, nao CNPJ)
- `PPE_ORGAO_CARGO_TB.CPF` — tabela puramente de CPF de pessoa fisica
- Fixture de teste com `"12345678901"` (11 digitos = CPF)

---

## 5.4 F32 — Semgrep Fine-Tuning

**Objetivo**: Classificar os 16.481 achados do Semgrep (F10) que nao passaram pelo pipeline principal.

### 8 Regras Semgrep

O scanner Semgrep utiliza 8 regras SAST **alias-free** (independentes do dicionario):

1. `java-long-parse-cnpj` — `Long.parseLong(...)` em campo suspeito
2. `java-integer-parse-cnpj` — `Integer.parseInt(...)` em campo suspeito
3. `java-bigdecimal-cnpj` — `new BigDecimal(cnpj)`
4. `js-parseint-cnpj` — `parseInt(cnpj)` / `Number(cnpj)`
5. `js-strip-non-digits` — `replace(/\D/g, "")` em cadeia de documento
6. `py-int-cast-cnpj` — `int(cnpj)` em contexto de documento
7. `py-strip-non-digits` — `re.sub(r'\D', '', cnpj)`
8. `generic-numeric-regex-14` — `[0-9]{14}` / `\d{14}` em qualquer linguagem

### Classificacao em 4 Grupos

| Grupo | Itens | Tratamento | Resultado |
|-------|------:|-----------|-----------|
| **B** — CNPJ_REAL_ALTERAR net-new | 314 | Insercao direta (ja confirmados) | **+314 CA** |
| **A** — INCONCLUSIVOs existentes | 7 | Revisao agentica individual | 6 CA, 1 INC |
| **C** — INC com CNPJ na evidencia | 48 | Revisao agentica (+-12/batch) | 3 CA |
| **D** — INC generico sem CNPJ | 16.019 | Amostra 60 itens --> FP_rate=96,7% | Bulk FP excluido |

### Analise do Grupo D (96,7% FP)

Causa raiz dos falsos positivos em Grupo D:
- `int(log_level)` — conversao de nivel de log, nao documento
- `Long.parseLong(expiration)` — parsing de epoch/JWT timestamp
- `parseInt(pageNumber)` — paginacao
- `Number(amount)` — conversao de valor financeiro
- `replace(/\D/g, "")` em campo de telefone/CEP

As regras Semgrep sao broad by design; o fine-tuning em F32 filtra os 96,7% que nao sao CNPJ.

### Resultado F32

Backlog de 6.503 --> **6.820** (+4,9% com 317 TPs net-new)

---

## 5.5 Resumo: Contribuicao por Fase de Refinamento

| Fase | Entrada | Saida | Delta |
|------|---------|-------|-------|
| F30 Revisao Agentica | 15.008 | 6.819 CA + 7.413 DA + 982 FP + 7 INC | Separacao raiz/downstream |
| F31 Pente-Fino FP | 159 candidatos | -110 FPs | -110 |
| F32 Semgrep Fine | 16.481 | +317 TPs | +317 |
| **Total pos-refinamento** | | **6.820 backlog final** | |
