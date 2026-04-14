export interface Wave {
  numero: string;
  nome: string;
  pontos: number | string;
  percentualBacklog: number;
  descricao: string;
  justificativa: string;
  duracao: string;
  risco: 'CRITICO' | 'ALTO' | 'MEDIO';
  cor: string;
  equipe: string[];
  tecnologias: string[];
  repositoriosDestaque: string[];
  criterioConclusao: string;
  dependencias: string[];
}

export const WAVES: Wave[] = [
  {
    numero: '0',
    nome: 'Utilitarios',
    pontos: 363,
    percentualBacklog: 5,
    descricao: 'Maximo impacto por alteracao',
    justificativa: 'Corrigir funcoes utilitarias compartilhadas (ValidaCpfCnpj, somenteNumeros, formatarDocumento) que propagam para dezenas de arquivos downstream. Uma alteracao na raiz resolve multiplos pontos automaticamente.',
    duracao: '1–2 sprints',
    risco: 'CRITICO',
    cor: '#7c3aed',
    equipe: ['Java', 'VB6'],
    tecnologias: ['Java', 'VB6', 'Spring'],
    repositoriosDestaque: [
      'ValidaCpfCnpj.java',
      'somenteNumeros()',
      'formatarDocumento()',
      'MaskCpfCnpj.vb',
      'CnpjUtils.java',
    ],
    criterioConclusao: 'Todos os downstream absorvidos validados com CNPJ alfanumerico nos testes de regressao.',
    dependencias: [],
  },
  {
    numero: '1',
    nome: 'ULTRON Top 30',
    pontos: '~2.000',
    percentualBacklog: 29,
    descricao: 'Sistemas criticos de negocio',
    justificativa: '55,3% do backlog, maior exposicao de negocio (emissao, sinistro, financeiro). Priorizar os 30 repositorios com maior concentracao de risco ALTO.',
    duracao: '8–10 semanas',
    risco: 'ALTO',
    cor: '#3b82f6',
    equipe: ['Java', 'Spring Boot'],
    tecnologias: ['Java 17', 'Spring Boot', 'JPA/Hibernate', 'OpenAPI'],
    repositoriosDestaque: [
      'PropostaService.java',
      'EmissaoService.java',
      'SinistroService.java',
      'EndossoService.java',
      'CobrancaService.java',
    ],
    criterioConclusao: 'Todos os endpoints REST aceitando CNPJ alfanumerico sem erro de validacao e testes de integracao atualizados.',
    dependencias: ['Wave 0'],
  },
  {
    numero: '2',
    nome: 'SEGBR',
    pontos: 1_742,
    percentualBacklog: 26,
    descricao: 'Legado VB6/ASP',
    justificativa: 'Alta concentracao por repositorio (348 pts/repo). Requer ambiente de desenvolvimento VB6 especializado e atencao a tipos de dados legados.',
    duracao: '6–8 semanas',
    risco: 'ALTO',
    cor: '#f59e0b',
    equipe: ['VB6 specialist', 'DBA'],
    tecnologias: ['VB6', 'ASP', 'ADO', 'SQL Server'],
    repositoriosDestaque: [
      '5 repos com >300 pts cada',
      'ADO Recordsets',
      'Mascaras VB6',
      'Stored Procedures',
    ],
    criterioConclusao: 'Campos CNPJ VB6 aceitando 14 chars alfanumericos; ADO e stored procs atualizados.',
    dependencias: ['Wave 0'],
  },
  {
    numero: '3',
    nome: 'SIMULADORES',
    pontos: 1_304,
    percentualBacklog: 19,
    descricao: 'Apps full-stack independentes',
    justificativa: '4 aplicacoes independentes (Agricola, Floresta, Patrimonio, Vida). Menor risco de impacto cruzado entre sistemas.',
    duracao: '4–6 semanas',
    risco: 'MEDIO',
    cor: '#10b981',
    equipe: ['Full-stack', 'React'],
    tecnologias: ['React', 'TypeScript', 'Java', 'Spring Boot'],
    repositoriosDestaque: [
      'SimulAgricola',
      'SimulFloresta',
      'SimulPatrimonio',
      'SimulVida',
    ],
    criterioConclusao: 'Os 4 simuladores com fluxo completo de simulacao aceitando CNPJ alfanumerico.',
    dependencias: ['Wave 0'],
  },
  {
    numero: 'SQL',
    nome: '97 Migracoes',
    pontos: 97,
    percentualBacklog: 1,
    descricao: 'Paralela com DBA',
    justificativa: 'Execucao independente do codigo. 86 tabelas, 70 colunas numericas. Coordenar com equipe de DBA para janelas de manutencao.',
    duracao: 'Paralela ~4 semanas',
    risco: 'ALTO',
    cor: '#06b6d4',
    equipe: ['DBA', 'DevOps'],
    tecnologias: ['Oracle SQL', 'PL/SQL', 'Scripts DBA'],
    repositoriosDestaque: [
      '86 tabelas afetadas',
      '70 colunas NUMBER→VARCHAR(14)',
      '97 scripts ALTER TABLE',
      'Scripts de rollback',
    ],
    criterioConclusao: '97 colunas migradas, dados validados, indices recriados, rollback testado.',
    dependencias: [],
  },
];
