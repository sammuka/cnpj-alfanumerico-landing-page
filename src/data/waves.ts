export interface Wave {
  numero: string;
  nome: string;
  pontos: number | string;
  descricao: string;
  justificativa: string;
}

export const WAVES: Wave[] = [
  {
    numero: '0',
    nome: 'Utilitarios',
    pontos: 363,
    descricao: 'Maximo impacto por alteracao',
    justificativa: 'Corrigir funcoes utilitarias compartilhadas (ValidaCpfCnpj, somenteNumeros, formatarDocumento) que propagam para dezenas de arquivos downstream. Uma alteracao na raiz resolve multiplos pontos automaticamente.',
  },
  {
    numero: '1',
    nome: 'ULTRON Top 30',
    pontos: '~2.000',
    descricao: 'Sistemas criticos de negocio',
    justificativa: '55,3% do backlog, maior exposicao de negocio (emissao, sinistro, financeiro). Priorizar os 30 repositorios com maior concentracao de risco ALTO.',
  },
  {
    numero: '2',
    nome: 'SEGBR',
    pontos: 1_742,
    descricao: 'Legado VB6/ASP',
    justificativa: 'Alta concentracao por repositorio (348 pts/repo). Requer ambiente de desenvolvimento VB6 especializado e atencao a tipos de dados legados.',
  },
  {
    numero: '3',
    nome: 'SIMULADORES',
    pontos: 1_304,
    descricao: 'Apps full-stack independentes',
    justificativa: '4 aplicacoes independentes (Agricola, Floresta, Patrimonio, Vida). Menor risco de impacto cruzado entre sistemas.',
  },
  {
    numero: 'SQL',
    nome: '97 Migracoes',
    pontos: 97,
    descricao: 'Paralela com DBA',
    justificativa: 'Execucao independente do codigo. 86 tabelas, 70 colunas numericas. Coordenar com equipe de DBA para janelas de manutencao.',
  },
];
