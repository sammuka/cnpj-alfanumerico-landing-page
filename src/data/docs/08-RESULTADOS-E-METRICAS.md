# 08 — Resultados e Metricas

## 8.1 Funil de Reducao

O pipeline completo partiu de ~70.729 achados brutos e chegou a 6.820 itens acionaveis — uma reducao de 90,4%.

```
70.729  Achados brutos (todos os pipelines somados)
   |
   | Deduplicacao (hash arquivo+linha+token)
   | -954 duplicatas
   v
14.425  Achados unicos confirmados (ALTERAR pre-revisao)
   |
   | +583 extensao GEXT (GAP CA nao cobertos)
   v
15.008  Universo de revisao agentica
   |
   | F30: 1.561 batches revisados
   |   -7.413 DOWNSTREAM_ABSORVIDO (48,4%)
   |   -982 FALSO_POSITIVO (6,5%)
   |   -7 INCONCLUSIVO (0,05%)
   v
 6.606  Backlog pos-F30
   |
   | +213 GEXT CA adicionados
   v
 6.819  Backlog pre-refinamento
   |
   | F31: -110 FPs (pente-fino heuristico)
   v
 6.503  Backlog pos-F31
   |
   | F32: +317 TPs (Semgrep fine-tuning)
   v
 6.820  BACKLOG FINAL
```

**Reducao efetiva**: 14.425 confirmados --> 6.820 acionaveis = **52,7%** de itens resolvidos por rastreabilidade e filtragem.

---

## 8.2 Distribuicao por Sistema

### CONFIRMA_ALTERAR por Sistema

| Sistema | CA | % do Total | Repos Impactados | Arquivos Impactados |
|---------|---:|----------:|------------------:|--------------------:|
| ULTRON | 3.773 | 55,3% | 283 | 1.672 |
| SEGBR | 1.742 | 25,5% | 5 | 798 |
| SIMULADORES | 1.304 | 19,1% | 4 | 215 |
| **Total** | **6.819** | **100%** | **292** | **2.685** |

**Nota**: Total de CA e 6.819; somado ao 1 INCONCLUSIVO = 6.820 backlog.

### Media por Repositorio

| Sistema | CA | Repos | Media CA/Repo |
|---------|---:|------:|--------------:|
| ULTRON | 3.773 | 283 | 13,3 |
| SEGBR | 1.742 | 5 | 348,4 |
| SIMULADORES | 1.304 | 4 | 326,0 |

SEGBR e SIMULADORES tem alta concentracao por repo (sistemas legados/monoliticos).

---

## 8.3 Distribuicao por Risco

| Risco | Achados | % |
|-------|--------:|---:|
| **ALTO** | **10.770** | **74,6%** |
| MEDIO | 3.586 | 24,8% |
| BAIXO | 69 | 0,5% |

**74,6% dos achados sao ALTO risco** — coercoes numericas rigidas, schemas SQL numericos, rotinas mistas criticas.

---

## 8.4 Distribuicao por Confianca

| Confianca | Achados | % |
|-----------|--------:|---:|
| ALTA | 6.103 | 42,3% |
| MEDIA | 8.002 | 55,5% |
| BAIXA | 320 | 2,2% |

---

## 8.5 Distribuicao por Tipo de Impacto

| Tipo de Impacto | Achados | % | Descricao |
|-----------------|--------:|---:|-----------|
| BACKLOG_PRIORIZADO | 6.179 | 42,8% | Consolidado de multiplas ferramentas (F12) |
| ROTINA_OU_CAMPO_REFERENCIA | 5.049 | 35,0% | Referencia lexical a alias (F03) |
| CALLGRAPH_UTIL_CNPJ | 697 | 4,8% | Chamada a utilitario de documento (F14) |
| BIAS_FIXTURE_TESTE | 513 | 3,6% | Vies numerico em fixture de teste (F20) |
| ASSINATURA_MULTILINE | 433 | 3,0% | Assinatura multi-linha com alias (F23) |
| REGRA_FORMATO_HARDCODEADA | 406 | 2,8% | Regex/mascara hardcoded (F13) |
| CONSTRAINT_UI_DOCUMENTO | 279 | 1,9% | Restricao de entrada UI (F19) |
| NUMERIC_CONVERSION | 181 | 1,3% | Conversao numerica forcada (F06) |
| PIPELINE_STRIP_NUMERICO | 141 | 1,0% | Pipeline de sanitizacao (F21) |
| DIGIT_STRIP | 133 | 0,9% | Strip de nao-digitos (Semgrep) |
| COERCION_ORM_SQL_NUMERICA | 124 | 0,9% | Coercao ORM/SQL (F18) |
| INFERENCIA_SEMANTICA_DOCUMENTO | 107 | 0,7% | Inferencia semantica (F15) |
| SCHEMA_TIPO_COLUNA | 70 | 0,5% | Tipo SQL numerico (F00/F07) |
| SCHEMA_API_NUMERICO | 68 | 0,5% | Schema API numerico (F08) |
| RANGE_NUMERICO_CNPJ | 23 | 0,2% | Range numerico (F25) |
| ANNOTATION_SERIALIZACAO_NUMERICA | 7 | 0,05% | Anotacao ORM (F27) |
| DEPENDENCIA_REGRA_NUMERICA | 7 | 0,05% | Regra externa (F22) |
| SCHEMA_MESSAGE_CONTRACT | 3 | 0,02% | Contrato de mensagem (F16) |

