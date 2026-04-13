# Catálogo do Modelo de Dados ULTRON — Colunas CNPJ/CPF

> Gerado em: 2026-03-25T15:06:05Z
> Fonte: `ULTRON/repos_sql/` — 20 repositórios, 191 ocorrências

---

## Resumo

| Métrica | Valor |
|---------|------:|
| Repositórios com colunas doc | 20 |
| Tabelas com colunas CNPJ/CPF | 86 |
| Total de ocorrências no catálogo | 191 |
| CREATE TABLE (tipo correto — VARCHAR/NVARCHAR) | 121 |
| **Colunas numéricas — precisam de ALTER** | **70** |
| ALTER ADD COLUMN | 19 |
| ALTER CHANGE COLUMN (evolução de tipo) | 14 |

---

## Colunas com Tipo NUMÉRICO — Requerem Alteração

| Repo | Tabela | Coluna | Tipo Atual | Operação | Arquivo |
|------|--------|--------|-----------|----------|---------|
| ultron-assistencia-scripts-sql | proposta_seguro | `id_tipo_documento_emissao` | `tinyint` | CREATE_TABLE | .../04.01.DDL/01.proposta_seguro_ddl.sql |
| ultron-assistencia-scripts-sql | proposta_seguro | `nr_documento_emissao` | `bigint` | CREATE_TABLE | .../04.01.DDL/01.proposta_seguro_ddl.sql |
| ultron-assistencia-scripts-sql | retorno_minutrade | `id_tipo_documento_emissao` | `tinyint` | CREATE_TABLE | .../06.01.DDL/05.retorno_minutrade_ddl.sql |
| ultron-assistencia-scripts-sql | retorno_minutrade | `id_tipo_documento_emissao` | `tinyint` | CREATE_TABLE | .../H14/update_R09S05_H14_DDL_01.sql |
| ultron-assistencia-scripts-sql | tipo_documento_emissao | `id_tipo_documento_emissao` | `tinyint` | CREATE_TABLE | .../01.01.DDL/03.tipo_documento_emissao_ddl.sql |
| ultron-cliente-ged-sql | arquivo | `id_tipo_documento` | `int` | ALTER_ADD_COLUMN | .../ultron-cliente-ged-sql/0000006-prd20191114141133_alter_table_arquivo_-_alter_table_tipo_documento_f.sql |
| ultron-cliente-publishing-sql | template | `id_tipo_documento` | `int` | ALTER_ADD_COLUMN | .../ultron-cliente-publishing-sql/0000067-prd20210504180210_alter_table_operacao_-_alter_table_template_-_alte.sql |
| ultron-cliente-sql | pessoa | `id_pessoa_juridica` | `int` | ALTER_ADD_COLUMN | .../ultron-cliente-sql/0000012-prd20191111143644_alter_table_pessoa_-_alter_table_pessoa_-_alter_ta.sql |
| ultron-cliente-sql | pessoa_documento | `tp_documento` | `smallint` | ALTER_CHANGE_COLUMN | .../ultron-cliente-sql/0000056-prd20200703112418_alter_table_pessoa_documento.sql |
| ultron-cliente-sql | pessoa_documento | `tp_documento` | `int` | ALTER_CHANGE_COLUMN | .../ultron-cliente-sql/0000058-prd20200714151146_alter_table_pessoa_documento_-_alter_table_pessoa_.sql |
| ultron-emissao-endosso-parametro-scripts-ddldcl-sql | endosso_documento | `id_endosso_documento` | `int` | CREATE_TABLE | .../endosso_parametro/09_endosso_documento.sql |
| ultron-emissao-endosso-parametro-scripts-ddldcl-sql | endosso_documento | `id_endosso_documento_situacao` | `int` | CREATE_TABLE | .../endosso_parametro/09_endosso_documento.sql |
| ultron-emissao-endosso-parametro-scripts-ddldcl-sql | endosso_documento_situacao | `id_endosso_documento_situacao` | `int` | CREATE_TABLE | .../endosso_parametro/05_endosso_documento_situacao.sql |
| ultron-emissao-endosso-parametro-scripts-ddldcl-sql | tipo_endosso_oferta | `id_endosso_documento` | `int` | CREATE_TABLE | .../endosso_parametro/13_tipo_endosso_oferta.sql |
| ultron-emissao-endosso-sql | endosso | `id_endosso_documento` | `bigint` | ALTER_ADD_COLUMN | .../ultron-emissao-endosso-sql/000000090000_alter_table_endosso_add_nm_roteiro_e_id_endosso_documento.sql |
| ultron-emissao-endosso-sql | endosso_documento | `id_endosso_documento` | `bigint` | CREATE_TABLE | .../ultron-emissao-endosso-sql/000000000010_create_table_endosso_documento.sql |
| ultron-emissao-endosso-sql | endosso_documento | `id_endosso_documento` | `bigint` | CREATE_TABLE | .../tomb_hml_to_dev/DDL_HML.sql |
| ultron-emissao-endosso-sql | endosso_documento | `id_endosso_documento_situacao` | `bigint` | ALTER_ADD_COLUMN | .../ultron-emissao-endosso-sql/000000100000_alter_table_endosso_add_id_endosso_documento.sql |
| ultron-emissao-endosso-sql | endosso_documento | `id_endosso_documento_situacao` | `bigint` | CREATE_TABLE | .../tomb_hml_to_dev/DDL_HML.sql |
| ultron-emissao-endosso-sql | endosso_documento_situacao | `id_endosso_documento_situacao` | `bigint` | CREATE_TABLE | .../ultron-emissao-endosso-sql/000000000011_create_table_endosso_documento_situacao.sql |
| ultron-emissao-endosso-sql | endosso_documento_situacao | `id_endosso_documento_situacao` | `bigint` | CREATE_TABLE | .../tomb_hml_to_dev/DDL_HML.sql |
| ultron-emissao-sql | proposta_documento | `id_proposta_documento` | `bigint` | CREATE_TABLE | .../ultron-emissao-sql/000000000059_create_table_proposta_documento.sql |
| ultron-emissao-sql | proposta_documento | `nr_origem_documento` | `bigint` | CREATE_TABLE | .../ultron-emissao-sql/000000000059_create_table_proposta_documento.sql |
| ultron-emissao-sql | proposta_documento | `nr_tipo_documento` | `bigint` | CREATE_TABLE | .../ultron-emissao-sql/000000000059_create_table_proposta_documento.sql |
| ultron-emissao-subscricao-sql | analise_medica_documentacao | `cd_documento` | `int` | CREATE_TABLE | .../11220_doencas_graves/15.create_table_analise_medica_documentacao.sql |
| ultron-emissao-subscricao-sql | h_analise_medica_documentacao | `cd_documento` | `int` | CREATE_TABLE | .../11220_doencas_graves/16.create_table_h_analise_medica_documentacao.sql |
| ultron-financeiro-scripts-sql | agencia_bancaria | `nr_cnpj_agencia_bancaria` | `bigint` | CREATE_TABLE | .../DDL/00060_agencia_bancaria.sql |
| ultron-financeiro-scripts-sql | banco | `nr_cnpj_base` | `int` | CREATE_TABLE | .../DDL/00055_banco.sql |
| ultron-financeiro-scripts-sql | dado_fiscal | `id_tipo_documento_fiscal` | `smallint` | CREATE_TABLE | .../DDL/00295_dado_fiscal.sql |
| ultron-sinistro-scripts-sql | arquivo_notificacao | `id_exigencia_documento_arquivo` | `bigint` | CREATE_TABLE | .../R14S02/007_DDL_arquivo_notificacao.sql |
| ultron-sinistro-scripts-sql | chassi_anotacao_parametro | `id_documento_chassi` | `bigint` | CREATE_TABLE | .../SCRIPTS_ACIDENTES_PESSOAIS_SINISTROS_MULTIPLOS/0015_DDL_CR_AP_SINISTROS_MULTIPLOS_chassi_anotacao_parametro.sql |
| ultron-sinistro-scripts-sql | documento_agrupador | `id_documento_agrupador` | `bigint` | ALTER_CHANGE_COLUMN | .../DDL/IM03219880.sql |
| ultron-sinistro-scripts-sql | documento_agrupador | `id_documento_agrupador` | `smallint` | CREATE_TABLE | .../dominio/documento_agrupador.sql |
| ultron-sinistro-scripts-sql | documento_chassi | `id_documento_chassi` | `bigint` | CREATE_TABLE | .../R14S01/DDL_001_documento_chassi.sql |
| ultron-sinistro-scripts-sql | documento_detalhe | `id_documento` | `int` | CREATE_TABLE | .../DDL/1.0.0_documento_detalhe.sql |
| ultron-sinistro-scripts-sql | documento_detalhe | `id_documento_agrupador` | `smallint` | CREATE_TABLE | .../DDL/1.0.0_documento_detalhe.sql |
| ultron-sinistro-scripts-sql | documento_detalhe | `id_documento_agrupador` | `bigint` | ALTER_CHANGE_COLUMN | .../DDL/IM03219880.sql |
| ultron-sinistro-scripts-sql | documento_detalhe | `id_documento_detalhe` | `smallint` | CREATE_TABLE | .../DDL/1.0.0_documento_detalhe.sql |
| ultron-sinistro-scripts-sql | documento_detalhe | `id_documento_detalhe` | `bigint` | ALTER_CHANGE_COLUMN | .../DDL/IM03219880.sql |
| ultron-sinistro-scripts-sql | documento_detalhe_chassi | `id_documento_chassi` | `bigint` | CREATE_TABLE | .../SCRIPTS_CONTAGEM_AUTOMATICA_SINISTRO/007_DDL_documento_detalhe_chassi.sql |
| ultron-sinistro-scripts-sql | documento_detalhe_chassi | `id_documento_detalhe` | `bigint` | CREATE_TABLE | .../SCRIPTS_CONTAGEM_AUTOMATICA_SINISTRO/007_DDL_documento_detalhe_chassi.sql |
| ultron-sinistro-scripts-sql | documento_detalhe_chassi | `id_documento_detalhe_chassi` | `int` | CREATE_TABLE | .../SCRIPTS_CONTAGEM_AUTOMATICA_SINISTRO/007_DDL_documento_detalhe_chassi.sql |
| ultron-sinistro-scripts-sql | documento_parametrizacao | `id_complexidade_documento` | `smallint` | ALTER_ADD_COLUMN | .../SCRIPTS_ACIDENTES_PESSOAIS_SINISTROS_MULTIPLOS/0011_DDL_AL_APSM_DOCUMENTO_PARAMETRIZACAO.sql |
| ultron-sinistro-scripts-sql | documento_parametrizacao | `id_documento` | `int` | CREATE_TABLE | .../DDL/17.0.0_documento_parametrizacao.sql |
| ultron-sinistro-scripts-sql | documento_parametrizacao | `id_documento_parametrizacao` | `bigint` | CREATE_TABLE | .../DDL/17.0.0_documento_parametrizacao.sql |
| ultron-sinistro-scripts-sql | documento_status | `id_documento_status` | `smallint` | CREATE_TABLE | .../dominio/documento_status.sql |
| ultron-sinistro-scripts-sql | encerramento_documentacao | `id_tipo_documento` | `int` | CREATE_TABLE | .../DDL/16.7.1_encerramento_documentacao.sql |
| ultron-sinistro-scripts-sql | esteira_parametro_variavel | `nr_recente_cpf_pos` | `smallint` | CREATE_TABLE | .../SCRIPTS_ITENS_PESSOAIS_2/022_DDL_esteira_parametro_variavel.sql |
| ultron-sinistro-scripts-sql | esteira_parametro_variavel | `nr_recente_cpf_primeiro_valor` | `smallint` | CREATE_TABLE | .../SCRIPTS_ITENS_PESSOAIS_2/022_DDL_esteira_parametro_variavel.sql |
| ultron-sinistro-scripts-sql | esteira_parametro_variavel | `nr_recente_cpf_segundo_valor` | `smallint` | CREATE_TABLE | .../SCRIPTS_ITENS_PESSOAIS_2/022_DDL_esteira_parametro_variavel.sql |
| ultron-sinistro-scripts-sql | exigencia_documento | `id_complexidade_documento` | `smallint` | ALTER_ADD_COLUMN | .../SCRIPTS_ACIDENTES_PESSOAIS_SINISTROS_MULTIPLOS/0024_DDL_exigencia_documento.sql |
| ultron-sinistro-scripts-sql | exigencia_documento | `id_documento` | `int` | CREATE_TABLE | .../DDL/16.5.2_exigencia_documento.sql |
| ultron-sinistro-scripts-sql | exigencia_documento | `id_documento_status` | `smallint` | CREATE_TABLE | .../DDL/16.5.2_exigencia_documento.sql |
| ultron-sinistro-scripts-sql | exigencia_documento | `id_exigencia_documento` | `bigint` | CREATE_TABLE | .../DDL/16.5.2_exigencia_documento.sql |
| ultron-sinistro-scripts-sql | exigencia_documento_arquivo | `id_documento_status` | `smallint` | CREATE_TABLE | .../R10S03/script_create_1.sql |
| ultron-sinistro-scripts-sql | exigencia_documento_arquivo | `id_exigencia_documento` | `bigint` | CREATE_TABLE | .../R10S03/script_create_1.sql |
| ultron-sinistro-scripts-sql | exigencia_documento_arquivo | `id_exigencia_documento_arquivo` | `bigint` | CREATE_TABLE | .../R10S03/script_create_1.sql |
| ultron-sinistro-scripts-sql | parametrizacao_tracking_sinistro | `qt_documento` | `int` | CREATE_TABLE | .../SPRINT_3/0003_DDL_CR_PARAMETRIZACAO_TRACKING_SINISTRO.sql |
| ultron-sinistro-scripts-sql | tipo_documento_detalhe | `id_documento_detalhe_chassi` | `int` | CREATE_TABLE | .../SCRIPTS_CONTAGEM_AUTOMATICA_SINISTRO/008_DDL_tipo_documento_detalhe.sql |
| ultron-sinistro-scripts-sql | tipo_documento_detalhe | `id_tipo_documento_detalhe` | `int` | CREATE_TABLE | .../SCRIPTS_CONTAGEM_AUTOMATICA_SINISTRO/008_DDL_tipo_documento_detalhe.sql |
| ultron-sinistro-sin-scripts-sql | documento_agrupador | `id_documento_agrupador` | `bigint` | CREATE_TABLE | .../DDL/4.5_documento_agrupador.sql |
| ultron-sinistro-sin-scripts-sql | documento_detalhe | `id_documento` | `int` | CREATE_TABLE | .../DDL/4.6_documento_detalhe.sql |
| ultron-sinistro-sin-scripts-sql | documento_detalhe | `id_documento_agrupador` | `bigint` | CREATE_TABLE | .../DDL/4.6_documento_detalhe.sql |
| ultron-sinistro-sin-scripts-sql | documento_detalhe | `id_documento_detalhe` | `bigint` | CREATE_TABLE | .../DDL/4.6_documento_detalhe.sql |
| ultron-sinistro-sin-scripts-sql | documento_parametrizacao | `id_documento` | `int` | CREATE_TABLE | .../DDL/4.7_documento_parametrizacao.sql |
| ultron-sinistro-sin-scripts-sql | documento_parametrizacao | `id_documento_parametrizacao` | `bigint` | CREATE_TABLE | .../DDL/4.7_documento_parametrizacao.sql |
| ultron-sinistro-sin-scripts-sql | documento_status | `id_documento_status` | `int` | CREATE_TABLE | .../DDL/3.0_documento_status.sql |
| ultron-sinistro-sin-scripts-sql | exigencia_documento | `id_documento` | `int` | CREATE_TABLE | .../DDL/3.4_exigencia_documento.sql |
| ultron-sinistro-sin-scripts-sql | exigencia_documento | `id_documento_status` | `int` | CREATE_TABLE | .../DDL/3.4_exigencia_documento.sql |
| ultron-sinistro-sin-scripts-sql | exigencia_documento | `id_exigencia_documento` | `bigint` | CREATE_TABLE | .../DDL/3.4_exigencia_documento.sql |

