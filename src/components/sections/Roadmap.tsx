import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/layout/Section';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { WAVES } from '@/data/waves';

export default function Roadmap() {
  const [active, setActive] = useState(0);
  const wave = WAVES[active];

  return (
    <Section id="roadmap">
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Roadmap de Implementacao: 5 Waves
        </h2>
      </ScrollReveal>

      {/* Stepper */}
      <ScrollReveal delay={0.15}>
        <div className="flex flex-col lg:flex-row relative mt-12 mb-10 gap-6 lg:gap-0 lg:justify-between">
          {/* Connecting line – desktop (horizontal) */}
          <motion.div
            className="hidden lg:block absolute top-5 left-0 right-0 h-0.5 origin-left"
            style={{
              background: 'linear-gradient(to right, #7c3aed, #3b82f6, #06b6d4)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />

          {/* Connecting line – mobile (vertical) */}
          <motion.div
            className="lg:hidden absolute left-5 top-0 bottom-0 w-0.5 origin-top"
            style={{
              background: 'linear-gradient(to bottom, #7c3aed, #3b82f6, #06b6d4)',
            }}
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
              {/* Step circle */}
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors duration-300 ${
                  i === active
                    ? 'bg-gradient-to-br from-accent-violet to-accent-blue text-white ring-4 ring-accent-violet/30'
                    : 'surf-6 text-text-secondary'
                }`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {w.numero}
              </motion.div>

              {/* Label */}
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
          <GlassCard className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Points highlight */}
              <div className="flex flex-col items-center md:items-start shrink-0">
                <span className="font-mono text-3xl font-bold text-accent-violet">
                  {wave.pontos}
                </span>
                <span className="text-xs text-text-secondary mt-1">
                  pontos de alteracao
                </span>
              </div>

              {/* Text content */}
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                  Wave {wave.numero}: {wave.nome}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {wave.descricao}
                </p>
                <p className="text-sm text-text-secondary/80 leading-relaxed">
                  {wave.justificativa}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
