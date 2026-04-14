export interface ToolInfo {
  id: string;
  nome: string;
  descricao: string;
  achados?: string;
}

export const TOOLS: Record<string, ToolInfo> = {
  F00: {
    id: 'F00',
    nome: 'SQL Model',
    descricao: 'Analisou 86 tabelas com colunas numericas que armazenam CNPJ. Gerou lista de 97 comandos ALTER TABLE necessarios para ampliar tipo de NUMBER para VARCHAR(14).',
    achados: '97 migracoes SQL',
  },
  F01: {
    id: 'F01',
    nome: 'Inventario de Repositorios',
    descricao: 'Catalogou todos os 1.086 repositorios dos 3 sistemas (ULTRON, SEGBR, SIMULADORES). Gerou o mapa de 202.795 arquivos fonte e definiu o escopo completo de analise.',
    achados: '202.795 arquivos indexados',
  },
  F02: {
    id: 'F02',
    nome: 'Alias Discovery',
    descricao: 'Partindo de 148 seeds iniciais (nomes como nr_cnpj, cpf_cnpj, documento_fiscal), expandiu para 1.843 aliases via analise lexical e semantica do codebase inteiro.',
    achados: '1.843 aliases descobertos',
  },
  F03: {
    id: 'F03',
    nome: 'Busca Lexical',
    descricao: 'Executou busca full-text em todos os 202.795 arquivos usando os 1.843 aliases como termos de busca. Gerou os achados brutos iniciais do pipeline principal.',
    achados: 'Achados brutos do pipeline',
  },
  F04: {
    id: 'F04',
    nome: 'Assinatura Estrutural',
    descricao: 'Detectou assinaturas de metodo/funcao que recebem ou retornam CNPJ como parametro: tamanho fixo de 14 chars, tipo numerico ou string numerica pura.',
  },
  F05: {
    id: 'F05',
    nome: 'Validacao e Mascaras',
    descricao: 'Identificou expressoes regulares e mascaras de entrada que assumem CNPJ puramente numerico (14 digitos). Estas precisam ser atualizadas para aceitar A-Z.',
  },
  F06: {
    id: 'F06',
    nome: 'Conversao Numerica',
    descricao: 'Localizou pontos onde CNPJ e convertido para Long, Int64 ou parseado como numero. Todas essas conversoes falham silenciosamente com CNPJ alfanumerico.',
  },
  F07: {
    id: 'F07',
    nome: 'Schema SQL',
    descricao: 'Analisou DDL dos bancos de dados em busca de colunas NUMBER ou VARCHAR(<14) que armazenam CNPJ. Gerou a lista preliminar de migracoes necessarias.',
  },
  F08: {
    id: 'F08',
    nome: 'Contrato de API',
    descricao: 'Inspecionou specs OpenAPI/Swagger e DTOs em busca de campos CNPJ com restricao numerica (pattern: ^\\d{14}$ ou maxLength < 14) que rejeitam alfanumerico.',
  },
  F09: {
    id: 'F09',
    nome: 'Regras Mistas CPF/CNPJ',
    descricao: 'Detectou logica condicional que trata CPF e CNPJ de forma unificada. Separou casos de co-validacao que precisam atualizar ambos os formatos simultaneamente.',
  },
  F10: {
    id: 'F10',
    nome: 'SAST — Semgrep',
    descricao: 'Executou 47 regras Semgrep customizadas detectando padroes unsafe: parseInt(cnpj), cnpj.length==14 sem type guard, formatacao com zeros a esquerda, comparacoes numericas.',
    achados: '314 achados Semgrep',
  },
  F11: {
    id: 'F11',
    nome: 'Impacto em Testes',
    descricao: 'Identificou fixtures, mocks e assertions em testes automatizados com CNPJs numericos hardcoded. Esses testes falhariam em regressao apos a mudanca de formato.',
  },
  F12: {
    id: 'F12',
    nome: 'Priorizacao de Backlog',
    descricao: 'Classificou e ranqueou os 25.083 achados por criterios: criticidade de risco, sistema afetado, tipo de operacao e complexidade estimada de correcao.',
    achados: '25.083 achados priorizados',
  },
  F13: {
    id: 'F13',
    nome: 'Formato Hardcoded',
    descricao: 'Detectou strings literais "14 digitos", "apenas numeros" e expressoes /^\\d{14}$/ em comentarios, mensagens de erro e validacoes de UI que limitam o formato.',
  },
  F14: {
    id: 'F14',
    nome: 'Utilitarios CNPJ',
    descricao: 'Localizou classes e funcoes utilitarias de CNPJ espalhadas fora do modulo central: formatadores duplicados, mascaradores locais, validadores ad-hoc em cada modulo.',
  },
  F15: {
    id: 'F15',
    nome: 'Semantica de Documento',
    descricao: 'Analisou variaveis com nomes semanticamente relacionados a "documento" onde o contexto de negocio indica que o valor e CNPJ, mesmo sem o nome explicito no campo.',
  },
  F16: {
    id: 'F16',
    nome: 'Schema ORM',
    descricao: 'Inspecionou anotacoes JPA/Hibernate (@Column, @Size) e mapeamentos VB6/ADO em busca de restricoes de tamanho ou tipo que bloqueiam entrada alfanumerica.',
  },
  F17: {
    id: 'F17',
    nome: 'Constraint UI Documento',
    descricao: 'Detectou configuracoes de campos de formulario: maxlength="14", inputmode="numeric", type="number" e mascaras de UI que rejeitam letras na entrada do usuario.',
  },
  F18: {
    id: 'F18',
    nome: 'Fixtures de Teste',
    descricao: 'Encontrou dados de teste hardcoded com CNPJs numericos em arquivos JSON, XML, SQL INSERT e objetos de fixture. Todos precisam ser atualizados para o novo formato.',
  },
  F19: {
    id: 'F19',
    nome: 'Strip Numerico',
    descricao: 'Localizou operacoes de limpeza de CNPJ: replaceAll(/\\D/g, "") e similares que removem caracteres nao-numericos. Com CNPJ alfanumerico, destroem o valor.',
  },
  F20: {
    id: 'F20',
    nome: 'Coercao SQL',
    descricao: 'Detectou queries SQL com CAST(cnpj AS BIGINT), funcoes numericas aplicadas a CNPJ e filtros WHERE BETWEEN que pressupoe ordenacao numerica.',
  },
  F21: {
    id: 'F21',
    nome: 'Inferencia Semantica',
    descricao: 'Usou analise de contexto semantico para identificar campos que armazenam CNPJ sem ter o nome explicito: "documento_fiscal", "id_empresa", "chave_contribuinte".',
  },
  F22: {
    id: 'F22',
    nome: 'Range Numerico',
    descricao: 'Identificou comparacoes de intervalo sobre CNPJ (>= "00000000000000") que assumem ordenacao numerica lexicografica e quebrariam com letras maiusculas.',
  },
  F23: {
    id: 'F23',
    nome: 'Assinatura Multi-line',
    descricao: 'Detectou assinaturas de metodo que recebem CNPJ como parte de objeto complexo ou quando o parametro se estende por multiplas linhas, evadindo F04.',
    achados: '10.507 complementares',
  },
  F24: {
    id: 'F24',
    nome: 'Dependencia de Regra',
    descricao: 'Localizou dependencias entre regras de negocio: se A valida CNPJ e B depende de A, B tambem e afetado indiretamente mesmo sem mencionar CNPJ explicitamente.',
  },
  F25: {
    id: 'F25',
    nome: 'Annotation Serializacao',
    descricao: 'Inspecionou anotacoes Jackson (@JsonDeserialize), Gson e equivalentes VB6 que deserializam CNPJ com restricao de tipo numerico ou tamanho fixo.',
  },
  F26: {
    id: 'F26',
    nome: 'Schema Message Contract',
    descricao: 'Analisou contratos de mensagens Kafka, RabbitMQ e JMS com campos CNPJ tipados como integer ou com schema Avro/Protobuf de restricao numerica.',
  },
  F27: {
    id: 'F27',
    nome: 'Dependencia de Servico',
    descricao: 'Mapeou chamadas inter-servico (REST, SOAP, gRPC) onde CNPJ e transmitido como payload. Identificou contratos de interface que precisam ser atualizados em ambos os lados.',
  },
  F28: {
    id: 'F28',
    nome: 'Schema Validacao JSON',
    descricao: 'Inspecionou JSON Schema, Avro e Protobuf com campos CNPJ tipados como integer ou com restricao de pattern numerico que impede alfanumerico.',
  },
  F29: {
    id: 'F29',
    nome: 'Modelo SQL Dedicado',
    descricao: 'Segunda passagem focada em stored procedures, functions e triggers SQL que manipulam CNPJ internamente com operacoes numericas ou substring de posicao fixa.',
    achados: '70 achados SQL',
  },
  F30: {
    id: 'F30',
    nome: 'Revisao Agentica IA',
    descricao: 'Agente de IA revisou todos os 15.325 achados em 1.561 batches. Classificou cada um em CA/DA/FP/INC com contexto de +-30 linhas de codigo e rastreabilidade de cascata. Confianca acima de 95%.',
    achados: '15.325 revisados, 1.561 batches',
  },
  F31: {
    id: 'F31',
    nome: 'Fine-tuning Falsos Positivos',
    descricao: 'Aplicou heuristicas pos-revisao agentica para remover 110 falsos positivos remanescentes: arquivos de configuracao, documentacao e codigo morto que a IA sinalizou para revisao manual.',
    achados: '-110 falsos positivos',
  },
  F32: {
    id: 'F32',
    nome: 'Semgrep Refinado',
    descricao: 'Reexecutou 23 regras Semgrep com criterios refinados baseados nos aprendizados do F30. Adicionou 317 verdadeiros positivos que os criterios originais nao haviam capturado.',
    achados: '+317 verdadeiros positivos',
  },
};
