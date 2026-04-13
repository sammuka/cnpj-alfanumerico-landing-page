# 04 — Ferramentas GAP (F13-F22)

## 4.1 Motivacao

O pipeline principal (F01-F12) cobre os padroes mais comuns de uso de CNPJ. Porem, a analise revelou **gaps de cobertura** em cenarios especificos:

| Gap | Descricao | Exemplo nao capturado |
|-----|-----------|----------------------|
| G1 | Regras de formato hardcoded fora de funcoes | `Regex.Match(input, "^\d{14}$")` em bloco solto |
| G2 | Utilitarios indiretos de documento | `somenteNumeros(campo)` sem alias explicito |
| G3 | Campos genericos com semantica PJ | `nr_documento` em contexto de empresa |
| G4 | Schemas/contratos em arquivos nao-codigo | `.proto`, `.avsc`, `.xsd` com tipo numerico |
| G5 | Layouts fixos (CNAB/copybook) | Campo posicional "CNPJ" de 14 digitos numerico |
| G6 | Coercao numerica em ORM | `@Column(columnDefinition="BIGINT")` |
| G7 | Restricoes de UI | `<input maxlength="14" type="number">` |
| G8 | Vies em fixtures de teste | Dados de teste com 14 digitos hardcoded |
| G9 | Pipelines de strip de digitos | `removeNonDigits()` em cadeia de transformacao |
| G10 | Regras de validacao externas | Hibernate Validator com `@Pattern(\d{14})` |

A trilha GAP foi criada em **diretorio isolado** (`cnpj-impact-analyzer-gap/`) com lock dedicado (`gap_phase.lock`) para evitar conflitos com o pipeline principal.

## 4.2 Regras de Seguranca

- Nao escrever no `execution_control` da execucao principal
- Lock dedicado da GAP phase
- Executar apenas em sistemas com 100% em F02/F03 (main) e F04/F12 (lane)
- Registro em `reports/gap_phase_control/<run_id>/`

---

## 4.3 F13 — Regras de Formato Hardcoded

**Objetivo**: Detectar regex, mascaras e regras de formato fixo numerico.

**Padroes**:
- `[0-9]{14}`, `\d{14}`, `^\d{14}$`
- `maxLength=14` / `minLength=14`
- `only_digits`, `somente_numer`, `apenas_numeros`
- `mascara(\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2})`

**Validacao**: Requer contexto documental na linha ou janela +-2 linhas (cnpj, cpf, documento, cgc, pessoa_juridica).

**Score**: 4.5 (CNPJ/MISTA)
**Tipo**: `REGRA_FORMATO_HARDCODEADA`

---

## 4.4 F14 — Chamadas de Utilitarios de Documento

**Objetivo**: Detectar chamadas indiretas a funcoes de processamento de documento.

**Padroes de utilitario**:
- Strip: `somenteNumeros`, `onlyDigits`, `stripNonDigits`, `removeNonDigits`
- Formatacao: `formatDoc`, `formatarDocumento`, `formatCnpj`
- Limpeza: `cleanDoc`, `normalizarDoc`, `sanitizDoc`
- Validacao: `isCnpj`, `isDocumento`, `validaCnpj`, `validateDocument`
- Mapper/Service: `documentoMapper`, `cnpjService`, `documentoUtil`

**Validacao**: Contexto de alias CNPJ/documento na mesma funcao ou arquivo.

**Score**: 4.3 (CNPJ/MISTA)
**Tipo**: `CALLGRAPH_UTIL_CNPJ`

---

## 4.5 F15 — Inferencia Semantica de Documento

**Objetivo**: Identificar campos genericos que representam CNPJ por contexto semantico.

**Campos-alvo**: `documento`, `docto`, `doc`, `nr_documento`, `coDocumento`

**Metodo**:
1. Busca campo generico na linha
2. Analisa janela de 3 linhas (anterior + atual + posterior)
3. Busca indicadores semanticos de PJ: `empresa`, `pessoa_juridica`, `pj`, `cnpj`, `razao_social`, `inscricao`
4. Se presente, classifica como MISTA (pode ser CNPJ)

**Score**: 4.1 (CNPJ/MISTA)
**Tipo**: `INFERENCIA_SEMANTICA_DOCUMENTO`

---

## 4.6 F16 — Contratos Schema/Message

**Objetivo**: Detectar tipagem numerica em schemas de mensagens e contratos.

**Arquivos-alvo**: `.json`, `.yaml`, `.yml`, `.xml`, `.xsd`, `.proto`, `.avsc`

**Padroes**:
- JSON/YAML: `"type": "integer"`, `"type": "number"`, `"format": "int64"`
- XSD: `<xs:element type="xs:integer">`, `<xs:restriction base="xs:decimal">`
- Proto: `int64 cnpj`, `uint32 nr_documento`
- Avro: `"type": "long"`, `"type": "int"`

**Validacao**: Contem hint documental no contexto (nome do campo, comentario, etc.)

