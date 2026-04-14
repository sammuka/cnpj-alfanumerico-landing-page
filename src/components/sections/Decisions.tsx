import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X } from 'lucide-react';
import Section from '@/components/layout/Section';
import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { DECISIONS } from '@/data/decisions';

function formatNumber(n: number): string {
  return n.toLocaleString('pt-BR');
}

type Sistema = 'ULTRON' | 'SEGBR' | 'SIMULADORES';

interface DownstreamFile {
  file: string;
  sistema: Sistema;
  tipo: string;
  descricao: string;
  acao: string;
}

const DOWNSTREAM: DownstreamFile[] = [
  // ULTRON — Java / Spring Boot (27 arquivos)
  { file: 'PropostaController.java',        sistema: 'ULTRON', tipo: 'REST Controller', descricao: 'Endpoint de criacao de proposta — valida CNPJ do tomador na entrada da requisicao.', acao: 'Ampliar campo nr_cnpj para VARCHAR(14) e atualizar regex de validacao.' },
  { file: 'EmissaoController.java',         sistema: 'ULTRON', tipo: 'REST Controller', descricao: 'Endpoint de emissao de apolice — valida CNPJ antes de confirmar emissao.', acao: 'Atualizar DTO e anotacoes @Valid para aceitar formato alfanumerico.' },
  { file: 'ClienteController.java',         sistema: 'ULTRON', tipo: 'REST Controller', descricao: 'Endpoint de cadastro de cliente PJ — CNPJ como campo obrigatorio de identificacao.', acao: 'Ajustar DTO e handler de erros de validacao.' },
  { file: 'SinistroController.java',        sistema: 'ULTRON', tipo: 'REST Controller', descricao: 'Endpoint de abertura de sinistro — identifica segurado por CNPJ.', acao: 'Atualizar busca de segurado por CNPJ alfanumerico.' },
  { file: 'RegulacaoController.java',       sistema: 'ULTRON', tipo: 'REST Controller', descricao: 'Gestao de regulacao de sinistro — referencia CNPJ do regulador externo.', acao: 'Ampliar campo e validacao de CNPJ do regulador.' },
  { file: 'EndossoController.java',         sistema: 'ULTRON', tipo: 'REST Controller', descricao: 'Endpoint de endosso — valida CNPJ em cada alteracao contratual.', acao: 'Atualizar validacao de CNPJ no fluxo de endosso.' },
  { file: 'PortalCorretorController.java',  sistema: 'ULTRON', tipo: 'REST Controller', descricao: 'Portal do corretor — autentica corretora via CNPJ.', acao: 'Ampliar campo CNPJ da corretora para 14 chars.' },
  { file: 'PropostaService.java',           sistema: 'ULTRON', tipo: 'Service', descricao: 'Orquestrador de proposta — chama ValidaCpfCnpj para verificar tomador.', acao: 'Atualizar chamada ao metodo de validacao CNPJ.' },
  { file: 'EmissaoService.java',            sistema: 'ULTRON', tipo: 'Service', descricao: 'Regras de emissao de apolice — usa ValidaCpfCnpj como pre-condicao.', acao: 'Adaptar logica de emissao para CNPJ de 14 chars.' },
  { file: 'SinistroService.java',           sistema: 'ULTRON', tipo: 'Service', descricao: 'Gestao de sinistro — busca apolice por CNPJ do segurado.', acao: 'Atualizar query de busca por CNPJ alfanumerico.' },
  { file: 'EndossoService.java',            sistema: 'ULTRON', tipo: 'Service', descricao: 'Alteracoes contratuais — valida CNPJ em cada operacao de endosso.', acao: 'Atualizar validacao e persistencia do CNPJ.' },
  { file: 'ParametrizacaoService.java',     sistema: 'ULTRON', tipo: 'Service', descricao: 'Parametros de produto — armazena CNPJ de parceiros e distribuidores.', acao: 'Ampliar campo CNPJ do parceiro para 14 chars.' },
  { file: 'RenovacaoService.java',          sistema: 'ULTRON', tipo: 'Service', descricao: 'Renovacao automatica — re-valida CNPJ do tomador no ciclo de renovacao.', acao: 'Atualizar validacao no fluxo de renovacao automatica.' },
  { file: 'CancelamentoService.java',       sistema: 'ULTRON', tipo: 'Service', descricao: 'Cancelamento de apolice — registra CNPJ do solicitante no log.', acao: 'Ampliar campo CNPJ no registro de cancelamento.' },
  { file: 'CobrancaService.java',           sistema: 'ULTRON', tipo: 'Service', descricao: 'Gestao de cobranca — vincula boleto ao CNPJ do tomador.', acao: 'Atualizar campo CNPJ em todos os registros de cobranca.' },
  { file: 'BeneficiarioService.java',       sistema: 'ULTRON', tipo: 'Service', descricao: 'Cadastro de beneficiarios PJ — valida CNPJ do beneficiario.', acao: 'Ampliar validacao e armazenamento do CNPJ do beneficiario.' },
  { file: 'DocumentoService.java',          sistema: 'ULTRON', tipo: 'Service', descricao: 'Geracao de documentos — imprime CNPJ do segurado em apolices e certificados.', acao: 'Ajustar formatacao do CNPJ nos templates de documento.' },
  { file: 'ContratacaoService.java',        sistema: 'ULTRON', tipo: 'Service', descricao: 'Fluxo de contratacao — orquestra validacao de CNPJ em toda a jornada.', acao: 'Revisar todas as chamadas ao ValidaCpfCnpj no fluxo.' },
  { file: 'ApoliceService.java',            sistema: 'ULTRON', tipo: 'Service', descricao: 'Gestao de apolice — armazena e consulta CNPJ do contratante.', acao: 'Ampliar campo nr_cnpj no dominio de Apolice.' },
  { file: 'PremioCalculoService.java',      sistema: 'ULTRON', tipo: 'Service', descricao: 'Calculo de premio — usa CNPJ para buscar historico de risco do cliente.', acao: 'Atualizar consulta por CNPJ alfanumerico no historico.' },
  { file: 'AutorizacaoService.java',        sistema: 'ULTRON', tipo: 'Service', descricao: 'Autorizacao de operacoes especiais — verifica CNPJ em regras de permissao.', acao: 'Atualizar comparacao de CNPJ na regra de autorizacao.' },
  { file: 'PessoaJuridicaValidator.java',   sistema: 'ULTRON', tipo: 'Validator', descricao: 'Validador de PJ — delega ao ValidaCpfCnpj e adiciona regras de negocio Brasilseg.', acao: 'Atualizar logica para novo formato alfanumerico.' },
  { file: 'PropostaValidator.java',         sistema: 'ULTRON', tipo: 'Validator', descricao: 'Validador de proposta — aplica ValidaCpfCnpj no tomador e no corretor.', acao: 'Ajustar anotacoes @Valid e mensagens de erro.' },
  { file: 'EmissaoValidator.java',          sistema: 'ULTRON', tipo: 'Validator', descricao: 'Validador de emissao — pre-condicao CNPJ valido para emitir apolice.', acao: 'Atualizar regex e mensagem de erro de validacao.' },
  { file: 'CadastroClienteValidator.java',  sistema: 'ULTRON', tipo: 'Validator', descricao: 'Validador de cadastro — valida CNPJ no onboarding de novo cliente PJ.', acao: 'Ampliar validacao para formato alfanumerico de 14 chars.' },
  { file: 'CnpjFormatFilter.java',          sistema: 'ULTRON', tipo: 'Filter', descricao: 'Filtro de entrada — normaliza CNPJ (remove mascaras) antes do controller.', acao: 'Ajustar regex de normalizacao para aceitar letras A-Z.' },
  { file: 'ClienteRepository.java',         sistema: 'ULTRON', tipo: 'Repository', descricao: 'Persistencia de cliente — query por CNPJ como chave primaria de busca.', acao: 'Alterar tipo da coluna nr_cnpj para VARCHAR(14) no schema.' },
  // SEGBR — VB6 / ASP (12 arquivos)
  { file: 'frmCadastroPJ.frm',      sistema: 'SEGBR', tipo: 'Form VB6', descricao: 'Tela de cadastro de PJ — campo CNPJ com mascara numerica e validacao local.', acao: 'Ampliar campo para 14 chars e ajustar mascara alfanumerica.' },
  { file: 'frmEmissao.frm',         sistema: 'SEGBR', tipo: 'Form VB6', descricao: 'Tela de emissao de apolice — chama modValidacoes.ValidaCpfCnpj antes de salvar.', acao: 'Atualizar chamada ao modulo de validacao.' },
  { file: 'frmSinistro.frm',        sistema: 'SEGBR', tipo: 'Form VB6', descricao: 'Tela de sinistro — identifica segurado por CNPJ digitado manualmente.', acao: 'Ampliar campo CNPJ e ajustar logica de validacao.' },
  { file: 'frmContrato.frm',        sistema: 'SEGBR', tipo: 'Form VB6', descricao: 'Tela de contrato — exibe CNPJ do contratante na capa da apolice.', acao: 'Ampliar exibicao e campo de busca para 14 chars.' },
  { file: 'frmCliente.frm',         sistema: 'SEGBR', tipo: 'Form VB6', descricao: 'Tela de gestao de cliente — CNPJ como campo chave de busca e edicao.', acao: 'Ampliar campo e atualizar query de busca no banco.' },
  { file: 'frmEndosso.frm',         sistema: 'SEGBR', tipo: 'Form VB6', descricao: 'Tela de endosso — valida CNPJ antes de gravar alteracoes contratuais.', acao: 'Atualizar validacao local de CNPJ no form de endosso.' },
  { file: 'frmBeneficiario.frm',    sistema: 'SEGBR', tipo: 'Form VB6', descricao: 'Tela de beneficiario PJ — campo CNPJ obrigatorio para PJ.', acao: 'Ampliar campo e mascara de CNPJ do beneficiario.' },
  { file: 'modValidacoes.bas',      sistema: 'SEGBR', tipo: 'Module VB6', descricao: 'Modulo central de validacoes — contem a funcao ValidaCpfCnpj em VB6 usada por todos os forms.', acao: 'Atualizar algoritmo para validar formato alfanumerico.' },
  { file: 'clsPropostaEmissao.cls', sistema: 'SEGBR', tipo: 'Class VB6', descricao: 'Classe de proposta/emissao — delega ao modValidacoes para validar CNPJ.', acao: 'Revisar todas as chamadas ao ValidaCpfCnpj na classe.' },
  { file: 'clsDocumento.cls',       sistema: 'SEGBR', tipo: 'Class VB6', descricao: 'Classe de documento — formata e imprime CNPJ nos templates de apolice.', acao: 'Ajustar formatacao para suportar 14 caracteres.' },
  { file: 'Cadastro.asp',           sistema: 'SEGBR', tipo: 'ASP Page', descricao: 'Pagina web de cadastro de PJ — valida CNPJ via JavaScript e validacao server-side ASP.', acao: 'Atualizar validacao client-side e server-side para novo formato.' },
  { file: 'EmissaoOnline.asp',      sistema: 'SEGBR', tipo: 'ASP Page', descricao: 'Pagina web de emissao online — submete CNPJ ao servidor para validar e emitir.', acao: 'Ampliar campo input e atualizar validacao no servidor.' },
  // SIMULADORES — React / TypeScript (8 arquivos)
  { file: 'SimuladorContratacao.tsx', sistema: 'SIMULADORES', tipo: 'React Component', descricao: 'Simulador completo de contratacao — formulario com campo CNPJ como ponto de entrada.', acao: 'Atualizar hook de validacao e campo de entrada.' },
  { file: 'FormularioPJ.tsx',         sistema: 'SIMULADORES', tipo: 'React Component', descricao: 'Formulario de pessoa juridica — campo CNPJ com validacao em tempo real.', acao: 'Ampliar campo e atualizar regex de validacao.' },
  { file: 'CnpjInput.tsx',            sistema: 'SIMULADORES', tipo: 'React Component', descricao: 'Componente de input CNPJ — mascara e validacao encapsuladas e reutilizaveis.', acao: 'Ampliar mascara para aceitar 14 chars alfanumericos.' },
  { file: 'PropostaForm.tsx',          sistema: 'SIMULADORES', tipo: 'React Component', descricao: 'Formulario de proposta — usa CnpjInput e chama validacaoApiService.', acao: 'Atualizar chamada ao servico de validacao.' },
  { file: 'useValidacaoCnpj.ts',       sistema: 'SIMULADORES', tipo: 'React Hook', descricao: 'Hook customizado de validacao de CNPJ — logica reativa para feedback imediato.', acao: 'Atualizar algoritmo no hook para formato alfanumerico.' },
  { file: 'validacaoApiService.ts',    sistema: 'SIMULADORES', tipo: 'Service TS', descricao: 'Servico de chamadas de validacao — consulta API de ValidaCpfCnpj no backend.', acao: 'Atualizar endpoint e payload para CNPJ de 14 chars.' },
  { file: 'FormularioEmpresa.tsx',     sistema: 'SIMULADORES', tipo: 'React Component', descricao: 'Formulario de dados da empresa — CNPJ como campo primario de identificacao.', acao: 'Ampliar campo CNPJ e validacao visual em tempo real.' },
  { file: 'CalculadoraPremio.tsx',     sistema: 'SIMULADORES', tipo: 'React Component', descricao: 'Calculadora de premio — identifica empresa por CNPJ para buscar plano e historico.', acao: 'Atualizar busca por CNPJ alfanumerico na API de calculo.' },
];

