import doc01 from './01-CONTEXTO-E-PROBLEMA.md?raw';
import doc02 from './02-ESTRATEGIA-E-ROADMAP.md?raw';
import doc03 from './03-FERRAMENTAS-F00-F12.md?raw';
import doc04 from './04-FERRAMENTAS-F13-F22.md?raw';
import doc05 from './05-FERRAMENTAS-F23-F32.md?raw';
import doc06 from './06-RODADAS-DE-EXECUCAO.md?raw';
import doc07 from './07-REVISAO-AGENTICA-F30.md?raw';
import doc08 from './08-RESULTADOS-E-METRICAS.md?raw';
import doc09 from './09-CATALOGO-SQL.md?raw';
import doc10 from './10-CONCLUSAO-E-RECOMENDACOES.md?raw';
import glossario from './GLOSSARIO.md?raw';

export interface DocEntry {
  key: string;
  titulo: string;
  descricao: string;
  conteudo: string;
  icone: string;
}

export const DOCS: DocEntry[] = [
  { key: '01', titulo: 'Contexto e Problema', descricao: 'O regulamento, as 6 categorias de falha, o escopo do desafio', conteudo: doc01, icone: 'AlertTriangle' },
  { key: '02', titulo: 'Estrategia e Roadmap', descricao: 'Abordagem em fases, pipeline F(x), criterios de decisao', conteudo: doc02, icone: 'Map' },
  { key: '03', titulo: 'Ferramentas F00-F12', descricao: 'Discovery, deteccao estrutural, SAST, backlog prioritizado', conteudo: doc03, icone: 'Wrench' },
  { key: '04', titulo: 'Ferramentas F13-F22', descricao: 'GAP analysis: formato, utils, semantica, schema, UI', conteudo: doc04, icone: 'Search' },
  { key: '05', titulo: 'Ferramentas F23-F32', descricao: 'Complement, multi-line, SQL model, Semgrep, refinamento', conteudo: doc05, icone: 'Layers' },
  { key: '06', titulo: 'Rodadas de Execucao', descricao: 'Cronologia dia a dia: 18 a 27 de marco de 2026', conteudo: doc06, icone: 'Calendar' },
  { key: '07', titulo: 'Revisao Agentica F30', descricao: '1.561 batches, taxonomia CONFIRMA/DOWNSTREAM/FP', conteudo: doc07, icone: 'Brain' },
  { key: '08', titulo: 'Resultados e Metricas', descricao: 'Funil 70K→6.8K, distribuicao por sistema e risco', conteudo: doc08, icone: 'BarChart3' },
  { key: '09', titulo: 'Catalogo SQL', descricao: '97 migracoes, 86 tabelas, tipos numericos por coluna', conteudo: doc09, icone: 'Database' },
  { key: '10', titulo: 'Conclusao e Recomendacoes', descricao: '5 waves, licoes aprendidas, proximos passos', conteudo: doc10, icone: 'CheckCircle' },
  { key: 'glossario', titulo: 'Glossario', descricao: 'Definicoes de todos os termos e classificacoes', conteudo: glossario, icone: 'BookOpen' },
];
