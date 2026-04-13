# 02 — Estrategia e Roadmap

## 2.1 Visao Geral da Estrategia

A analise foi concebida como um **pipeline progressivo de refinamento**: cada fase adiciona precisao ao resultado anterior, partindo de uma varredura ampla ate um backlog priorizado e rastreavel.

```
Seeds (148)
  |
  v
F01-F03  Discovery       --> Inventario + Aliases (1.843) + Busca lexical
  |
  v
F04-F09  Deteccao        --> Assinaturas, validacoes, conversoes, schemas, rotinas mistas
  |
  v
F10-F12  Consolidacao    --> Semgrep (8 regras SAST) + Trilha de fluxo + Backlog priorizado
  |
  v
F13-F22  GAP Analysis    --> 10 ferramentas complementares para gaps do pipeline principal
  |
  v
F23-F29  Complement      --> Padroes adicionais: multiline, ranges, ORM, migracoes
  |
  v
F00      SQL Model       --> Analise de DDL: 86 tabelas, 70 colunas numericas
  |
  v
F30      Revisao Agentica --> Leitura de codigo real (+-30 linhas) por IA
  |
  v
F31-F32  Refinamento     --> Pente-fino FP + Semgrep fine-tuning
  |
  v
BACKLOG FINAL: 6.820 pontos de alteracao
```

## 2.2 Arquitetura de Analyzers

O projeto utilizou **7 instancias de analyzer** com propositos complementares:

| Analyzer | Diretorio | Ferramentas | Proposito |
|----------|-----------|-------------|-----------|
| **Main** | `cnpj-impact-analyzer/` | F01-F12 | Pipeline principal de descoberta e consolidacao |
| **GAP** | `cnpj-impact-analyzer-gap/` | F13-F22 | Captura de gaps nao cobertos pelo principal |
| **Lane2** | `cnpj-impact-analyzer-lane2/` | F04-F12 | Processamento paralelo de repos ja completos em F02-F03 |
| **Complement** | `cnpj-impact-analyzer-complement/` | F23-F29 | Padroes complementares (multiline, ranges, ORM) |
| **Semgrep** | `cnpj-impact-analyzer-semgrep/` | F10 | 8 regras SAST alias-free |
| **SQL Model** | `cnpj-impact-analyzer-sql-model/` | F00 | Parser de DDL para deteccao de colunas numericas |
| **Traceability** | `cnpj-traceability-review/` | F30 | Framework de revisao agentica com rastreabilidade |

### Configuracao Compartilhada

Os 3 analyzers base (main, gap, lane2) compartilham estrutura identica e devem estar sincronizados:

- `config/aliases_seed.txt` — 148 termos seed
- `config/include_extensions.txt` — 34 extensoes de arquivo
- `config/settings.json` — sistemas, limites, padroes
- `python/cnpj_impact_analyzer/textutils.py` — classificacao e regex

## 2.3 Estrategia de Aliases

O ponto de partida da analise e o **dicionario de aliases** — nomes de variaveis, campos e colunas que transportam CNPJ no codigo.

### Seeds Iniciais (148 termos)

Exemplos por categoria:

- **CNPJ direto**: `cnpj`, `nr_cnpj`, `cd_cnpj`, `cnpj_raiz`, `cnpj_base`, `cnpj_filial`
- **CGC legado**: `cgc`, `cgc_est`, `cgc_seg`, `cgc_ant`, `cgc_brl`
- **Combinados**: `cpf_cnpj`, `cnpj_cpf`, `cpfcnpj`, `cpfcgc`, `nr_cpf_cnpj`
- **Por papel**: `cnpj_cliente`, `cnpj_corretor`, `cnpj_seguradora`, `cnpj_estipulante`
- **Genericos**: `documento`, `nr_documento`, `id_tipo_documento`, `pessoa_juridica`

### Descoberta Automatica (F02)

A ferramenta F02 expande o dicionario lendo o codigo real:

1. Varre todas as linhas que contem fragmentos dos seeds
2. Extrai tokens (3-64 caracteres, alfanumericos + underscore)
3. Valida tokens como aliases de alta precisao:
   - Deve conter fragmento forte (cnpj, cgc, pessoa_juridica)
   - Ou ter contexto documental com classificacao CNPJ/MISTA
4. Filtra ruido (prefixos de teste, sufixos genericos)

**Resultado**: 1.843 aliases confirmados a partir de 148 seeds.

### Regra Estrategica: Propagacao Cross-Sistema

Os aliases descobertos em **SIMULADORES** entram no dicionario global (`global_aliases.json`) e sao reutilizados por todas as ferramentas de busca em **SEGBR** e **ULTRON**. Isso garante consistencia terminologica cross-sistema.

## 2.4 Linha do Tempo

### Fase 1 — Setup e Discovery (18-20 Mar 2026)

