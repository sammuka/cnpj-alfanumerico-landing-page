# 06 — Rodadas de Execucao

## 6.1 Visao Geral

O projeto foi executado em **6 rodadas principais** ao longo de 9 dias (18-27 Mar 2026). Cada rodada corresponde a uma fase do pipeline, com entrada/saida mensurada e rastreavel.

```
Rodada 1: Discovery (F01-F03)           18-20 Mar     202.795 arquivos
Rodada 2: Deteccao Estrutural (F04-F12) 19-20 Mar     339 repos Wave A
Rodada 3: GAP Analysis (F13-F22)        20-24 Mar     12.115 achados
Rodada 4: Complement (F23-F29) + SQL    23-25 Mar     10.507 + 70
Rodada 5: Revisao Agentica (F30)        21-27 Mar     1.561 batches
Rodada 6: Refinamento (F31-F32)         27 Mar        -110 FP / +317 TP
```

---

## 6.2 Rodada 1 — Discovery (18-20 Mar 2026)

### Objetivo
Inventariar todo o codigo-fonte, construir o dicionario de aliases e realizar busca lexical completa.

### Execucao

| Data/Hora (UTC) | Ferramenta | Sistema | Achados | Observacao |
|-----------------|-----------|---------|---------|------------|
| 18 Mar 21:55 | F01 | SIMULADORES | 5.226 arquivos | Inventario completo |
| 18 Mar 21:57 | F02 | SIMULADORES | aliases iniciais | Descoberta de termos |
| 18 Mar 21:58 | F03 | SIMULADORES | 4.870 | Busca lexical |
| 18 Mar 21:58+ | F01-F03 | SEGBR | ~4.000 | Inventario + discovery legado |
| 18-19 Mar | F01-F03 | ULTRON | ~19.000 | 187.789 arquivos fonte |
| 19 Mar | F02 consolidado | global | 1.843 aliases | Dicionario final |

### Metricas da Rodada

| Metrica | Valor |
|---------|-------|
| Arquivos fonte indexados | 202.795 |
| Seeds iniciais | 148 |
| Aliases descobertos | 1.843 |
| Achados F03 (busca lexical) | ~28.000 |
| Extensoes cobertas | 34 |
| Comentarios filtrados | ~15% das linhas |

### Decisoes Tecnicas

1. **Filtro de comentarios**: implementado em `is_comment_line()` para 8+ linguagens
2. **Aliases ambiguos**: `documento` sozinho requer contexto (cnpj/cpf/cgc na proximidade)
3. **SIMULADORES como fonte de aliases**: decisao estrategica para enriquecer dicionario global

---

## 6.3 Rodada 2 — Deteccao Estrutural (19-20 Mar 2026)

### Objetivo
Executar F04-F12 em repositorios ja completos em F02-F03.

### Execucao via Lane2

O Lane2 (`cnpj-impact-analyzer-lane2/`) processou repositorios em paralelo ao main:

| Data/Hora (UTC) | Run | Repos | Ferramentas |
|-----------------|-----|-------|-------------|
| 19 Mar 21:05 | Run 1 | Wave A batch 1 | F04-F12 |
| 19 Mar 21:15 | Run 2 | Wave A batch 2 | F04-F12 |
| ... | ... | ... | ... |
| 19 Mar 22:00 | Run 11 | Wave A batch 11 | F04-F12 |

### Wave Planning (20 Mar)

Plano gerado em 20 Mar T00:04:42Z:

| Wave | Repos | Criterio |
|------|-------|----------|
| **Wave A** | 339 | F02-F03 completos, elegivel para F04-F12 |
| **Wave B** | 744 | Pendente F02-F03 ou F04-F12 parcial |

### Metricas de Cobertura

| Sistema | F01 | F02 | F03 | F04-F12 |
|---------|-----|-----|-----|---------|
| SEGBR | 79,21% | 100% | 100% | parcial |
| SIMULADORES | 100% | 100% | 100% | parcial |
| ULTRON | 0,15% | 100% | 100% | parcial |