---

## Catálogo por Repositório

### ultron-assistencia-scripts-sql

**Ocorrências:** 12 | **Numéricas (ALTERAR):** 5

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| concessao_beneficio | `nr_cpf_cnpj` | `varchar(14)` | CPF_CNPJ | CREATE_TABLE | 8 |
| concessao_beneficio | `nr_cpf_cnpj` | `varchar(14)` | CPF_CNPJ | CREATE_TABLE | 9 |
| pessoa | `nm_cpf_cnpj` | `char(14)` | CPF_CNPJ | ALTER_CHANGE_COLUMN | 5 |
| pessoa | `nr_cpf_cnpj` | `varchar(14)` | CPF_CNPJ | CREATE_TABLE | 7 |
| proposta_seguro | `id_tipo_documento_emissao` | `tinyint ⚠️` | DOCUMENTO | CREATE_TABLE | 8 |
| proposta_seguro | `nr_documento_emissao` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 15 |
| retorno_minutrade | `id_tipo_documento_emissao` | `tinyint ⚠️` | DOCUMENTO | CREATE_TABLE | 13 |
| retorno_minutrade | `id_tipo_documento_emissao` | `tinyint ⚠️` | DOCUMENTO | CREATE_TABLE | 14 |
| retorno_minutrade | `nr_cpf_cnpj` | `varchar(14)` | CPF_CNPJ | CREATE_TABLE | 16 |
| retorno_minutrade | `nr_cpf_cnpj` | `varchar(14)` | CPF_CNPJ | CREATE_TABLE | 17 |
| tipo_documento_emissao | `id_tipo_documento_emissao` | `tinyint ⚠️` | DOCUMENTO | CREATE_TABLE | 6 |
| tipo_documento_emissao | `tx_tipo_documento_emissao` | `varchar(60)` | DOCUMENTO | CREATE_TABLE | 7 |

