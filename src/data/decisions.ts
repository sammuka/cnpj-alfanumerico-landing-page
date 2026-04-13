export interface Decision {
  nome: string;
  nomeExibicao: string;
  valor: number;
  percentual: number;
  cor: string;
  descricao: string;
}

export const DECISIONS: Decision[] = [
  {
    nome: 'CONFIRMA_ALTERAR',
    nomeExibicao: 'Confirma Alterar',
    valor: 6_819,
    percentual: 44.5,
    cor: '#22c55e',
    descricao: 'Raiz do problema — esta linha precisa mudar',
  },
  {
    nome: 'DOWNSTREAM_ABSORVIDO',
    nomeExibicao: 'Downstream Absorvido',
    valor: 7_413,
    percentual: 48.4,
    cor: '#eab308',
    descricao: 'Resolvido quando a raiz for corrigida',
  },
  {
    nome: 'FALSO_POSITIVO',
    nomeExibicao: 'Falso Positivo',
    valor: 1_092,
    percentual: 7.1,
    cor: '#ef4444',
    descricao: 'Nao e CNPJ — removido do backlog',
  },
  {
    nome: 'INCONCLUSIVO',
    nomeExibicao: 'Inconclusivo',
    valor: 1,
    percentual: 0.01,
    cor: '#64748b',
    descricao: 'Contexto insuficiente — revisao manual',
  },
];