**Nota**: F01 mostra percentual baixo pois o inventario e atualizacao continua (novos repos adicionados); F02-F03 estao 100% em todos os sistemas.

---

## 6.4 Rodada 3 — GAP Analysis (20-24 Mar 2026)

### Objetivo
Capturar achados nao cobertos pelo pipeline principal usando F13-F22.

### Execucao

| Data | Sistema | Ferramentas | Achados |
|------|---------|-------------|---------|
| 20-23 Mar | SEGBR | F13-F22 | 908 |
| 20-23 Mar | SIMULADORES | F13-F22 | 1.013 |
| 23-24 Mar | ULTRON | F13-F22 | 10.194 |

### Achados por Ferramenta GAP

| Ferramenta | SEGBR+SIMUL | ULTRON | Total |
|-----------|-------------|--------|-------|
| F13 Formato | 142 | 1.823 | 1.965 |
| F14 Utilitarios | 89 | 1.456 | 1.545 |
| F15 Semantica | 67 | 892 | 959 |
| F16 Schema/Msg | 12 | 234 | 246 |
| F17 Layout Fixo | 3 | 18 | 21 |
| F18 ORM/SQL | 45 | 678 | 723 |
| F19 UI | 38 | 1.123 | 1.161 |
| F20 Fixtures | 156 | 2.345 | 2.501 |
| F21 Strip | 67 | 891 | 958 |
| F22 Dependencia | 23 | 734 | 757 |

### Classificacao Agentica GAP

| Decisao | SEGBR+SIMUL | ULTRON |
|---------|-------------|--------|
| CONFIRMA_ALTERAR | 670 | 2.480 |
| NAO_ALTERAR | ~1.000 | ~5.500 |
| INCONCLUSIVO | 528 | 1.947 |

**Entrega GAP**: 3.150 CONFIRMA_ALTERAR adicionados ao backlog.

---

## 6.5 Rodada 4 — Complement + SQL Model (23-25 Mar 2026)

### Complement (F23-F29)

| Data | Atividade | Saida |
|------|-----------|-------|
| 23 Mar | Estrategia definida (`ESTRATEGIA_COMPLEMENT_PIPELINE.md`) | 7 gaps mapeados |
| 24 Mar 11:29 | F23 batches B0040-B0052 | ASSINATURA_MULTILINE |
| 24 Mar | F24-F29 processados | Achados complementares |
| 25 Mar | Consolidacao | 10.507 achados, 535 CA |

### SQL Model (F00)

| Data | Atividade | Saida |
|------|-----------|-------|
| 25 Mar 12:03 | Analise de DDL ULTRON | 1.349 CREATE TABLE parseados |
| 25 Mar 12:06 | Catalogo SQL gerado | 86 tabelas, 70 colunas numericas |
| 25 Mar | Migracoes identificadas | 97 ALTER TABLE |

### Semgrep (F10)

| Data | Atividade | Saida |
|------|-----------|-------|
| 25 Mar 15:34 | Scan com 8 regras SAST | 16.481 achados |
| 26 Mar | Classificacao em 4 grupos | A(7), B(314), C(48), D(16.019) |

---

## 6.6 Rodada 5 — Revisao Agentica F30 (21-27 Mar 2026)

### Preparacao

| Data | Atividade | Saida |
|------|-----------|-------|
| 21 Mar 06:34 | Preparo da fila agentica | 25.083 itens na fila |
| 21 Mar 06:34 | Deduplicacao por arquivo+linha | 25.637 --> 25.083 |
| 21 Mar 06:34 | Auto-exclusao por regras | 554 itens excluidos |
| 21 Mar 06:34 | Geracao de 101 batches | B0001-B0101 (250 itens/batch) |

### Processamento por Waves

| Wave | Batches | Periodo | Modelo QA |
|------|---------|---------|-----------|
| Wave 1 | B0001-B0003 | 21 Mar 06:34-06:45 | Basico |
| Wave 2 | B0004-B0015 | 21 Mar 08:20-08:21 | QA_SRC obrigatorio (20+ linhas) |
| Waves 3-8 | B0016-B0106 | 21-24 Mar | QA_SRC + heuristicas refinadas |