### ultron-cliente-ged-sql

**Ocorrências:** 2 | **Numéricas (ALTERAR):** 1

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| arquivo | `id_tipo_documento` | `int ⚠️` | DOCUMENTO | ALTER_ADD_COLUMN | 2 |
| arquivo | `nm_cpf_cnpj` | `nvarchar(14)` | CPF_CNPJ | ALTER_CHANGE_COLUMN | 12 |

### ultron-cliente-publishing-sql

**Ocorrências:** 5 | **Numéricas (ALTERAR):** 1

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| ccm | `nm_cpf_cnpj` | `nvarchar(14)` | CPF_CNPJ | ALTER_ADD_COLUMN | 7 |
| dbo | `CD_CPF_CNPJ_SEGURADO` | `varchar(20)` | CPF_CNPJ | CREATE_TABLE | 55 |
| notificacao | `nmCpfCnpj` | `nvarchar(14)` | CPF_CNPJ | ALTER_ADD_COLUMN | 1 |
| solicitacao | `nm_cpf_cnpj` | `nvarchar(14)` | CPF_CNPJ | ALTER_ADD_COLUMN | 26 |
| template | `id_tipo_documento` | `int ⚠️` | DOCUMENTO | ALTER_ADD_COLUMN | 4 |

### ultron-cliente-sql

