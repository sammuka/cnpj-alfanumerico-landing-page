import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container } from '@tsparticles/engine';
import Section from '@/components/layout/Section';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GradientText from '@/components/ui/GradientText';
import Badge from '@/components/ui/Badge';
import { useTheme } from '@/hooks/useTheme';

const FULL_TEXT = 'CNPJ Alfanumerico';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const { isDark } = useTheme();
  const [init, setInit] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  // Initialize tsparticles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  // Typing effect
  useEffect(() => {
    if (displayedText.length >= FULL_TEXT.length) return;

    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (prev.length >= FULL_TEXT.length) return prev;
        return FULL_TEXT.slice(0, prev.length + 1);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [displayedText]);

  const particlesLoaded = useCallback(async (_container?: Container) => {
    // particles loaded
  }, []);

  return (
    <Section id="hero" className="relative min-h-screen flex items-center">
      {/* Particle background */}
      {init && (
        <Particles
          key={isDark ? 'dark' : 'light'}
          id="hero-particles"
          className="absolute inset-0 -z-10"
          particlesLoaded={particlesLoaded}
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,
            particles: {
              number: { value: 80 },
              color: { value: isDark ? '#ffffff' : '#6b7280' },
              opacity: { value: isDark ? 0.3 : 0.5 },
              links: {
                enable: true,
                distance: 150,
                color: isDark ? '#ffffff' : '#6b7280',
                opacity: isDark ? 0.15 : 0.2,
              },
              move: {
                enable: true,
                speed: 0.3,
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      )}

      <motion.div
        className="w-full flex flex-col items-center text-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={childVariants}>
          <Badge>Brasilseg &middot; Analise de Impacto &middot; Marco 2026</Badge>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={childVariants}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
        >
          <span className="block text-text-primary">Analise de Impacto</span>
          <span className="block mt-2">
            <GradientText className="text-4xl md:text-6xl lg:text-7xl font-bold">
              {displayedText}
            </GradientText>
            <span className="animate-cursor text-accent-violet">|</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={childVariants}
          className="max-w-3xl text-lg md:text-xl text-text-secondary"
        >
          38,5 milh&otilde;es de linhas &nbsp;|&nbsp; 1.086 reposit&oacute;rios &nbsp;|&nbsp; 33 ferramentas &nbsp;|&nbsp; 9 dias
        </motion.p>

        {/* Counter cards grid */}
        <motion.div
          variants={childVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-4"
        >
          <GlassCard className="flex flex-col items-center gap-2 py-8">
            <AnimatedCounter
              end={38548968}
              className="font-mono text-4xl md:text-5xl font-extrabold text-text-primary"
            />
            <span className="text-sm text-text-secondary">linhas de codigo</span>
          </GlassCard>

          <GlassCard className="flex flex-col items-center gap-2 py-8">
            <AnimatedCounter
              end={6820}
              className="font-mono text-4xl md:text-5xl font-extrabold text-text-primary"
            />
            <span className="text-sm text-text-secondary">pontos de alteracao</span>
          </GlassCard>

          <GlassCard className="flex flex-col items-center gap-2 py-8">
            <AnimatedCounter
              end={97}
              className="font-mono text-4xl md:text-5xl font-extrabold text-text-primary"
            />
            <span className="text-sm text-text-secondary">migracoes SQL</span>
          </GlassCard>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div variants={childVariants} className="mt-8">
          <ChevronDown className="w-8 h-8 text-text-muted animate-bounce-arrow" />
        </motion.div>
      </motion.div>
    </Section>
  );
}
