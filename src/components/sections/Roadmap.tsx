import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/layout/Section';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { WAVES } from '@/data/waves';

const RISK_COLOR: Record<string, string> = {
  CRITICO: '#ef4444',
  ALTO:    '#f59e0b',
  MEDIO:   '#22c55e',
};

const COL_LABEL = 'text-xs text-text-muted uppercase tracking-widest mb-3 font-semibold';

export default function Roadmap() {
  const [active, setActive] = useState(0);
  const wave = WAVES[active];
  const riskColor = RISK_COLOR[wave.risco];

  return (
    <Section id="roadmap">
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">
          Roadmap de Implementacao: 5 Waves
        </h2>
        <p className="text-center text-text-secondary max-w-2xl mx-auto">
          Sequencia de implementacao ordenada por impacto, dependencia tecnica e risco. Clique em cada wave para ver o detalhamento completo.
        </p>
      </ScrollReveal>

      {/* Stepper */}
      <ScrollReveal delay={0.15}>
        <div className="flex flex-col lg:flex-row relative mt-12 mb-10 gap-6 lg:gap-0 lg:justify-between">
          {/* Connecting line – desktop */}
          <motion.div
            className="hidden lg:block absolute top-5 left-0 right-0 h-0.5 origin-left"
            style={{ background: 'linear-gradient(to right, #7c3aed, #3b82f6, #06b6d4)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          {/* Connecting line – mobile */}
          <motion.div
            className="lg:hidden absolute left-5 top-0 bottom-0 w-0.5 origin-top"
            style={{ background: 'linear-gradient(to bottom, #7c3aed, #3b82f6, #06b6d4)' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />

          {WAVES.map((w, i) => (
            <div
              key={w.numero}
              className="relative z-10 flex items-center gap-3 lg:flex-col lg:items-center lg:flex-1 cursor-pointer"
              onClick={() => setActive(i)}
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors duration-300 ${
                  i === active
                    ? 'text-white ring-4 ring-offset-0'
                    : 'surf-6 text-text-secondary'
                }`}
                style={
                  i === active
                    ? { backgroundColor: w.cor, boxShadow: `0 0 16px ${w.cor}55` }
                    : {}
                }
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {w.numero}
              </motion.div>
              <span className="text-xs text-text-secondary lg:mt-2 lg:text-center whitespace-nowrap">
                {w.nome}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Details panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={wave.numero}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <GlassCard className="w-full" hoverColor={wave.cor}>
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6 pb-6 border-b edge-6">
              {/* Left: pontos + progress */}
              <div className="shrink-0 min-w-[160px]">
                <span
                  className="font-mono text-5xl font-extrabold block"
                  style={{ color: wave.cor }}
                >
                  {typeof wave.pontos === 'number'
                    ? wave.pontos.toLocaleString('pt-BR')
                    : wave.pontos}
                </span>
                <span className="text-xs text-text-muted mt-1 block">pontos de alteracao</span>
                <div className="mt-3 w-48">
                  <ProgressBar value={wave.percentualBacklog} color={wave.cor} />
                  <span className="text-xs text-text-muted mt-1 block">
                    {wave.percentualBacklog}% do backlog total
                  </span>
                </div>
              </div>

              {/* Center: title + descricao */}
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold text-text-primary mb-1">
                  Wave {wave.numero}: {wave.nome}
                </h3>
                <p className="text-text-secondary text-sm mb-4">{wave.descricao}</p>
              </div>

              {/* Right: badges */}
              <div className="flex flex-wrap gap-2 shrink-0">
                <Badge color={riskColor}>{wave.risco}</Badge>
                <Badge color="#475569">{wave.duracao}</Badge>
              </div>
            </div>

            {/* ── Body: 3 columns ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Col 1 — Estrategia */}
              <div>
                <p className={COL_LABEL}>Estrategia</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {wave.justificativa}
                </p>
              </div>

              {/* Col 2 — Repositorios destaque */}
              <div>
                <p className={COL_LABEL}>Repositorios Destaque</p>
                <ul className="space-y-2">
                  {wave.repositoriosDestaque.map((repo) => (
                    <li key={repo} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: wave.cor }} />
                      <span className="font-mono text-xs leading-relaxed">{repo}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3 — Equipe + Tecnologias + Criterio + Dependencias */}
              <div className="space-y-5">
                <div>
                  <p className={COL_LABEL}>Equipe</p>
                  <div className="flex flex-wrap gap-2">
                    {wave.equipe.map((e) => (
                      <Badge key={e} color={wave.cor}>{e}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className={COL_LABEL}>Tecnologias</p>
                  <div className="flex flex-wrap gap-2">
                    {wave.tecnologias.map((t) => (
                      <Badge key={t} color="#475569">{t}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className={COL_LABEL}>Criterio de Conclusao</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {wave.criterioConclusao}
                  </p>
                </div>

                <div>
                  <p className={COL_LABEL}>Dependencias</p>
                  {wave.dependencias.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {wave.dependencias.map((d) => (
                        <Badge key={d} color="#7c3aed">{d}</Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-text-muted italic">
                      Nenhuma — ponto de partida obrigatorio
                    </span>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
