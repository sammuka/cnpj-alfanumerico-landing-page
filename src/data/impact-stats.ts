export const STATS = {
  linhasCodigo: 38_548_968,
  repositorios: 1_086,
  ferramentas: 33,
  diasProjeto: 21,
  periodo: '18 de marco a 08 de abril de 2026',
  arquivosFonte: 202_795,
  aliasesDescobertos: 1_843,
  seedsIniciais: 148,

  // Backlog
  totalAlterarConfirmados: 14_425,
  duplicatasRemovidas: 954,
  backlogFinal: 6_820,

  // SQL
  sqlMigrations: 97,
  tabelasSql: 86,
  colunasNumericas: 70,

  // F30
  totalRevisadosF30: 15_325,
  totalBatchesF30: 1_561,
  fpsRemovidosF31: 110,
  tpsAdicionadosF32: 317,

  // Distribuicao por sistema (pos-F30 CA)
  caPorSistema: {
    ULTRON: 3_773,
    SEGBR: 1_742,
    SIMULADORES: 1_304,
  },

  // Distribuicao por risco
  porRisco: {
    ALTO: 10_770,
    MEDIO: 3_586,
    BAIXO: 69,
  },

  // Distribuicao por tipo impacto (top 10)
  porTipoImpacto: [
    { tipo: 'BACKLOG_PRIORIZADO', valor: 6_179 },
    { tipo: 'ROTINA_OU_CAMPO_REFERENCIA', valor: 5_049 },
    { tipo: 'CALLGRAPH_UTIL_CNPJ', valor: 697 },
    { tipo: 'BIAS_FIXTURE_TESTE', valor: 513 },
    { tipo: 'ASSINATURA_MULTILINE', valor: 433 },
    { tipo: 'REGRA_FORMATO_HARDCODEADA', valor: 406 },
    { tipo: 'CONSTRAINT_UI_DOCUMENTO', valor: 279 },
    { tipo: 'NUMERIC_CONVERSION', valor: 181 },
    { tipo: 'PIPELINE_STRIP_NUMERICO', valor: 141 },
    { tipo: 'DIGIT_STRIP', valor: 133 },
  ],

  // Decisoes F30
  decisoesF30: {
    CONFIRMA_ALTERAR: 6_819,
    DOWNSTREAM_ABSORVIDO: 7_413,
    FALSO_POSITIVO: 1_092,
    INCONCLUSIVO: 1,
  },

  // Por fonte pipeline
  porFontePipeline: {
    'F01-F12_MAIN': 11_228,
    'F13-F22_ULTRON_GAP': 1_992,
    'F23-F29_COMPLEMENT': 534,
    'F10_SEMGREP': 314,
    'F13-F22_GAP_SEGBR_SIMUL': 287,
    'F00_SQL_MODEL': 70,
  },
} as const;