| Data | Atividade | Saida |
|------|-----------|-------|
| 18 Mar | Inventario dos repositorios ULTRON (clone de 34 repos SQL) | `repos_ultron.txt`, `repos_segbr.csv` |
| 18 Mar 21:55 | F01 SIMULADORES — inventario de volume | 5.226 arquivos fonte |
| 18 Mar 21:57 | F02 SIMULADORES — descoberta de aliases | Aliases iniciais |
| 18 Mar 21:58 | F03 SIMULADORES — busca lexical | 4.870 achados |
| 18-19 Mar | F01-F03 em SEGBR e ULTRON | Varredura de 202.795 arquivos |
| 19 Mar 21:05 | Lane2 — 11 runs F04-F12 em 339 repos Wave A | Achados estruturais |
| 20 Mar | Wave Planning — 339 Wave A + 744 Wave B | Plano de orquestracao paralela |

### Fase 2 — Analise Completa e GAP (21-24 Mar 2026)

| Data | Atividade | Saida |
|------|-----------|-------|
| 21 Mar 03:58 | Estrategia finalizada | `CNPJ_ALFANUMERICO_ESTRATEGIA_ANALISE.md` |
| 21 Mar 06:34 | Inicio da revisao agentica Wave 1 | 25.083 itens na fila |
| 21 Mar 06:34 | Batches B0001-B0003 processados | 750 linhas revisadas |
| 21-24 Mar | Processamento massivo de batches | B0001-B0106 (102 batches) |
| 23 Mar | Estrategia Complement Pipeline | `ESTRATEGIA_COMPLEMENT_PIPELINE.md` |
| 24 Mar 11:22 | Pico de processamento — 8 ranges de batches | Classificacao completa |
| 24 Mar 15:05 | GAP Analysis concluida (SEGBR+SIMUL) | 1.921 achados adicionais |

### Fase 3 — Consolidacao e Refinamento (25-27 Mar 2026)

| Data | Atividade | Saida |
|------|-----------|-------|
| 25 Mar 12:03 | SQL Model Analysis (F00) | 86 tabelas, 70 colunas numericas |
| 25 Mar 15:34 | Semgrep scan | 16.481 achados |
| 26 Mar 03:57 | Consolidacao final — `impact_stats.json` | 14.425 achados unicos |
| 26 Mar 21:39 | Ultimos batches F30 (TR_B0661-TR_B0700) | 100% cobertura |
| 27 Mar 02:43 | Traceability Report completo | 15.008 achados revisados |
| 27 Mar | F31 Pente-Fino FP | -110 FPs removidos |
| 27 Mar | F32 Semgrep Fine-Tuning | +317 TPs adicionados |
| 27 Mar 13:49 | Apresentacao Marp gerada | 17 slides |
| 27 Mar 14:59 | **Entrega final** | **6.820 backlog + 97 migracoes SQL** |

### Resumo da Timeline

```
Mar 18  |====| Setup + Discovery (F01-F03)
Mar 19  |====| Lane2 Parallel (F04-F12)
Mar 20  |====| Wave Planning + GAP Strategy
Mar 21  |========| Agentic Review Start + F30
Mar 22  |========| Batch Processing
Mar 23  |========| Complement Strategy + Batches
Mar 24  |============| Peak Processing + GAP Complete
Mar 25  |========| SQL Model + Semgrep
Mar 26  |========| Consolidation + Final Batches
Mar 27  |============| F31 + F32 + Entrega Final
```

**Duracao total**: 9 dias de analise continua automatizada.

## 2.5 Controle Centralizado

### Artefatos de Controle (`reports/execution_control/`)

| Arquivo | Proposito |
|---------|-----------|
| `control_state.json` | Estado hierarquico: sistema > repositorio > ferramenta > status |
| `global_aliases.json` | Dicionario global acumulado (1.843 aliases) |
| `history.ndjson` | Log de eventos timestamped (NDJSON) |
| `status_matrix.csv` | Grade ferramenta x repositorio (COMPLETED/PENDING/FAILED) |
| `pending_by_tool.csv` | Fila de trabalho pendente por ferramenta |
| `processing_totals.csv` | Percentual processado por ferramenta e sistema |
| `orchestrator_state.json` | Checkpoint para retomada apos falha |
| `EXECUTIVE_SUMMARY.md` | Resumo executivo human-readable |

### Orquestracao Resiliente

1. **Lock exclusivo** (`orchestrator.lock`): impede sobreposicao de execucoes
2. **Checkpoint** (`orchestrator_state.json`): permite retomada apos falha
3. **Processamento sequencial**: um repositorio por vez por ferramenta
4. **Retries por repositorio**: em caso de falha, retoma do checkpoint
5. **Isolamento de pipelines**: main, gap, lane2, complement — cada um com lock proprio
6. **Nao-destruicao**: runs anteriores preservados; novos supersede por timestamp

### Governanca de Reprocessamento

Quando seeds ou regras de classificacao mudam:

1. Snapshot pre-reprocessamento em `reprocess_snapshots/`
2. Reset apenas das ferramentas alvo (ex.: F02/F03)
3. Relancamento com lock e checkpoint
4. Runs anteriores mantidos para auditoria
5. Consolidacao de evidencias em relatorio dedicado

**Principio**: nao apagar trilha de execucao; priorizar explicabilidade ponta a ponta.
