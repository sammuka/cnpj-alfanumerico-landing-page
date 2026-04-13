export interface PipelinePhase {
  numero: number;
  nome: string;
  periodo: string;
  ferramentas: string[];
  metrica: string;
  detalhes: string;
}

export const PHASES: PipelinePhase[] = [
  {
    numero: 1,
    nome: 'Discovery',
    periodo: '18-20 Mar',
    ferramentas: ['F01', 'F02', 'F03'],
    metrica: '202.795 arquivos indexados, 1.843 aliases descobertos',
    detalhes: 'F01 inventariou todos os repositorios e arquivos fonte. F02 descobriu 1.843 aliases para CNPJ partindo de 148 seeds iniciais (nomes de variaveis, colunas, parametros). F03 executou busca lexical em todos os arquivos usando os aliases como termos de busca.',
  },
  {
    numero: 2,
    nome: 'Deteccao Estrutural',
    periodo: '19-20 Mar',
    ferramentas: ['F04', 'F05', 'F06', 'F07', 'F08', 'F09', 'F10', 'F11', 'F12'],
    metrica: '25.083 achados no pipeline principal',
    detalhes: 'Nove ferramentas em paralelo analisaram assinaturas estruturais, validacoes/mascaras, conversoes numericas, schemas SQL, contratos API, regras mistas, SAST via Semgrep, impacto em testes e priorizacao final do backlog.',
  },
  {
    numero: 3,
    nome: 'GAP Analysis',
    periodo: '20-24 Mar',
    ferramentas: ['F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22'],
    metrica: '12.115 achados adicionais, 3.150 ALTERAR',
    detalhes: 'Dez ferramentas complementares varreram padroes nao cobertos pelo pipeline principal: formato hardcoded, utilitarios de CNPJ, semantica de documento, schemas ORM, constraints de UI, fixtures de teste, strip numerico, coercao SQL, inferencia semantica e range numerico.',
  },
  {
    numero: 4,
    nome: 'Complement + SQL',
    periodo: '23-25 Mar',
    ferramentas: ['F23', 'F24', 'F25', 'F26', 'F27', 'F28', 'F29', 'F00', 'F10'],
    metrica: '10.507 complement + 70 SQL + 314 Semgrep',
    detalhes: 'Ferramentas de assinatura multi-line, dependencia de regra numerica, annotation de serializacao, schema message contract, e modelo SQL dedicado. F00 analisou 86 tabelas com colunas numericas. F10 (Semgrep) reexecutado com regras refinadas.',
  },
  {
    numero: 5,
    nome: 'Revisao Agentica',
    periodo: '21-27 Mar',
    ferramentas: ['F30'],
    metrica: '1.561 batches, 15.325 achados revisados com IA',
    detalhes: 'Cada batch de ~10 achados foi analisado por IA com contexto de +-30 linhas. A IA classificou cada achado em CONFIRMA_ALTERAR, DOWNSTREAM_ABSORVIDO, FALSO_POSITIVO ou INCONCLUSIVO, com rastreabilidade de cascata entre raiz e downstream.',
  },
  {
    numero: 6,
    nome: 'Refinamento',
    periodo: '27 Mar',
    ferramentas: ['F31', 'F32'],
    metrica: '-110 FPs, +317 TPs → 6.820 backlog final',
    detalhes: 'F31 aplicou heuristicas de fine-tuning para remover 110 falsos positivos remanescentes. F32 reexecutou regras Semgrep refinadas e adicionou 317 verdadeiros positivos. Resultado: 6.820 itens no backlog final.',
  },
];
