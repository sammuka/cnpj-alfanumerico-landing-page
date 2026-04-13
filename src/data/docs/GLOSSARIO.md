# Glossario

## Classificacao de Documento (`classificacao_doc`)

| Valor | Significado |
|-------|-------------|
| **CNPJ** | Indicio explicito de CNPJ (cnpj, cgc, pessoa_juridica) |
| **CPF** | Indicio explicito de CPF |
| **MISTA** | Campo combinado CPF+CNPJ ou generico com contexto PJ |
| **IND** | Indeterminado — evidencia insuficiente |

## Niveis de Risco (`risco`)

| Valor | Criterio |
|-------|----------|
| **ALTO** | Coercao numerica rigida, tipo SQL numerico, rotina mista critica, ausencia de testes |
| **MEDIO** | Indicio relevante sem coercao explicita |
| **BAIXO** | Baixa probabilidade de impacto no CNPJ |

## Niveis de Confianca (`confianca`)

| Valor | Criterio |
|-------|----------|
| **ALTA** | Multiplas ferramentas confirmam; evidencia estrutural forte |
| **MEDIA** | Uma ferramenta com evidencia contextual |
| **BAIXA** | Inferencia semantica ou alias generico |

## Decisoes da Revisao Agentica (`decisao_revisada`)

| Valor | Significado |
|-------|-------------|
| **CONFIRMA_ALTERAR** (CA) | Raiz do problema — esta linha precisa ser alterada |
| **DOWNSTREAM_ABSORVIDO** (DA) | Usa variavel ja flagada na raiz — nao precisa alteracao separada |
| **UPSTREAM_ADICIONAR** | Chamador passa valor numerico nao capturado — precisa adicao no upstream |
| **FALSO_POSITIVO** (FP) | Nao e CNPJ, ou e apenas teste isolado — remover do backlog |
| **INCONCLUSIVO** (INC) | Contexto insuficiente — manter para revisao manual |

## Escopo de Impacto (`escopo_impacto`)

| Valor | Significado |
|-------|-------------|
| **LOCAL** | Impacto restrito a mesma funcao/metodo |
| **INTRA_ARQUIVO** | Impacto propaga dentro do mesmo arquivo |
| **CROSS_ARQUIVO** | Impacto propaga para outros arquivos no mesmo repositorio |
| **CROSS_REPOSITORIO** | Impacto atravessa fronteiras de repositorio |

## Acoes Recomendadas (`acao_recomendada`)

| Valor | Significado |
|-------|-------------|
| **AJUSTAR_VALIDACAO_CNPJ** | Alterar regex/mascara para aceitar alfanumerico |
| **AJUSTAR_TIPO_DADO** | Alterar tipo numerico para VARCHAR/String |
| **SEPARAR_REGRA_CPF_CNPJ** | Separar logica compartilhada CPF+CNPJ |
| **REMOVER_STRIP_NUMERICO** | Remover/ajustar `replaceAll(\D)` que apaga letras |
| **AJUSTAR_CONVERSAO** | Alterar `Long.parseLong`/`int()` para tratamento string |
| **INVESTIGAR** | Contexto ambiguo — requer analise manual |
| **SEM_ACAO** | Nao requer alteracao |

## Tipos de Impacto (`tipo_impacto`)

| Valor | Descricao |
|-------|-----------|
| **BACKLOG_PRIORIZADO** | Achado consolidado de multiplas ferramentas (F12) |
| **ROTINA_OU_CAMPO_REFERENCIA** | Referencia lexical a alias CNPJ (F03) |
| **CALLGRAPH_UTIL_CNPJ** | Chamada a utilitario de documento (F14) |
| **BIAS_FIXTURE_TESTE** | Vies numerico em fixture de teste (F20) |
| **ASSINATURA_MULTILINE** | Assinatura de funcao multi-linha com alias (F23) |
| **REGRA_FORMATO_HARDCODEADA** | Regex/mascara hardcoded (F13) |
| **CONSTRAINT_UI_DOCUMENTO** | Restricao de entrada em UI (F19) |
| **NUMERIC_CONVERSION** | Conversao numerica forcada (F06) |
| **PIPELINE_STRIP_NUMERICO** | Pipeline de sanitizacao (F21) |
| **DIGIT_STRIP** | Strip de nao-digitos (F32/Semgrep) |
| **COERCION_ORM_SQL_NUMERICA** | Coercao numerica em ORM/SQL (F18) |
| **INFERENCIA_SEMANTICA_DOCUMENTO** | Inferencia semantica de campo generico (F15) |
| **SCHEMA_API_NUMERICO** | Schema de API com tipo numerico (F08) |
| **SCHEMA_TIPO_COLUNA** | Tipo de coluna SQL numerico (F07/F00) |
| **RANGE_NUMERICO_CNPJ** | Range numerico incompativel (F25) |
| **SCHEMA_MESSAGE_CONTRACT** | Contrato de mensagem com tipo numerico (F16) |
| **ANNOTATION_SERIALIZACAO_NUMERICA** | Anotacao ORM de serializacao numerica (F27) |
| **DEPENDENCIA_REGRA_NUMERICA** | Regra de dependencia externa numerica (F22) |