**Ocorrências:** 10 | **Numéricas (ALTERAR):** 3

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| cliente | `nm_cpf_cnpj` | `nvarchar(14)` | CPF_CNPJ | ALTER_CHANGE_COLUMN | 20 |
| cliente | `nm_cpf_cnpj` | `nvarchar(15)` | CPF_CNPJ | ALTER_CHANGE_COLUMN | 42 |
| gafin_cliente_importado | `cd_cpf_cnpj` | `char(14)` | CPF_CNPJ | CREATE_TABLE | 10 |
| pendencia | `nm_cpf_cnpj` | `nvarchar(15)` | CPF_CNPJ | ALTER_CHANGE_COLUMN | 24 |
| pessoa | `id_pessoa_juridica` | `int ⚠️` | CNPJ | ALTER_ADD_COLUMN | 5 |
| pessoa | `nm_cpf_cnpj` | `nvarchar(14)` | CPF_CNPJ | ALTER_CHANGE_COLUMN | 5 |
| pessoa | `nm_cpf_cnpj` | `nvarchar(15)` | CPF_CNPJ | ALTER_CHANGE_COLUMN | 34 |
| pessoa_documento | `tp_documento` | `smallint ⚠️` | DOCUMENTO | ALTER_CHANGE_COLUMN | 5 |
| pessoa_documento | `tp_documento` | `int ⚠️` | DOCUMENTO | ALTER_CHANGE_COLUMN | 5 |
| solicitacao | `nm_cpf_cnpj` | `nvarchar(14)` | CPF_CNPJ | ALTER_ADD_COLUMN | 2 |

### ultron-comissao-script-ddldcl-sql

**Ocorrências:** 1 | **Numéricas (ALTERAR):** 0

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| extrato_comissao | `nm_cpf_cnpj` | `varchar(14)` | CPF_CNPJ | CREATE_TABLE | 21 |

### ultron-comissao-sql

**Ocorrências:** 1 | **Numéricas (ALTERAR):** 0

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| extrato_comissao | `nm_cpf_cnpj` | `varchar(14)` | CPF_CNPJ | CREATE_TABLE | 21 |

### ultron-emissao-endosso-parametro-scripts-ddldcl-sql

**Ocorrências:** 5 | **Numéricas (ALTERAR):** 4

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| endosso_documento | `id_endosso_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 9 |
| endosso_documento | `id_endosso_documento_situacao` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 13 |
| endosso_documento | `nm_identificador_documento` | `varchar(200)` | DOCUMENTO | CREATE_TABLE | 10 |
| endosso_documento_situacao | `id_endosso_documento_situacao` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 10 |
| tipo_endosso_oferta | `id_endosso_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 20 |

### ultron-emissao-endosso-sql

**Ocorrências:** 9 | **Numéricas (ALTERAR):** 7

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| endosso | `id_endosso_documento` | `bigint ⚠️` | DOCUMENTO | ALTER_ADD_COLUMN | 12 |
| endosso_documento | `id_endosso_documento` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 5 |
| endosso_documento | `id_endosso_documento` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 242 |
| endosso_documento | `id_endosso_documento_situacao` | `bigint ⚠️` | DOCUMENTO | ALTER_ADD_COLUMN | 6 |
| endosso_documento | `id_endosso_documento_situacao` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 247 |
| endosso_documento | `nm_identificador_documento` | `varchar(200)` | DOCUMENTO | CREATE_TABLE | 7 |
| endosso_documento | `nm_identificador_documento` | `varchar(200)` | DOCUMENTO | CREATE_TABLE | 244 |
| endosso_documento_situacao | `id_endosso_documento_situacao` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 5 |
| endosso_documento_situacao | `id_endosso_documento_situacao` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 26 |

### ultron-emissao-sql

