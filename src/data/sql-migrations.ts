export interface SqlMigration {
  sistema: string;
  repositorio: string;
  tokenCampo: string;
  sqlDetalhe: string;
  escopoImpacto: string;
}

export const SQL_MIGRATIONS: SqlMigration[] = [
  {
    "sistema": "SEGBR",
    "repositorio": "DLL",
    "tokenCampo": "cpf_cnpj",
    "sqlDetalhe": "cpf_cnpj: VARCHAR(14) → VARCHAR(20) para CNPJ alfanumérico",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "cpf/cgc: CONVERT(numeric) → remover conversão numérica; usar comparação string",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "SEGBR",
    "repositorio": "Executável",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "PPE_ORGAO_CARGO_TB.CPF / pessoa_fisica_tb.CPF: CAST AS BIGINT → reescrever comparação como string direta",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "banco-do-brasil-portal-cliente-backend",
    "tokenCampo": "cpfcnpj",
    "sqlDetalhe": "dbo.nmcpfcnpj tipo_atual→VARCHAR(14) — VERIFICAR: ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(14); INTEGRA_APOLICE.cd_cpfcnpj tipo_atual→VARCHAR(14) — VERIFICAR: ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj VARCHAR(14); INTEGRA_APOLICE.cd_cpfcnpj_corr tipo_atual→VARCHAR(14) — VERIFICAR: ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj_corr VARCHAR(14)",
    "escopoImpacto": "INTRA_ARQUIVO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "gerador-protocolo-backend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE <tabela> ALTER COLUMN cnpj VARCHAR(14);",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "plataforma-parceiro-frontend",
    "tokenCampo": "cpfcnpj",
    "sqlDetalhe": "ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL; | ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj VARCHAR(20) NOT NULL; | ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj_corr VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "plataforma-parceiro-frontend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "residencial-nao-correntista-frontend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "simulador-patrimonio-rural-admin-frontend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "simulador-patrimonio-rural-frontend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "simulador-vida-frontend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "simulador-vida-frontend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "simuladores-agricola-archive-itew0164",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "simuladores-agricola-itew0164",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "simuladores-patrimonial-archive-simulador-patrimonio-rural-frontend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "simuladores-simuladores-ui-lib",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "simuladores-ultron-empresarial-nao-correntista-frontend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "simuladores-vida-archive-simulador-vida-frontend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "simuladores-vida-archive-simulador-vida-frontend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "tlv-faleconosco-frontend",
    "tokenCampo": "cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE canal ALTER COLUMN nm_cpf_cnpj VARCHAR(20) NOT NULL; | ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-emissao-cotacao-backoffice-frontend",
    "tokenCampo": "cpfcnpj",
    "sqlDetalhe": "ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL; | ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj VARCHAR(20) NOT NULL; | ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj_corr VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-emissao-cotacao-habit-frontend",
    "tokenCampo": "cpfcnpj",
    "sqlDetalhe": "ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL; | ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj VARCHAR(20) NOT NULL; | ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj_corr VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-financeiro-dadobasico-backend",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "ALTER TABLE agencia_bancaria ALTER COLUMN nr_cnpj VARCHAR(20) NOT NULL; -- Alterar campo Long cnpj na entidade AgenciaBancaria para String",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-financeiro-dadobasico-backend",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "ALTER TABLE banco ALTER COLUMN nr_cnpj_base VARCHAR(8) NOT NULL; ALTER TABLE banco ALTER COLUMN nr_cnpj_sequencial VARCHAR(6) NOT NULL; ALTER TABLE banco ALTER COLUMN nr_cnpj_dv VARCHAR(2) NOT NULL; -- Alterar partes numericas do CNPJ do banco para VARCHAR",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-financeiro-dadobasico-backend",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "ALTER TABLE banco ALTER COLUMN nr_cnpj_base VARCHAR(8) NOT NULL; ALTER TABLE banco ALTER COLUMN nr_cnpj_sequencial VARCHAR(6) NOT NULL; ALTER TABLE banco ALTER COLUMN nr_cnpj_dv VARCHAR(2) NOT NULL; -- Alterar partes numericas do CNPJ do banco para VARCHAR",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-financeiro-lib",
    "tokenCampo": "getCnpj",
    "sqlDetalhe": "Coluna nr_cnpj BIGINT -> VARCHAR(14). Referencias: verificar",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-financeiro-lib",
    "tokenCampo": "setCnpj",
    "sqlDetalhe": "ALTER TABLE ajustar coluna nr_cnpj_agencia_bancaria para VARCHAR(14); atualizar ORM mapping.",
    "escopoImpacto": "MODELO_DADOS"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-financeiro-pagamento-backend",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "ALTER TABLE agencia_bancaria ALTER COLUMN nr_cnpj VARCHAR(20) NOT NULL; -- Alterar campo Long cnpj na entidade AgenciaBancaria para String",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-financeiro-pagamento-backend",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "ALTER TABLE banco ALTER COLUMN nr_cnpj_base VARCHAR(8) NOT NULL; ALTER TABLE banco ALTER COLUMN nr_cnpj_sequencial VARCHAR(6) NOT NULL; ALTER TABLE banco ALTER COLUMN nr_cnpj_dv VARCHAR(2) NOT NULL; -- Alterar partes numericas do CNPJ do banco para VARCHAR",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-financeiro-pessoa-backend",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "ALTER TABLE agencia_bancaria ALTER COLUMN nr_cnpj VARCHAR(20) NOT NULL; -- Alterar campo Long cnpj na entidade AgenciaBancaria para String",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-financeiro-pessoa-backend",
    "tokenCampo": "digit_strip_pipeline",
    "sqlDetalhe": "ALTER TABLE banco ALTER COLUMN nr_cnpj_base VARCHAR(8) NOT NULL; ALTER TABLE banco ALTER COLUMN nr_cnpj_sequencial VARCHAR(6) NOT NULL; ALTER TABLE banco ALTER COLUMN nr_cnpj_dv VARCHAR(2) NOT NULL; -- Alterar partes numericas do CNPJ do banco para VARCHAR",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-financeiro-scripts-sql",
    "tokenCampo": "nr_cnpj_base",
    "sqlDetalhe": "ALTER TABLE dbo.banco ALTER COLUMN nr_cnpj_base VARCHAR(12);",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-financeiro-scripts-sql",
    "tokenCampo": "nr_cnpj_agencia_bancaria",
    "sqlDetalhe": "ALTER TABLE dbo.agencia_bancaria ALTER COLUMN nr_cnpj_agencia_bancaria VARCHAR(14);",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-migracao-renovacao-controle-backend",
    "tokenCampo": "cpfcnpj",
    "sqlDetalhe": "ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL; | ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj VARCHAR(20) NOT NULL; | ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj_corr VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-migracao-renovacao-controle-backend",
    "tokenCampo": "cpfcnpj",
    "sqlDetalhe": "ALTER TABLE dbo ALTER COLUMN nmcpfcnpj VARCHAR(20) NOT NULL; | ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj VARCHAR(20) NOT NULL; | ALTER TABLE INTEGRA_APOLICE ALTER COLUMN cd_cpfcnpj_corr VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-migracao-segbr-renovacao-emr",
    "tokenCampo": "nr_cpf_cnpj",
    "sqlDetalhe": "ALTER TABLE canal ALTER COLUMN nr_cpf_cnpj VARCHAR(20) NOT NULL;",
    "escopoImpacto": "DIRETO"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-plataforma-bb-bff",
    "tokenCampo": "documento",
    "sqlDetalhe": "nr_cnpj BIGINT -> VARCHAR(14). Referencias: retorno_minutrade.id_tipo_documento_emissao (); tipo_documento_emissao.tx_tipo_documento_emissao (); proposta_seguro.nr_documento_emissao ()",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-sinistro-bb-backend",
    "tokenCampo": "documento",
    "sqlDetalhe": "nr_cnpj BIGINT -> VARCHAR(14). Referencias: retorno_minutrade.id_tipo_documento_emissao (); tipo_documento_emissao.tx_tipo_documento_emissao (); proposta_seguro.nr_documento_emissao ()",
    "escopoImpacto": "LOCAL"
  },
  {
    "sistema": "ULTRON",
    "repositorio": "ultron-sinistro-ultron-sinistro-bb-backend",
    "tokenCampo": "documento",
    "sqlDetalhe": "nr_cnpj BIGINT -> VARCHAR(14). Referencias: retorno_minutrade.id_tipo_documento_emissao (); tipo_documento_emissao.tx_tipo_documento_emissao (); proposta_seguro.nr_documento_emissao ()",
    "escopoImpacto": "LOCAL"
  }
];
