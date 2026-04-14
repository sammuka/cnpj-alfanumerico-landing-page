import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { DECISIONS } from '@/data/decisions';

function formatNumber(n: number): string {
  return n.toLocaleString('pt-BR');
}

/* Generate small circles arranged in 3 concentric arcs around the center */
function generateArcPoints(): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const arcs = [
    { radius: 120, count: 16 },
    { radius: 180, count: 16 },
    { radius: 240, count: 15 },
  ];

  for (const arc of arcs) {
    for (let i = 0; i < arc.count; i++) {
      const angle = (2 * Math.PI * i) / arc.count;
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
  return (
    <Section id="decisions" alt={true}>
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Taxonomia de 15.325 classificacoes assistidas por IA
        </h2>
      </ScrollReveal>

      {/* Decision cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {DECISIONS.map((decision, i) => (
          <ScrollReveal key={decision.nome} delay={i * 0.1}>
            <GlassCard className="h-full" hoverColor={decision.cor}>
              <div style={{ borderTop: `3px solid ${decision.cor}` }} className="pt-4">
                <h3 className="font-semibold text-text-primary mb-2">
                  {decision.nomeExibicao}
                </h3>
                <p
                  className="font-mono text-3xl font-bold mb-2"
                  style={{ color: decision.cor }}
                >
                  {formatNumber(decision.valor)}
                </p>
                <p className="text-text-secondary text-sm mb-4">
                  {decision.descricao}
                </p>
                <ProgressBar
                  value={decision.percentual}
                  color={decision.cor}
                  delay={i * 0.15}
                />
                <p className="text-text-secondary text-xs mt-1">
                  {decision.percentual}%
                </p>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      {/* Cascade diagram */}
      <ScrollReveal delay={0.3}>
        <div className="mt-16">
          <svg viewBox="-300 -300 600 600" className="w-full max-w-2xl mx-auto h-auto">
            <defs>
              <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" />
              </radialGradient>
            </defs>

            {/* Lines from center to each small circle */}
            {arcPoints.map((pt, i) => (
              <motion.line
                key={`line-${i}`}
                x1={0}
                y1={0}
                x2={pt.x}
                y2={pt.y}
                stroke="#3b82f6"
                strokeWidth={0.8}
                strokeOpacity={0.35}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.03 }}
              />
            ))}

            {/* Small circles at arc positions */}
            {arcPoints.map((pt, i) => (
              <motion.circle
                key={`dot-${i}`}
                cx={pt.x}
                cy={pt.y}
                r={12}
                fill="#3b82f6"
                fillOpacity={0.5}
                stroke="#60a5fa"
                strokeWidth={1}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 + 0.3 }}
              />
            ))}

            {/* Central circle */}
            <circle cx={0} cy={0} r={60} fill="url(#centerGrad)" />
            <text
              x={0}
              y={-4}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={10}
              fontWeight={700}
            >
              ValidaCpf
            </text>
            <text
              x={0}
              y={10}
              textAnchor="middle"
              fill="#ffffff"
              fontSize={10}
              fontWeight={700}
            >
              Cnpj
            </text>
          </svg>
          <p className="text-center text-text-secondary mt-4 text-sm">
            1 raiz &rarr; 47 arquivos downstream absorvidos
          </p>
        </div>
      </ScrollReveal>
    </Section>
  );
}