**Ocorrências:** 23 | **Numéricas (ALTERAR):** 3

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| aprovacao_confirmacao_venda_bb | `nm_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 10 |
| aprovacao_confirmacao_venda_bb | `nm_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 10 |
| aprovacao_duplo_sim | `nm_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | ALTER_ADD_COLUMN | 19 |
| beneficiario | `nm_cpf_cnpj` | `varchar(255)` | CPF_CNPJ | CREATE_TABLE | 9 |
| controle_dps_cliente | `cd_cpf_cnpj` | `varchar(255)` | CPF_CNPJ | CREATE_TABLE | 7 |
| dbo | `nmCpfCnpj` | `varchar(255)` | CPF_CNPJ | CREATE_TABLE | 15 |
| dbo | `nmCpfCnpj` | `varchar(255)` | CPF_CNPJ | CREATE_TABLE | 12 |
| dbo | `nm_cpf` | `varchar(15)` | CPF | CREATE_TABLE | 9 |
| estipulante | `nm_cpf_cnpj` | `varchar(255)` | CPF_CNPJ | CREATE_TABLE | 10 |
| formalizacao_credito | `cd_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 10 |
| pendencia_contratacao | `cd_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 10 |
| proponente | `nm_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 11 |
| proposta | `cd_cnpj_seguradora` | `varchar(20)` | CNPJ | ALTER_ADD_COLUMN | 5 |
| proposta_comissionado | `nm_cpf_cnpj` | `varchar(255)` | CPF_CNPJ | CREATE_TABLE | 10 |
| proposta_documento | `id_proposta_documento` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 8 |
| proposta_documento | `nm_identificador_documento` | `varchar(200)` | DOCUMENTO | CREATE_TABLE | 10 |
| proposta_documento | `nm_origem_documento` | `varchar(200)` | DOCUMENTO | CREATE_TABLE | 14 |
| proposta_documento | `nm_tipo_documento` | `varchar(200)` | DOCUMENTO | CREATE_TABLE | 12 |
| proposta_documento | `nr_origem_documento` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 13 |
| proposta_documento | `nr_tipo_documento` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 11 |
| proposta_inspecao_previa | `nm_cpf` | `varchar(15)` | CPF | ALTER_ADD_COLUMN | 40 |
| subvencao_federal | `cd_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 16 |
| tomador | `nm_cpf_cnpj` | `varchar(255)` | CPF_CNPJ | CREATE_TABLE | 11 |

### ultron-emissao-subscricao-sql

**Ocorrências:** 28 | **Numéricas (ALTERAR):** 2

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| analise_medica_documentacao | `cd_cpf` | `varchar(11)` | CPF | CREATE_TABLE | 13 |
| analise_medica_documentacao | `cd_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 9 |
| analise_medica_documentacao | `nm_documento` | `varchar(60)` | DOCUMENTO | CREATE_TABLE | 11 |
| analise_medica_documentacao | `tx_url_documento` | `varchar(255)` | DOCUMENTO | CREATE_TABLE | 12 |
| cotacao_subscricao | `cd_cpf_cnpj_proponente` | `char(14)` | CPF_CNPJ | CREATE_TABLE | 11 |
| cotacao_subscricao_contato | `cd_cpf_cnpj_proponente` | `char(14)` | CPF_CNPJ | ALTER_ADD_COLUMN | 6 |
| cotacao_subscricao_contato | `cd_cpf_proponente` | `char(11)` | CPF | CREATE_TABLE | 6 |
| cotacao_subscricao_repique | `cd_cnpj_congenere` | `char(14)` | CNPJ | ALTER_ADD_COLUMN | 5 |
| dbo | `nm_cpf` | `varchar(100)` | CPF | CREATE_TABLE | 6 |
| dbo | `nm_cpf` | `varchar(100)` | CPF | CREATE_TABLE | 6 |
| exigencia_documentacao | `cd_cpf` | `varchar(11)` | CPF | CREATE_TABLE | 10 |
| exigencia_documentacao | `cd_documento` | `varchar(50)` | DOCUMENTO | CREATE_TABLE | 6 |
| exigencia_documentacao | `nm_documento` | `varchar(255)` | DOCUMENTO | CREATE_TABLE | 8 |
| exigencia_documentacao | `tx_url_documento` | `varchar(255)` | DOCUMENTO | CREATE_TABLE | 9 |
| h_analise_medica_documentacao | `cd_cpf` | `varchar(11)` | CPF | CREATE_TABLE | 13 |
| h_analise_medica_documentacao | `cd_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 9 |
| h_analise_medica_documentacao | `nm_documento` | `varchar(60)` | DOCUMENTO | CREATE_TABLE | 11 |
| h_analise_medica_documentacao | `tx_url_documento` | `varchar(255)` | DOCUMENTO | CREATE_TABLE | 12 |
| h_cotacao_subscricao | `cd_cpf_cnpj_proponente` | `char(14)` | CPF_CNPJ | CREATE_TABLE | 11 |
| h_exigencia_documentacao | `cd_cpf` | `varchar(11)` | CPF | CREATE_TABLE | 10 |
| h_exigencia_documentacao | `cd_documento` | `varchar(50)` | DOCUMENTO | CREATE_TABLE | 6 |
| h_exigencia_documentacao | `nm_documento` | `varchar(255)` | DOCUMENTO | CREATE_TABLE | 8 |
| h_exigencia_documentacao | `tx_url_documento` | `varchar(255)` | DOCUMENTO | CREATE_TABLE | 9 |
| h_parecer_medico | `cd_cpf` | `varchar(11)` | CPF | CREATE_TABLE | 6 |
| h_proposta_subscricao | `nm_cpf_cnpj` | `varchar(255)` | CPF_CNPJ | CREATE_TABLE | 11 |
| parecer_medico | `cd_cpf` | `varchar(11)` | CPF | CREATE_TABLE | 6 |
| proposta_subscricao | `nm_cpf_cnpj` | `varchar(255)` | CPF_CNPJ | CREATE_TABLE | 10 |
| proposta_subscricao_contato | `nm_cpf` | `varchar(100)` | CPF | ALTER_CHANGE_COLUMN | 2 |

### ultron-emissao-subvencao-scripts-ddldcl-sql

**Ocorrências:** 2 | **Numéricas (ALTERAR):** 0

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| proposta_integracao_subvencao | `nr_cpf_cnpj_segurado` | `char(14)` | CPF_CNPJ | CREATE_TABLE | 40 |
| subvencao_federal | `cd_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 16 |

### ultron-financeiro-sap-scripts-sql

**Ocorrências:** 12 | **Numéricas (ALTERAR):** 0

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| INTEGRA_APOLICE | `CD_CPFCNPJ` | `varchar(20)` | CPF_CNPJ | CREATE_TABLE | 20 |
| INTEGRA_APOLICE | `CD_CPFCNPJ` | `varchar(20)` | CPF_CNPJ | CREATE_TABLE | 20 |
| INTEGRA_APOLICE | `CD_CPFCNPJ_ALT` | `varchar(20)` | CPF_CNPJ | CREATE_TABLE | 28 |
| INTEGRA_APOLICE | `CD_CPFCNPJ_ALT` | `varchar(20)` | CPF_CNPJ | CREATE_TABLE | 28 |
| INTEGRA_APOLICE | `CD_CPFCNPJ_CORR` | `varchar(20)` | CPF_CNPJ | CREATE_TABLE | 27 |
| INTEGRA_APOLICE | `CD_CPFCNPJ_CORR` | `varchar(20)` | CPF_CNPJ | CREATE_TABLE | 27 |
| INTEGRA_CAB_PAGAMENTO | `CD_CPFCNPJ` | `varchar( 20 )` | CPF_CNPJ | CREATE_TABLE | 21 |
| INTEGRA_CAB_PARCELA | `CD_CPFCNPJ` | `varchar(20)` | CPF_CNPJ | CREATE_TABLE | 20 |
| INTEGRA_CAB_PARCELA | `DT_DOCUMENTO` | `varchar(8)` | DOCUMENTO | CREATE_TABLE | 54 |
| INTEGRA_CLIENTE | `CD_CPFCNPJ` | `varchar(20)` | CPF_CNPJ | CREATE_TABLE | 21 |
| INTEGRA_LOG_CLIENTE | `CD_CPFCNPJ` | `varchar(20)` | CPF_CNPJ | CREATE_TABLE | 13 |
| INTEGRA_RETORNO_PG | `CD_CPFCNPJ` | `varchar(20)` | CPF_CNPJ | CREATE_TABLE | 25 |

### ultron-financeiro-scripts-sql

