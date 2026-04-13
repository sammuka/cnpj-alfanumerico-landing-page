import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GradientText from '@/components/ui/GradientText';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SYSTEMS } from '@/data/systems';

export default function Scope() {
  return (
    <Section id="scope">
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">
          3 Sistemas, <GradientText>1.086 Repositorios</GradientText>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {SYSTEMS.map((system, index) => (
          <ScrollReveal key={system.id} delay={index * 0.15}>
            <GlassCard hoverColor={system.cor} className="h-full">
              <div style={{ borderTop: `3px solid ${system.cor}` }} className="rounded-t-2xl -mx-6 -mt-6 px-6 pt-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  {system.nome}
                </h3>
              </div>

              <div className="mt-4 mb-2">
                <span style={{ color: system.cor }}>
                  <AnimatedCounter
                    end={system.linhasCodigo}
                    duration={2.5}
                    className="font-mono text-4xl md:text-5xl font-extrabold"
                  />
                </span>
                <p className="text-text-secondary text-sm mt-1">linhas de codigo</p>
              </div>

              <ul className="space-y-2 my-4 text-sm text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: system.cor }} />
                  <span><strong className="text-text-primary">{system.repositoriosTotal.toLocaleString('pt-BR')}</strong> repos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: system.cor }} />
                  <span><strong className="text-text-primary">{system.percentualLoc}%</strong> do total</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-2 my-4">
                {system.tecnologias.map((tech) => (
                  <Badge key={tech} color={system.cor}>{tech}</Badge>
                ))}
              </div>

              <ProgressBar value={system.percentualLoc} color={system.cor} delay={index * 0.2} />
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      {/* Proportion bar */}
      <ScrollReveal delay={0.5}>
        <div className="mt-12 rounded-full overflow-hidden flex h-3 surf-6">
          {SYSTEMS.map((system) => (
            <motion.div
              key={system.id}
              className="h-full"
              style={{ backgroundColor: system.cor }}
              initial={{ width: 0 }}
              whileInView={{ width: `${system.percentualLoc}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-text-secondary">
          {SYSTEMS.map((system) => (
            <span key={system.id} style={{ color: system.cor }}>
              {system.nome} ({system.percentualLoc}%)
            </span>
          ))}
        </div>
      </ScrollReveal>

      {/* Total */}
      <ScrollReveal delay={0.7}>
        <div className="text-center mt-16">
          <p className="animate-pulse-glow font-mono text-5xl md:text-6xl font-extrabold">
            <GradientText>38.548.968</GradientText>
          </p>
          <p className="text-text-secondary mt-2 text-lg">linhas de codigo analisadas</p>
        </div>
      </ScrollReveal>
    </Section>
  );
}
