import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import Section from '@/components/layout/Section';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { PHASES } from '@/data/pipeline-phases';
import { TOOLS } from '@/data/tools';

export default function Pipeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Section id="pipeline" alt={true}>
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-16 text-center">
          Pipeline F(x): <span className="text-accent-cyan">33 Ferramentas</span> em{' '}
          <span className="text-accent-violet">6 Fases</span>
        </h2>
      </ScrollReveal>

      <div className="relative">
        {/* Center timeline line */}
        <motion.div
          className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#7c3aed] to-[#06b6d4]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ transformOrigin: 'top' }}
        />

        <div className="space-y-12 md:space-y-16">
          {PHASES.map((phase, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedIndex === index;

            return (
              <ScrollReveal key={phase.numero} delay={index * 0.12}>
                <div className="relative flex items-start gap-4 md:gap-0">
                  {/* Desktop: left-side card for even indices */}
                  {isEven && (
                    <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-10">
                      <PhaseCard
                        phase={phase}
                        isExpanded={isExpanded}
                        onToggle={() => toggle(index)}
                      />
                    </div>
                  )}

                  {/* Desktop: spacer for odd indices (left side empty) */}
                  {!isEven && (
                    <div className="hidden md:block md:w-1/2" />
                  )}

                  {/* Circle node */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10 flex-shrink-0">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-accent-violet/20"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12 + 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {phase.numero}
                    </motion.div>
                  </div>

                  {/* Desktop: right-side card for odd indices */}
                  {!isEven && (
                    <div className="hidden md:flex md:w-1/2 md:pl-10">
                      <PhaseCard
                        phase={phase}
                        isExpanded={isExpanded}
                        onToggle={() => toggle(index)}
                      />
                    </div>
                  )}

                  {/* Desktop: spacer for even indices (right side empty) */}
                  {isEven && (
                    <div className="hidden md:block md:w-1/2" />
                  )}

                  {/* Mobile: always to the right of the line */}
                  <div className="md:hidden pl-10 flex-1">
                    <PhaseCard
                      phase={phase}
                      isExpanded={isExpanded}
                      onToggle={() => toggle(index)}
                    />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

interface PhaseCardProps {
  phase: (typeof PHASES)[number];
  isExpanded: boolean;
  onToggle: () => void;
}

function PhaseCard({ phase, isExpanded, onToggle }: PhaseCardProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleToolClick = (e: React.MouseEvent, toolId: string) => {
    e.stopPropagation();
    setSelectedTool((prev) => (prev === toolId ? null : toolId));
  };

  const toolInfo = selectedTool ? TOOLS[selectedTool] : null;

  return (
    <GlassCard className="w-full max-w-lg cursor-pointer" hoverColor="#7c3aed">
      <div onClick={onToggle}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">
            {phase.nome}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-text-secondary" />
          </motion.div>
        </div>

        <p className="text-sm font-medium text-accent-cyan mb-3">
          {phase.metrica}
        </p>
      </div>

      {/* Tool badges — outside the toggle div to handle click separately */}
      <div className="flex flex-wrap items-center gap-2">
        <span onClick={(e) => e.stopPropagation()}>
          <Badge color="#7c3aed">{phase.periodo}</Badge>
        </span>
        {phase.ferramentas.map((toolId) => (
          <motion.span
            key={toolId}
            onClick={(e) => handleToolClick(e, toolId)}
            className="cursor-pointer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Badge color={selectedTool === toolId ? '#7c3aed' : '#06b6d4'}>
              {toolId}
            </Badge>
          </motion.span>
        ))}
      </div>

      {/* Tool detail panel */}
      <AnimatePresence>
        {toolInfo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className="mt-4 p-4 rounded-xl border edge-8"
              style={{ background: 'rgba(124,58,237,0.08)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-accent-violet">
                  {toolInfo.id}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedTool(null); }}
                  className="text-text-muted hover:text-text-secondary transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
              <h4 className="text-sm font-semibold text-text-primary mb-1">
                {toolInfo.nome}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {toolInfo.descricao}
              </p>
              {toolInfo.achados && (
                <span
                  className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(6,182,212,0.15)',
                    border: '1px solid rgba(6,182,212,0.3)',
                    color: '#06b6d4',
                  }}
                >
                  {toolInfo.achados}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase details expansion */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-sm text-text-secondary mt-4 leading-relaxed border-t edge-6 pt-4">
              {phase.detalhes}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