### Extensao GEXT (GAP not in F30 original)

| Grupo | Batches | Achados | CA Adicionados |
|-------|---------|---------|---------------|
| G1 | 28 | ~280 | achados GAP SEGBR |
| G2 | 63 | ~630 | achados GAP ULTRON |
| G3 | 42 | ~420 | achados complementares |
| G5 | 27 | ~270 | achados cross-system |
| G6 | 60 | ~600 | achados adicionais |
| G7 | 1.274 | ~1.274 | bulk ULTRON |
| GEXT | 67 | 426 | net-new CA do GAP |

### Totais F30

| Metrica | Valor |
|---------|-------|
| Batches processados | 1.561 |
| Achados revisados | 15.325 |
| Cobertura | 100% |
| CONFIRMA_ALTERAR | 6.819 (44,5%) |
| DOWNSTREAM_ABSORVIDO | 7.413 (48,4%) |
| FALSO_POSITIVO | 1.092 (7,1%) |
| INCONCLUSIVO | 1 (0,01%) |

---

## 6.7 Rodada 6 — Refinamento F31+F32 (27 Mar 2026)

### F31 — Pente-Fino FP

| Hora | Atividade | Resultado |
|------|-----------|-----------|
| 27 Mar AM | 159 candidatos selecionados | 6 filtros heuristicos |
| 27 Mar AM | Revisao com +-30 linhas | 110 FPs confirmados |
| 27 Mar AM | Backlog atualizado | 6.613 --> 6.503 |

### F32 — Semgrep Fine-Tuning

| Hora | Atividade | Resultado |
|------|-----------|-----------|
| 27 Mar AM | Grupo B: 314 insercao direta | +314 CA |
| 27 Mar AM | Grupo A: 7 revisao individual | +6 CA, 1 INC |
| 27 Mar AM | Grupo C: 48 revisao em batches | +3 CA |
| 27 Mar AM | Grupo D: amostra 60 --> FP 96,7% | 16.019 bulk excluidos |
| 27 Mar AM | Backlog final | 6.503 --> **6.820** |

---

## 6.8 Consolidacao Final (27 Mar 2026)

| Hora (UTC) | Atividade | Saida |
|------------|-----------|-------|
| 10:47 | TRACEABILITY_REPORT.md gerado | Relatorio de rastreabilidade |
| 13:49 | Apresentacao Marp (17 slides) | `APRESENTACAO_JORNADA.md` |
| 13:49-13:51 | Relatorios finais | `relatorio-impacto-final.md`, `relatorio-rastreabilidade.md` |
| 14:59 | Entrega final consolidada | `cnpj-alfanumerico-entrega-final/` |

### Funil de Reducao Completo

```
70.729  achados brutos (todos os pipelines)
  |
  | -954 duplicatas (hash arquivo+linha+token)
  v
14.425  achados unicos confirmados
  |
  | +583 GEXT (GAP nao coberto na revisao original)
  v
15.008  universo de revisao
  |
  | F30: Revisao agentica (1.561 batches)
  v
 6.819  CONFIRMA_ALTERAR
 7.413  DOWNSTREAM_ABSORVIDO
 1.092  FALSO_POSITIVO (982 F30 + 110 F31)
     1  INCONCLUSIVO
  |
  | F31: -110 FPs
  v
 6.503  backlog pos-F31
  |
  | F32: +317 TPs (Semgrep)
  v
 6.820  BACKLOG FINAL
```

### Distribuicao Final por Fonte

| Fonte Pipeline | Achados no Backlog |
|---------------|-------------------|
| F01-F12_MAIN | 11.228 |
| F13-F22_ULTRON_GAP | 1.992 |
| F13-F22_GAP_SEGBR_SIMUL | 287 |
| F23-F29_COMPLEMENT | 534 |
| F10_SEMGREP | 314 |
| F00_SQL_MODEL | 70 |
| **Total** | **14.425** |
