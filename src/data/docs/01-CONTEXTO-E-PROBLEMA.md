# 01 — Contexto e Problema

## 1.1 A Mudanca Regulatoria

A partir de **julho de 2026**, a Receita Federal do Brasil passara a emitir CNPJs com **caracteres alfanumericos** nas posicoes 1 a 8 do numero base. O formato atual — 14 digitos exclusivamente numericos — sera substituido por um formato que aceita letras (A-Z) e numeros (0-9) nas primeiras posicoes.

**Formato atual**: `XX.XXX.XXX/XXXX-XX` (todos digitos)
**Formato futuro**: `A1.B2C.3D4/XXXX-XX` (letras nas posicoes 1-8)

O CPF **permanece numerico** — somente o CNPJ muda.

## 1.2 O que Quebra

Qualquer codigo que assuma CNPJ como valor exclusivamente numerico sera impactado. Os padroes problematicos mais comuns identificados nesta analise:

### Conversoes Numericas

| Padrao | Linguagem | Exemplo Real | Falha |
|--------|-----------|-------------|-------|
| `Long.parseLong()` | Java | `long cnpjRaiz = Long.parseLong(cnpj)` | `NumberFormatException` |
| `int()` / `Integer()` | Python/Java | `int nr_cnpj = Integer.parseInt(cnpj)` | `NumberFormatException` |
| `CLng()` / `CInt()` | VB6 | `lngCNPJ = CLng(strCNPJ)` | `Runtime Error 13: Type mismatch` |
| `CAST AS BIGINT` | SQL | `CAST(nr_cnpj AS BIGINT)` | `Conversion failed` |
| `Convert.ToInt64()` | C# | `Convert.ToInt64(cnpj)` | `FormatException` |

### Remocao de Nao-Digitos

| Padrao | Linguagem | Exemplo Real | Falha |
|--------|-----------|-------------|-------|
| `replaceAll("\\D","")` | Java/JS | `cnpj.replaceAll("\\D","")` | Remove letras validas do CNPJ |
| `replace(/[^0-9]/g,"")` | JavaScript | `cnpj.replace(/[^0-9]/g,"")` | Remove letras validas |
| `re.sub(r'\D','',cnpj)` | Python | Strip de nao-digitos | Remove letras validas |
| `Mid$` + `IsNumeric` | VB6 | Validacao caractere a caractere | Rejeita letras validas |

### Validacoes de Formato

| Padrao | Linguagem | Exemplo Real | Falha |
|--------|-----------|-------------|-------|
| `[0-9]{14}` | Regex | `Pattern.matches("[0-9]{14}", cnpj)` | Rejeita alfanumericos |
| `\d{14}` | Regex | Validacao com regex numerico | Rejeita alfanumericos |
| `maxlength=14` + `numeric` | HTML | `<input maxlength="14" pattern="[0-9]*">` | Bloqueia letras na UI |
| `Len(cnpj) = 14` | VB6 | Validacao de comprimento | Pode falhar com CNPJ formatado |

### Tipos de Dados em Banco

| Padrao | Contexto | Exemplo Real | Falha |
|--------|----------|-------------|-------|
| `BIGINT` | SQL DDL | `nr_cnpj BIGINT NOT NULL` | Nao armazena letras |
| `INT` / `NUMERIC` | SQL DDL | `cd_cnpj INT` | Nao armazena letras |
| `@Column(numeric)` | ORM | `@Column(columnDefinition="BIGINT")` | Tipo incompativel |

### Schemas e Contratos

| Padrao | Contexto | Exemplo Real | Falha |
|--------|----------|-------------|-------|
| `type: integer` | OpenAPI/Swagger | `cnpj: {type: integer, format: int64}` | Rejeita alfanumericos |
| `@Pattern(regexp="\\d{14}")` | Hibernate | Anotacao de validacao | Rejeita alfanumericos |
| `Joi.number()` | Node.js | `cnpj: Joi.number().integer()` | Rejeita alfanumericos |

## 1.3 Escopo da Analise

A analise cobriu **3 sistemas** que compoe o ecossistema de seguros da BB Seguros:

### SEGBR — Sistema Legado

| Atributo | Valor |
|----------|-------|
| Tecnologia | VB6, ASP, SQL Server |
| Repositorios | 5 (45.223 objetos: executaveis, DLLs, modulos) |
| Linhas de codigo | 7.034.563 |
| Arquivos fonte | 9.780 |
| Caracteristica | Sistema legado com 20+ anos, variaveis como `mvarCGC`, `CGC_OK`, `ValidaCpfCnpj` |

### ULTRON — Plataforma de Microservicos

| Atributo | Valor |
|----------|-------|
| Tecnologia | Java/Spring, Python, Node.js/React, SQL Server |
| Repositorios | 1.077 (1.046 app + 31 SQL) |
| Linhas de codigo | 31.013.674 |
| Arquivos fonte | 187.789 |
| Caracteristica | Plataforma cloud (AWS Lambda/ECS), ~150 lambdas, EMR/Databricks |

### SIMULADORES — Simuladores de Produtos

| Atributo | Valor |
|----------|-------|
| Tecnologia | Java/Spring Boot, React/Node.js |
| Repositorios | 4 (agricola, floresta, patrimonio, vida) |
| Linhas de codigo | 500.731 |
| Arquivos fonte | 5.226 |
| Caracteristica | Calculadoras de seguros full-stack, frontend e backend independentes |

### Totais

| Metrica | Valor |
|---------|-------|
| **Repositorios totais** | **~1.086** |
| **Linhas de codigo totais** | **38.548.968** |
| **Arquivos fonte totais** | **202.795** |

## 1.4 A Restricao CPF

Um aspecto critico desta analise e que o **CPF permanece numerico**. Isso cria um desafio adicional: muitos sistemas usam campos combinados `cpf_cnpj` ou rotinas compartilhadas que processam ambos os documentos. Nestas rotinas:

- A logica de CNPJ deve aceitar alfanumericos
- A logica de CPF deve continuar aceitando apenas numeros
- Campos combinados (`nr_cpf_cnpj`) devem ser `VARCHAR` para suportar ambos

Esta dualidade e capturada pela classificacao `MISTA` no pipeline de analise, e pela acao recomendada `SEPARAR_REGRA_CPF_CNPJ` quando as regras estao entrelagadas.

## 1.5 Por que Nao Bastava Buscar "cnpj"

Uma busca simples por `cnpj` no codigo capturaria apenas uma fracao dos pontos impactados. A razao: sistemas legados e modernos usam **centenas de nomes diferentes** para campos que transportam CNPJ:

- **Legado VB6**: `mvarCGC`, `CGC_EST`, `CGC_SEG`, `lngCNPJ`, `strCNPJ`
- **Java**: `nuCnpjCpf`, `cdCgcCpfContratante`, `nrDocumentoFederal`
- **SQL**: `nr_cnpj_agencia_bancaria`, `cd_cpf_cnpj_segurado`, `nr_documento_emissao`
- **Genericos**: `documento`, `nr_documento`, `coDocumento`, `tx_documento`

O pipeline de analise foi desenhado para **descobrir automaticamente** esses aliases (ferramenta F02) e usa-los em todas as buscas subsequentes, garantindo cobertura completa independentemente da nomenclatura.