## Ferramentas (F00-F32)

| ID | Nome | Pipeline |
|----|------|----------|
| F00 | SQL Model | sql-model |
| F01 | Inventario | main |
| F02 | Descoberta de Aliases | main |
| F03 | Varredura Lexical | main |
| F04 | Assinaturas Estruturais | main |
| F05 | Validacoes/Mascaras | main |
| F06 | Conversao Numerica | main |
| F07 | Schema SQL | main |
| F08 | Contratos API | main |
| F09 | Rotinas Mistas CPF+CNPJ | main |
| F10 | Trilha de Fluxo / Semgrep | main |
| F11 | Impacto em Testes | main |
| F12 | Backlog Priorizado | main |
| F13 | Regras de Formato | gap |
| F14 | Chamadas de Utilitarios | gap |
| F15 | Inferencia Semantica | gap |
| F16 | Contratos Schema/Message | gap |
| F17 | Arquivos Layout Fixo | gap |
| F18 | Coercao Numerica ORM/SQL | gap |
| F19 | Restricoes de Entrada UI | gap |
| F20 | Vies em Fixtures de Teste | gap |
| F21 | Pipeline de Sanitizacao | gap |
| F22 | Auditoria Regras Dependencia | gap |
| F23 | Assinaturas Multiline | complement |
| F24 | Comparacoes de Comprimento | complement |
| F25 | Ranges Numericos | complement |
| F26 | OpenAPI/Swagger/GraphQL | complement |
| F27 | Anotacoes ORM/Serializacao | complement |
| F28 | Migracoes DB | complement |
| F29 | Coercao SQL Implicita | complement |
| F30 | Reavaliacao com Rastreabilidade | traceability |
| F31 | Pente-Fino de Falsos Positivos | refinement |
| F32 | Semgrep Fine-Tuning | refinement |

## Camadas Arquiteturais (`layer`)

| Valor | Padrao de Path |
|-------|----------------|
| **ENTRADA** | controller, endpoint, router, web, api, view, aspx |
| **REGRA** | service, business, core, rule, usecase, lambda |
| **PERSISTENCIA** | repository, dao, entity, model, persist |
| **BANCO** | sql, ddl, dml, migration, schema, database |
| **INTEGRACAO** | integration, client, bridge, consumer, producer, batch |
| **TESTE** | test, spec |
| **OUTROS** | Default para nao classificados |

## Fontes de Pipeline (`fonte_pipeline`)

| Valor | Origem |
|-------|--------|
| `F01-F12_MAIN` | Pipeline principal |
| `F13-F22_GAP_SEGBR_SIMUL` | GAP — SEGBR e SIMULADORES |
| `F13-F22_ULTRON_GAP` | GAP — ULTRON |
| `F23-F29_COMPLEMENT` | Pipeline complementar |
| `F00_SQL_MODEL` | Analise de modelo SQL |
| `F10_SEMGREP` | Varredura Semgrep |

## Siglas

| Sigla | Significado |
|-------|-------------|
| CA | CONFIRMA_ALTERAR |
| DA | DOWNSTREAM_ABSORVIDO |
| FP | FALSO_POSITIVO |
| INC | INCONCLUSIVO |
| LOC | Lines of Code |
| DDL | Data Definition Language |
| ORM | Object-Relational Mapping |
| SAST | Static Application Security Testing |
| UI | User Interface |
| DBA | Database Administrator |