**Score**: 4.4 (CNPJ/MISTA)
**Tipo**: `SCHEMA_MESSAGE_CONTRACT`

---

## 4.7 F17 — Arquivos de Layout Fixo

**Objetivo**: Detectar layouts posicionais (CNAB, copybook) com campo CNPJ numerico fixo.

**Padroes**:
- Copybook COBOL: `PIC 9(14)` em campo CNPJ
- CNAB: posicao fixa de 14 caracteres numericos para CNPJ
- Layout posicional: substring de 14 posicoes com restricao numerica

**Score**: 4.8 (alto risco — layout fixo e particularmente rigido)
**Tipo**: `LAYOUT_FIXO_CNPJ`

---

## 4.8 F18 — Coercao Numerica em ORM/SQL

**Objetivo**: Detectar coercoes numericas de documento em camada de persistencia.

**Padroes ORM**:
- `@Column(columnDefinition="BIGINT")` / `@Column(columnDefinition="INT")`
- `@Type(type="long")` / `@Type(type="integer")`
- `IntegerField()` (Django) / `Column(Integer)` (SQLAlchemy)

**Padroes SQL**:
- `CAST(campo AS BIGINT)` / `CAST(campo AS INT)`
- `CONVERT(BIGINT, campo)` / `CONVERT(INT, campo)`
- `TO_NUMBER(campo)` / `TO_INT(campo)`

**Validacao**: Campo deve conter alias documental.

**Score**: 4.6 (CNPJ/MISTA)
**Tipo**: `COERCION_ORM_SQL_NUMERICA`

---

## 4.9 F19 — Restricoes de Entrada UI

**Objetivo**: Detectar restricoes de interface que bloqueiam letras em campos CNPJ.

**Padroes HTML/Form**:
- `maxlength="14"` + `type="number"` ou `pattern="[0-9]*"`
- `inputmode="numeric"` em campo de documento
- Mascara JS: `mask("00.000.000/0000-00")` (aceita so digitos)
- Componente React/Angular com `numeric` prop em campo CNPJ

**Score**: 4.2 (CNPJ/MISTA)
**Tipo**: `CONSTRAINT_UI_DOCUMENTO`

---

## 4.10 F20 — Vies em Fixtures de Teste

**Objetivo**: Detectar dados de teste com vies numerico que falhariam com CNPJ alfanumerico.

**Padroes**:
- Valor hardcoded de 14 digitos em fixture: `"11222333000181"`
- Regex de validacao numerica em teste: `assertMatches("\d{14}", cnpj)`
- Mock com `replace(\D)` / `onlyDigits` em setup de teste

**Endurecimento de ruido (aplicado)**:
- Extensoes de dados brutos (csv, txt) removidas do escopo
- Limite de amostragem por arquivo (MAX_FINDINGS_PER_FILE = 20)
- Linha precisa bater em sinal de vies tecnico
- Classificacao final aceita apenas CNPJ ou MISTA com evidencia
- CPF puro ou IND descartados

**Score**: 4.0 (CNPJ/MISTA)
**Tipo**: `BIAS_FIXTURE_TESTE`

---

## 4.11 F21 — Pipeline de Sanitizacao

**Objetivo**: Detectar pipelines de strip agressivo de nao-digitos.

**Padroes**:
- `replace(/\D/g, "")` / `replaceAll("\\D", "")`
- `removeNonDigits()` / `digitsOnly()` / `onlyDigits()`
- Cadeia de transformacao: `input -> strip -> validate -> store`

**Impacto**: Estes pipelines removem letras validas do CNPJ alfanumerico, corrompendo o dado.

**Score**: 4.6 (CNPJ/MISTA)
**Tipo**: `PIPELINE_STRIP_NUMERICO`

---

## 4.12 F22 — Auditoria de Regras de Dependencia

**Objetivo**: Detectar bibliotecas/frameworks externos com premissas numericas.

**Padroes**:
- Hibernate Validator: `@Pattern(regexp="\\d{14}")`, `@Size(min=14, max=14)`
- Jackson: `@JsonFormat(shape=Shape.NUMBER)`
- Pydantic: `Field(regex="^\d{14}$")`
- Joi: `Joi.string().pattern(/^\d{14}$/)`
- Zod: `z.string().regex(/^\d{14}$/)`
- Bean Validation: `@Digits(integer=14, fraction=0)`

**Score**: 4.3 (CNPJ/MISTA)
**Tipo**: `DEPENDENCIA_REGRA_NUMERICA`

---

## 4.13 Resultados do Pipeline GAP

| Sistema | Achados Carregados | CONFIRMA_ALTERAR |
|---------|-------------------|-----------------|
| SEGBR + SIMULADORES | 1.921 | 670 |
| ULTRON | 10.194 | 2.480 |
| **Total** | **12.115** | **3.150** |

Sem o pipeline GAP, **3.150 pontos de alteracao** teriam ficado fora do backlog.
