export interface FunnelStage {
  label: string;
  valor: number;
  operacao: string;
  cor: string;
  larguraRelativa: number;
}

export const FUNNEL_STAGES: FunnelStage[] = [
  { label: 'Achados brutos', valor: 70_729, operacao: '', cor: '#64748b', larguraRelativa: 100 },
  { label: 'Unicos (dedup)', valor: 14_425, operacao: '-954 dedup', cor: '#3b82f6', larguraRelativa: 60 },
  { label: 'Revisados (+GEXT)', valor: 15_008, operacao: '+583 GEXT', cor: '#60a5fa', larguraRelativa: 63 },
  { label: 'CA / DA / FP (F30)', valor: 15_325, operacao: 'F30 split', cor: '#22c55e', larguraRelativa: 55 },
  { label: 'Pos-F31', valor: 6_503, operacao: '-110 FPs', cor: '#16a34a', larguraRelativa: 30 },
  { label: 'Backlog final', valor: 6_820, operacao: '+317 TPs', cor: '#22c55e', larguraRelativa: 32 },
];