const SYS: Record<Sistema, { fill: string; stroke: string; textColor: string; label: string }> = {
  ULTRON:      { fill: '#3b82f6', stroke: '#93c5fd', textColor: '#60a5fa', label: 'ULTRON' },
  SEGBR:       { fill: '#f59e0b', stroke: '#fcd34d', textColor: '#fbbf24', label: 'SEGBR' },
  SIMULADORES: { fill: '#10b981', stroke: '#6ee7b7', textColor: '#34d399', label: 'SIMULADORES' },
};

function generateArcPoints(): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const arcs = [
    { radius: 120, count: 16 },
    { radius: 180, count: 16 },
    { radius: 240, count: 15 },
  ];
  for (const arc of arcs) {
    for (let i = 0; i < arc.count; i++) {
      const angle = (2 * Math.PI * i) / arc.count - Math.PI / 2;
      points.push({
        x: Math.cos(angle) * arc.radius,
        y: Math.sin(angle) * arc.radius,
      });
    }
  }
  return points;
}

const arcPoints = generateArcPoints();

export default function Decisions() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 });
  const rotateY = useTransform(springX, [-1, 1], [-7, 7]);
  const rotateX = useTransform(springY, [-1, 1], [7, -7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = diagramRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1);
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1);
  };

  const handleDiagramLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHovered(null);
  };

  const handleCircleEnter = (i: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHovered(i);
  };

  const handleCircleLeave = () => {
    hoverTimer.current = setTimeout(() => setHovered(null), 80);
  };

  const handleCircleClick = (i: number) => {
    setSelected(selected === i ? null : i);
  };

  // Tooltip position in SVG coords
  const getTooltip = (pt: { x: number; y: number }, filename: string) => {
    const w = Math.min(filename.length * 6.2 + 20, 200);
    const h = 26;
    const x = pt.x > 40 ? pt.x - w - 14 : pt.x + 14;
    const y = pt.y - h / 2;
    return { x: Math.max(-315, Math.min(315 - w, x)), y: Math.max(-315, Math.min(310, y)), w, h };
  };

  const sel = selected !== null ? DOWNSTREAM[selected] : null;

  return (
    <Section id="decisions" alt={true}>
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Taxonomia de 15.325 classificacoes assistidas por IA
        </h2>
      </ScrollReveal>

      {/* Decision cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {DECISIONS.map((decision, i) => (
          <ScrollReveal key={decision.nome} delay={i * 0.1}>
            <GlassCard className="h-full" hoverColor={decision.cor}>
              <div style={{ borderTop: `3px solid ${decision.cor}` }} className="pt-4">
                <h3 className="font-semibold text-text-primary mb-2">{decision.nomeExibicao}</h3>
                <p className="font-mono text-3xl font-bold mb-2" style={{ color: decision.cor }}>
                  {formatNumber(decision.valor)}
                </p>
                <p className="text-text-secondary text-sm mb-4">{decision.descricao}</p>
                <ProgressBar value={decision.percentual} color={decision.cor} delay={i * 0.15} />
                <p className="text-text-secondary text-xs mt-1">{decision.percentual}%</p>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      {/* Cascade diagram */}
      <ScrollReveal delay={0.3}>
        <div className="mt-16">
          {/* 3D tilt container */}
          <div
            ref={diagramRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleDiagramLeave}
            style={{ perspective: '900px' }}
            className="select-none"
          >
            <motion.div style={{ rotateX, rotateY }}>
              <svg
                viewBox="-320 -320 640 640"
                className="w-full max-w-2xl mx-auto h-auto"
              >
                <defs>
                  <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Lines */}
                {arcPoints.map((pt, i) => (
                  <motion.line
                    key={`line-${i}`}
                    x1={0} y1={0} x2={pt.x} y2={pt.y}
                    stroke={hovered === i ? SYS[DOWNSTREAM[i].sistema].fill : '#3b82f6'}
                    strokeWidth={hovered === i ? 1.5 : 0.7}
                    strokeOpacity={hovered === i ? 0.7 : 0.25}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.025 }}
                    style={{ transition: 'stroke 0.2s, stroke-opacity 0.2s, stroke-width 0.2s' }}
                  />
                ))}

                {/* Satellite circles */}
                {arcPoints.map((pt, i) => {
                  const sys = SYS[DOWNSTREAM[i].sistema];
                  const isHovered = hovered === i;
                  const isSelected = selected === i;
                  return (
                    <motion.circle
                      key={`dot-${i}`}
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered || isSelected ? 15 : 11}
                      fill={sys.fill}
                      fillOpacity={isHovered || isSelected ? 0.85 : 0.5}
                      stroke={sys.stroke}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                      style={{ cursor: 'pointer', transition: 'r 0.15s, fill-opacity 0.15s' }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.025 + 0.3 }}
                      onMouseEnter={() => handleCircleEnter(i)}
                      onMouseLeave={handleCircleLeave}
                      onClick={() => handleCircleClick(i)}
                    />
                  );
                })}

                {/* Central node */}
                <circle cx={0} cy={0} r={58} fill="url(#centerGrad)" filter="url(#glow)" />
                <circle cx={0} cy={0} r={58} fill="none" stroke="#818cf8" strokeWidth={1.5} strokeOpacity={0.4} />
                <text x={0} y={-7} textAnchor="middle" fill="#ffffff" fontSize={10} fontWeight={700} fontFamily="Inter, sans-serif">
                  ValidaCpf
                </text>
                <text x={0} y={8} textAnchor="middle" fill="#ffffff" fontSize={10} fontWeight={700} fontFamily="Inter, sans-serif">
                  Cnpj
                </text>
                <text x={0} y={22} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize={7.5} fontFamily="Inter, sans-serif">
                  raiz
                </text>

                {/* Tooltip on hover */}
                {hovered !== null && (() => {
                  const pt = arcPoints[hovered];
                  const { x, y, w, h } = getTooltip(pt, DOWNSTREAM[hovered].file);
                  return (
                    <g pointerEvents="none">
                      <rect x={x} y={y} width={w} height={h} rx={5} fill="rgba(10,10,28,0.92)" />
                      <text
                        x={x + 10} y={y + h / 2 + 4}
                        fill="#f1f5f9"
                        fontSize={9}
                        fontFamily="'JetBrains Mono', monospace"
                      >
                        {DOWNSTREAM[hovered].file}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </motion.div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-5 mt-4">
            {(Object.keys(SYS) as Sistema[]).map((s) => (
              <div key={s} className="flex items-center gap-1.5 text-xs text-text-secondary">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: SYS[s].fill, opacity: 0.75 }}
                />
                <span>{SYS[s].label}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-text-secondary mt-2 text-sm">
            1 raiz &rarr; 47 arquivos downstream absorvidos &mdash; passe o mouse ou clique para explorar
          </p>

          {/* Selected file detail */}
          <AnimatePresence>
            {sel !== null && selected !== null && (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mt-6 max-w-2xl mx-auto"
              >
                <div className="glass rounded-2xl border edge-6 p-5 relative">
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 p-1 rounded-lg hover:surf-6 text-text-muted hover:text-text-primary transition-colors"
                    aria-label="Fechar"
                  >
                    <X size={16} />
                  </button>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="font-mono text-sm font-bold px-3 py-1 rounded-lg"
                      style={{
                        backgroundColor: SYS[sel.sistema].fill + '22',
                        color: SYS[sel.sistema].textColor,
                        border: `1px solid ${SYS[sel.sistema].fill}44`,
                      }}
                    >
                      {sel.file}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: SYS[sel.sistema].fill + '15',
                        color: SYS[sel.sistema].textColor,
                      }}
                    >
                      {sel.sistema}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full surf-4 text-text-secondary">
                      {sel.tipo}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {sel.descricao}
                  </p>

                  <div className="flex items-start gap-2 surf-4 rounded-lg p-3">
                    <span className="text-xs font-semibold text-text-muted shrink-0 mt-0.5">ACAO:</span>
                    <p className="text-xs text-text-secondary leading-relaxed">{sel.acao}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </Section>
  );
}
