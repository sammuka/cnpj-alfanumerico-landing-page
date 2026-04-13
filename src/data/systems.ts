export interface SystemData {
  id: string;
  nome: string;
  cor: string;
  linhasCodigo: number;
  repositoriosTotal: number;
  percentualLoc: number;
  tecnologias: string[];
  detalhes: string[];
}

export const SYSTEMS: SystemData[] = [
  {
    id: 'ultron',
    nome: 'ULTRON',
    cor: '#3b82f6',
    linhasCodigo: 31_013_674,
    repositoriosTotal: 1_077,
    percentualLoc: 80.5,
    tecnologias: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
    detalhes: [
      '1.046 aplicacoes (lambdas, backends, frontends, EMR, batch)',
      '31 repositorios SQL',
      '~150 lambdas AWS',
    ],
  },
  {
    id: 'segbr',
    nome: 'SEGBR',
    cor: '#f59e0b',
    linhasCodigo: 7_034_563,
    repositoriosTotal: 5,
    percentualLoc: 18.3,
    tecnologias: ['VB6', 'ASP', 'SQL Server'],
    detalhes: [
      '45.223 objetos (executaveis, DLLs, modulos)',
      '9.780 arquivos fonte',
    ],
  },
  {
    id: 'simuladores',
    nome: 'SIMULADORES',
    cor: '#10b981',
    linhasCodigo: 500_731,
    repositoriosTotal: 4,
    percentualLoc: 1.3,
    tecnologias: ['Java/Spring Boot', 'React/Node.js'],
    detalhes: [
      'Agricola (backend + frontend)',
      'Floresta (backend + frontend)',
      'Patrimonio (backend + frontend)',
      'Vida (backend + frontend)',
    ],
  },
];