**Ocorrências:** 10 | **Numéricas (ALTERAR):** 3

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| agencia_bancaria | `nr_cnpj_agencia_bancaria` | `bigint ⚠️` | CNPJ | CREATE_TABLE | 7 |
| banco | `nr_cnpj_base` | `int ⚠️` | CNPJ | CREATE_TABLE | 5 |
| dado_fiscal | `id_tipo_documento_fiscal` | `smallint ⚠️` | DOCUMENTO | CREATE_TABLE | 5 |
| dado_fiscal | `nm_documento_fiscal` | `varchar(60)` | DOCUMENTO | CREATE_TABLE | 7 |
| historico_ultron_inadimplencia | `cd_cpf_cnpj` | `varchar(14)` | CPF_CNPJ | CREATE_TABLE | 10 |
| pessoa | `tx_documento` | `varchar(30)` | DOCUMENTO | CREATE_TABLE | 3 |
| restricao_cobranca | `cd_cpf_cnpj` | `varchar(14)` | CPF_CNPJ | ALTER_ADD_COLUMN | 121 |
| restricao_cobranca | `nm_Cliente_CPF_CNPJ` | `varchar(30)` | CPF_CNPJ | CREATE_TABLE | 20 |
| tipo_comissao_comissionado | `cd_inscricao_estadual` | `varchar(14)` | DOCUMENTO | CREATE_TABLE | 7 |
| tipo_comissao_comissionado | `cd_inscricao_estadual` | `varchar(14)` | DOCUMENTO | ALTER_ADD_COLUMN | 17 |

### ultron-fraude-scripts-sql

**Ocorrências:** 1 | **Numéricas (ALTERAR):** 0

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| pessoa | `tx_documento` | `varchar(90)` | DOCUMENTO | CREATE_TABLE | 4 |

### ultron-governanca-arquivo-sql

**Ocorrências:** 1 | **Numéricas (ALTERAR):** 0

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| controle_envio_bic | `cd_cpf_cnpj` | `char(14)` | CPF_CNPJ | CREATE_TABLE | 23 |

### ultron-governanca-recursos-humanos-sql

**Ocorrências:** 2 | **Numéricas (ALTERAR):** 0

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| cargo | `nm_cpf` | `varchar(11)` | CPF | CREATE_TABLE | 177 |
| cargo | `nm_cpf_gestor` | `varchar(11)` | CPF | CREATE_TABLE | 174 |

### ultron-migracao-renovacao-sql

**Ocorrências:** 4 | **Numéricas (ALTERAR):** 0

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| bic_bbs242 | `nm_cpf_cnpj` | `varchar(14)` | CPF_CNPJ | CREATE_TABLE | 19 |
| dbo | `cd_cpf_cnpj` | `char(14)` | CPF_CNPJ | CREATE_TABLE | 7 |
| dbo | `cd_cpf_cnpj` | `char(14)` | CPF_CNPJ | CREATE_TABLE | 5 |
| dbo | `cd_cpf_cnpj` | `varchar(14)` | CPF_CNPJ | CREATE_TABLE | 13 |

### ultron-produto-scripts-sql