---

## 8.6 Distribuicao por Fonte de Pipeline

| Fonte | Achados no Backlog | % |
|-------|-------------------:|---:|
| F01-F12_MAIN | 11.228 | 77,8% |
| F13-F22_ULTRON_GAP | 1.992 | 13,8% |
| F23-F29_COMPLEMENT | 534 | 3,7% |
| F10_SEMGREP | 314 | 2,2% |
| F13-F22_GAP_SEGBR_SIMUL | 287 | 2,0% |
| F00_SQL_MODEL | 70 | 0,5% |
| **Total** | **14.425** | **100%** |

O pipeline principal (F01-F12) captura 77,8% dos achados. Os 22,2% restantes foram adicionados pelas fases complementares — justificando a existencia das 7 instancias de analyzer.

---

## 8.7 Achados por Fonte (Raw)

| Fonte | Total Carregado | ALTERAR | INC Resolvido |
|-------|----------------:|--------:|--------------:|
| F01-F12_MAIN | 25.083 | 11.310 | +30 |
| F13-F22_ULTRON_GAP | 10.194 | 2.480 | — |
| F13-F22_GAP_SEGBR_SIMUL | 1.921 | 670 | — |
| F23-F29_COMPLEMENT | 10.507 | 535 | — |
| F00_SQL_MODEL | 70 | 70 | — |
| F10_SEMGREP | 314 | 314 | — |

---

## 8.8 Decisoes da Revisao Agentica

| Decisao | Achados | % |
|---------|--------:|---:|
| **CONFIRMA_ALTERAR** | **6.819** | **44,5%** |
| DOWNSTREAM_ABSORVIDO | 7.413 | 48,4% |
| FALSO_POSITIVO | 1.092 | 7,1% |
| INCONCLUSIVO | 1 | 0,01% |
| **Total** | **15.325** | **100%** |

O **DOWNSTREAM_ABSORVIDO** (48,4%) e o principal fator de reducao — quase metade dos achados sao resolvidos pela correcao da raiz.

---

## 8.9 Migracoes SQL

| Metrica | Valor |
|---------|-------|
| Repositorios SQL analisados | 20 |
| Tabelas com colunas doc | 86 |
| Total de ocorrencias | 191 |
| Colunas VARCHAR/NVARCHAR (corretas) | 121 |
| **Colunas numericas (requerem ALTER)** | **70** |
| Migracoes ALTER TABLE | **97** |

### Top Repositorios por Migracoes

| Repositorio | Ocorrencias | Numericas |
|-------------|------------:|----------:|
| ultron-sinistro-scripts-sql | 42 | 31 |
| ultron-sinistro-sin-scripts-sql | 12 | 10 |
| ultron-emissao-endosso-sql | 9 | 7 |
| ultron-emissao-endosso-parametro-scripts-ddldcl-sql | 5 | 4 |
| ultron-assistencia-scripts-sql | 12 | 5 |

---

## 8.10 Pendencias Residuais

| Pendencia | Achados |
|-----------|--------:|
| GAP SEGBR/SIMULADORES INCONCLUSIVOs | 528 |
| ULTRON GAP INCONCLUSIVOs | 1.947 |
| Complement INCONCLUSIVOs | 3.276 |
| **Total INCONCLUSIVOs pendentes** | **5.751** |

Estes 5.751 itens foram classificados como INCONCLUSIVO nas fases intermediarias e **nao fazem parte do backlog final de 6.820**. Eles representam achados de baixa probabilidade que podem ser revisados futuramente se necessario.

---

## 8.11 Metricas de Eficiencia

| Metrica | Valor |
|---------|-------|
| Duracao total | 9 dias |
| Ferramentas criadas | 33 |
| Analyzers instanciados | 7 |
| Batches processados (F30) | 1.561 |
| Batches F31 | 159 candidatos |
| Batches F32 | 4 grupos |
| Aliases iniciais | 148 |
| Aliases descobertos | 1.843 |
| Taxa de FP removidos | 7,1% (F30) + 0,7% (F31) |
| Taxa de TP adicionados | +2,1% (F32) |
| Reducao por cascata | 48,4% |