**Ocorrências:** 9 | **Numéricas (ALTERAR):** 0

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| canal | `nm_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 25 |
| canal | `nm_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 25 |
| canal | `nr_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 9 |
| canal | `nr_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 9 |
| congenere | `nm_cnpj` | `varchar(15)` | CNPJ | CREATE_TABLE | 7 |
| credor | `cd_cpf_cnpj` | `char(15)` | CPF_CNPJ | CREATE_TABLE | 21 |
| credor | `cpf_cnpj` | `varchar(45)` | CPF_CNPJ | CREATE_TABLE | 8 |
| seguradora | `nr_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 8 |
| seguradora | `nr_cpf_cnpj` | `varchar(15)` | CPF_CNPJ | CREATE_TABLE | 8 |

### ultron-sinistro-scripts-sql

**Ocorrências:** 42 | **Numéricas (ALTERAR):** 31

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| arquivo_notificacao | `id_exigencia_documento_arquivo` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 6 |
| chassi_anotacao_parametro | `id_documento_chassi` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 6 |
| documento_agrupador | `id_documento_agrupador` | `bigint ⚠️` | DOCUMENTO | ALTER_CHANGE_COLUMN | 28 |
| documento_agrupador | `id_documento_agrupador` | `smallint ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |
| documento_agrupador | `nm_documento_agrupador` | `varchar(60)` | DOCUMENTO | CREATE_TABLE | 3 |
| documento_chassi | `id_documento_chassi` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |
| documento_detalhe | `id_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 4 |
| documento_detalhe | `id_documento_agrupador` | `smallint ⚠️` | DOCUMENTO | CREATE_TABLE | 3 |
| documento_detalhe | `id_documento_agrupador` | `bigint ⚠️` | DOCUMENTO | ALTER_CHANGE_COLUMN | 26 |
| documento_detalhe | `id_documento_detalhe` | `smallint ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |
| documento_detalhe | `id_documento_detalhe` | `bigint ⚠️` | DOCUMENTO | ALTER_CHANGE_COLUMN | 25 |
| documento_detalhe | `nm_documento` | `varchar(90)` | DOCUMENTO | ALTER_ADD_COLUMN | 46 |
| documento_detalhe_chassi | `id_documento_chassi` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 7 |
| documento_detalhe_chassi | `id_documento_detalhe` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 6 |
| documento_detalhe_chassi | `id_documento_detalhe_chassi` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 5 |
| documento_parametrizacao | `id_complexidade_documento` | `smallint ⚠️` | DOCUMENTO | ALTER_ADD_COLUMN | 16 |
| documento_parametrizacao | `id_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 7 |
| documento_parametrizacao | `id_documento_parametrizacao` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |
| documento_status | `id_documento_status` | `smallint ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |
| documento_status | `nm_documento_status` | `varchar(60)` | DOCUMENTO | CREATE_TABLE | 3 |
| encerramento_documentacao | `id_tipo_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 6 |
| esteira_parametro_variavel | `nr_recente_cpf_pos` | `smallint ⚠️` | CPF | CREATE_TABLE | 37 |
| esteira_parametro_variavel | `nr_recente_cpf_primeiro_valor` | `smallint ⚠️` | CPF | CREATE_TABLE | 39 |
| esteira_parametro_variavel | `nr_recente_cpf_segundo_valor` | `smallint ⚠️` | CPF | CREATE_TABLE | 40 |
| exigencia_documento | `id_complexidade_documento` | `smallint ⚠️` | DOCUMENTO | ALTER_ADD_COLUMN | 11 |
| exigencia_documento | `id_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 5 |
| exigencia_documento | `id_documento_status` | `smallint ⚠️` | DOCUMENTO | CREATE_TABLE | 4 |
| exigencia_documento | `id_exigencia_documento` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |
| exigencia_documento_arquivo | `id_documento_status` | `smallint ⚠️` | DOCUMENTO | CREATE_TABLE | 4 |
| exigencia_documento_arquivo | `id_exigencia_documento` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 3 |
| exigencia_documento_arquivo | `id_exigencia_documento_arquivo` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |
| inspecao_timeline | `cd_cnpj` | `varchar(14)` | CNPJ | CREATE_TABLE | 11 |
| inspecao_timeline | `cd_cnpj` | `char(14)` | CNPJ | CREATE_TABLE | 21 |
| inspecao_timeline | `cd_cnpj` | `char(14)` | CNPJ | CREATE_TABLE | 21 |
| pagamento_prestador | `cd_documento_fiscal` | `varchar(60)` | DOCUMENTO | CREATE_TABLE | 6 |
| pagamento_prestador | `nm_documento_fiscal` | `varchar(60)` | DOCUMENTO | CREATE_TABLE | 7 |
| parametrizacao_tracking_sinistro | `qt_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 57 |
| pessoa_representante_legal | `cd_cpf_representante_legal` | `char(11)` | CPF | CREATE_TABLE | 19 |
| pessoa_sinistrada | `cd_cpf_cnpj_pessoa` | `varchar(14)` | CPF_CNPJ | ALTER_CHANGE_COLUMN | 109 |
| prestador | `nr_inscricao_municipal` | `varchar(11)` | DOCUMENTO | CREATE_TABLE | 12 |
| tipo_documento_detalhe | `id_documento_detalhe_chassi` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 6 |
| tipo_documento_detalhe | `id_tipo_documento_detalhe` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 5 |

### ultron-sinistro-sin-scripts-sql

**Ocorrências:** 12 | **Numéricas (ALTERAR):** 10

| Tabela | Coluna | Tipo | Classificação | Operação | Linha |
|--------|--------|------|--------------|----------|-------|
| documento_agrupador | `id_documento_agrupador` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |
| documento_agrupador | `nm_documento_agrupador` | `varchar(60)` | DOCUMENTO | CREATE_TABLE | 3 |
| documento_detalhe | `id_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 4 |
| documento_detalhe | `id_documento_agrupador` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 3 |
| documento_detalhe | `id_documento_detalhe` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |
| documento_parametrizacao | `id_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 7 |
| documento_parametrizacao | `id_documento_parametrizacao` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |
| documento_status | `id_documento_status` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |
| documento_status | `nm_documento_status` | `varchar(60)` | DOCUMENTO | CREATE_TABLE | 3 |
| exigencia_documento | `id_documento` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 5 |
| exigencia_documento | `id_documento_status` | `int ⚠️` | DOCUMENTO | CREATE_TABLE | 4 |
| exigencia_documento | `id_exigencia_documento` | `bigint ⚠️` | DOCUMENTO | CREATE_TABLE | 2 |

---

## Evolução do Modelo (ALTER TABLE)

Registros de ALTER TABLE que adicionaram ou modificaram colunas de documento:

| Repo | Tabela | Coluna | Tipo | Operação | Arquivo |
|------|--------|--------|------|----------|---------|
| ultron-assistencia-scripts-sql | pessoa | `nm_cpf_cnpj` | `char(14)` | ALTER_CHANGE_COLUMN | .../R08S04/H8/update_R08S04_H08_DDL_01.sql |
| ultron-cliente-ged-sql | arquivo | `id_tipo_documento` | `int` | ALTER_ADD_COLUMN | .../repos_sql/ultron-cliente-ged-sql/0000006-prd20191114141133_alter_table_arquivo_-_alter_table_tipo_documento_f.sql |
| ultron-cliente-ged-sql | arquivo | `nm_cpf_cnpj` | `nvarchar(14)` | ALTER_CHANGE_COLUMN | .../repos_sql/ultron-cliente-ged-sql/0000007-prd20191119115643_alter_table_arquivo_-_alter_table_arquivo_-_alter_.sql |
| ultron-cliente-publishing-sql | notificacao | `nmCpfCnpj` | `nvarchar(14)` | ALTER_ADD_COLUMN | .../repos_sql/ultron-cliente-publishing-sql/0000013-prd20200213184800_alter_table_notificacao_-_alter_table_notificacao.sql |
| ultron-cliente-publishing-sql | ccm | `nm_cpf_cnpj` | `nvarchar(14)` | ALTER_ADD_COLUMN | .../repos_sql/ultron-cliente-publishing-sql/0000038-prd20200824120040_alter_table_ccm_-_alter_table_ccm_-_alter_table_cc.sql |
| ultron-cliente-publishing-sql | template | `id_tipo_documento` | `int` | ALTER_ADD_COLUMN | .../repos_sql/ultron-cliente-publishing-sql/0000067-prd20210504180210_alter_table_operacao_-_alter_table_template_-_alte.sql |
| ultron-cliente-publishing-sql | solicitacao | `nm_cpf_cnpj` | `nvarchar(14)` | ALTER_ADD_COLUMN | .../repos_sql/ultron-cliente-publishing-sql/0000069-prd20210602165412_alter_table_solicitacao_-_alter_table_solicitacao_.sql |
| ultron-cliente-sql | pessoa | `id_pessoa_juridica` | `int` | ALTER_ADD_COLUMN | .../repos_sql/ultron-cliente-sql/0000012-prd20191111143644_alter_table_pessoa_-_alter_table_pessoa_-_alter_ta.sql |
| ultron-cliente-sql | pessoa | `nm_cpf_cnpj` | `nvarchar(14)` | ALTER_CHANGE_COLUMN | .../repos_sql/ultron-cliente-sql/0000024-prd20191218150603_alter_table_pessoa_-_alter_table_pessoa_-_alter_ta.sql |
| ultron-cliente-sql | cliente | `nm_cpf_cnpj` | `nvarchar(14)` | ALTER_CHANGE_COLUMN | .../repos_sql/ultron-cliente-sql/0000024-prd20191218150603_alter_table_pessoa_-_alter_table_pessoa_-_alter_ta.sql |
| ultron-cliente-sql | solicitacao | `nm_cpf_cnpj` | `nvarchar(14)` | ALTER_ADD_COLUMN | .../repos_sql/ultron-cliente-sql/0000040-prd20200323151026_alter_table_solicitacao_-_alter_table_template_sol.sql |
| ultron-cliente-sql | pessoa_documento | `tp_documento` | `smallint` | ALTER_CHANGE_COLUMN | .../repos_sql/ultron-cliente-sql/0000056-prd20200703112418_alter_table_pessoa_documento.sql |
| ultron-cliente-sql | pessoa_documento | `tp_documento` | `int` | ALTER_CHANGE_COLUMN | .../repos_sql/ultron-cliente-sql/0000058-prd20200714151146_alter_table_pessoa_documento_-_alter_table_pessoa_.sql |
| ultron-cliente-sql | pendencia | `nm_cpf_cnpj` | `nvarchar(15)` | ALTER_CHANGE_COLUMN | .../repos_sql/ultron-cliente-sql/0000084-prd20210713120303_alter_table_pendencia_-_alter_table_pendencia_-_al.sql |
| ultron-cliente-sql | pessoa | `nm_cpf_cnpj` | `nvarchar(15)` | ALTER_CHANGE_COLUMN | .../repos_sql/ultron-cliente-sql/0000084-prd20210713120303_alter_table_pendencia_-_alter_table_pendencia_-_al.sql |
| ultron-cliente-sql | cliente | `nm_cpf_cnpj` | `nvarchar(15)` | ALTER_CHANGE_COLUMN | .../repos_sql/ultron-cliente-sql/0000084-prd20210713120303_alter_table_pendencia_-_alter_table_pendencia_-_al.sql |
| ultron-emissao-endosso-sql | endosso | `id_endosso_documento` | `bigint` | ALTER_ADD_COLUMN | .../repos_sql/ultron-emissao-endosso-sql/000000090000_alter_table_endosso_add_nm_roteiro_e_id_endosso_documento.sql |
| ultron-emissao-endosso-sql | endosso_documento | `id_endosso_documento_situacao` | `bigint` | ALTER_ADD_COLUMN | .../repos_sql/ultron-emissao-endosso-sql/000000100000_alter_table_endosso_add_id_endosso_documento.sql |
| ultron-emissao-sql | aprovacao_duplo_sim | `nm_cpf_cnpj` | `varchar(15)` | ALTER_ADD_COLUMN | .../repos_sql/ultron-emissao-sql/000000810000_alter_table_aprovacao_duplo_sim_add_columns.sql |
| ultron-emissao-sql | proposta_inspecao_previa | `nm_cpf` | `varchar(15)` | ALTER_ADD_COLUMN | .../repos_sql/ultron-emissao-sql/000000970000_alter_table_proposta_inspecao_previa_add_campos_nmContato_nmCpf.sql |
| ultron-emissao-sql | proposta | `cd_cnpj_seguradora` | `varchar(20)` | ALTER_ADD_COLUMN | .../repos_sql/ultron-emissao-sql/009910000000_alter_table_proposta_add_campos_seguradora.sql |
| ultron-emissao-subscricao-sql | proposta_subscricao_contato | `nm_cpf` | `varchar(100)` | ALTER_CHANGE_COLUMN | .../repos_sql/ultron-emissao-subscricao-sql/000000510000_alter_table_proposta_subscricao_contato.sql |
| ultron-emissao-subscricao-sql | cotacao_subscricao_contato | `cd_cpf_cnpj_proponente` | `char(14)` | ALTER_ADD_COLUMN | .../ultron-emissao-subscricao-sql/backoffice/00000000018_alter_table_cotacao_subscricao_contato_modify_cd_cpf_proponente.sql |
| ultron-emissao-subscricao-sql | cotacao_subscricao_repique | `cd_cnpj_congenere` | `char(14)` | ALTER_ADD_COLUMN | .../ultron-emissao-subscricao-sql/backoffice/00000000026_alter_table_cotacao_subscricao_repique_add_cd_cnpj_congenere.sql |
| ultron-financeiro-scripts-sql | restricao_cobranca | `cd_cpf_cnpj` | `varchar(14)` | ALTER_ADD_COLUMN | .../2.UPDATE/DDL/20240301_alter_table_restricao_cobranca.sql |
| ultron-financeiro-scripts-sql | tipo_comissao_comissionado | `cd_inscricao_estadual` | `varchar(14)` | ALTER_ADD_COLUMN | .../DDL/2.0.0/R07S05H07_0.1_alter_table_tipo_comissao_comissionado_addColumn.sql |
| ultron-sinistro-scripts-sql | documento_detalhe | `id_documento_detalhe` | `bigint` | ALTER_CHANGE_COLUMN | .../ultron-sinistro-scripts-sql/DDL/IM03219880.sql |
| ultron-sinistro-scripts-sql | documento_detalhe | `id_documento_agrupador` | `bigint` | ALTER_CHANGE_COLUMN | .../ultron-sinistro-scripts-sql/DDL/IM03219880.sql |
| ultron-sinistro-scripts-sql | documento_agrupador | `id_documento_agrupador` | `bigint` | ALTER_CHANGE_COLUMN | .../ultron-sinistro-scripts-sql/DDL/IM03219880.sql |
| ultron-sinistro-scripts-sql | documento_detalhe | `nm_documento` | `varchar(90)` | ALTER_ADD_COLUMN | .../ultron-sinistro-scripts-sql/SCRIPT_SPRINT/001_alter.sql |
| ultron-sinistro-scripts-sql | documento_parametrizacao | `id_complexidade_documento` | `smallint` | ALTER_ADD_COLUMN | .../SCRIPT_SPRINT/SCRIPTS_ACIDENTES_PESSOAIS_SINISTROS_MULTIPLOS/0011_DDL_AL_APSM_DOCUMENTO_PARAMETRIZACAO.sql |
| ultron-sinistro-scripts-sql | exigencia_documento | `id_complexidade_documento` | `smallint` | ALTER_ADD_COLUMN | .../SCRIPT_SPRINT/SCRIPTS_ACIDENTES_PESSOAIS_SINISTROS_MULTIPLOS/0024_DDL_exigencia_documento.sql |
| ultron-sinistro-scripts-sql | pessoa_sinistrada | `cd_cpf_cnpj_pessoa` | `varchar(14)` | ALTER_CHANGE_COLUMN | .../SCRIPT_SPRINT/Scripts_vida/01_DDL_AL_padronizacao_campos.sql |

---

## Legenda

| Termo | Definição |
|-------|-----------|
| `CREATE_TABLE` | Coluna definida no script de criação inicial da tabela |
| `ALTER_ADD_COLUMN` | Coluna adicionada via ALTER TABLE ADD (evolução do schema) |
| `ALTER_CHANGE_COLUMN` | Tipo da coluna alterado via ALTER TABLE ALTER COLUMN |
| Tipo numérico ⚠️ | `BIGINT`, `INT`, `SMALLINT`, `TINYINT`, `NUMERIC`, `DECIMAL` — incompatível com CNPJ alfanumérico |
| Tipo string ✓ | `VARCHAR`, `NVARCHAR`, `CHAR`, `NCHAR` — compatível com CNPJ alfanumérico |

*Gerado por `analyze_ultron_sql_model.py`*