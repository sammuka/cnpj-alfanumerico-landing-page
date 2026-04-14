import { motion } from 'framer-motion';
import { Code2, Scissors, Regex, Database, FileJson, Monitor } from 'lucide-react';
import Section from '@/components/layout/Section';
import GlassCard from '@/components/ui/GlassCard';
import CodeBlock from '@/components/ui/CodeBlock';
import ScrollReveal from '@/components/ui/ScrollReveal';

const cards = [
  {
    icon: Code2,
    title: 'Conversao Numerica',
    code: 'long cnpjRaiz = Long.parseLong(cnpj);',
    language: 'java',
    color: 'text-accent-violet',
  },
  {
    icon: Scissors,
    title: 'Strip de Digitos',
    code: 'cnpj.replaceAll("\\\\D", "")',
    language: 'java',
    color: 'text-accent-blue',
  },
  {
    icon: Regex,
    title: 'Validacao Regex',
    code: 'Pattern.matches("[0-9]{14}", cnpj)',
    language: 'java',
    color: 'text-accent-cyan',
  },
  {
    icon: Database,
    title: 'Tipo SQL',
    code: 'CAST(nr_cnpj AS BIGINT)',
    language: 'sql',
    color: 'text-accent-pink',
  },
  {
    icon: FileJson,
    title: 'Schema API',
    code: '{ "cnpj": { "type": "integer", "format": "int64" } }',
    language: 'json',
    color: 'text-accent-violet',
  },
  {
    icon: Monitor,
    title: 'Mascara UI',
    code: '<input maxlength="14" pattern="[0-9]*">',
    language: 'html',
    color: 'text-accent-blue',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function Problem() {
  return (
    <Section id="problem">
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center">
          O que quebra quando CNPJ ganha letras
        </h2>
        <p className="mt-4 text-center text-text-secondary max-w-2xl mx-auto">
          Padr&otilde;es enraizados em d&eacute;cadas de CNPJ num&eacute;rico que precisam ser revisados em cada camada da stack.
        </p>
      </ScrollReveal>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {cards.map((card) => (
          <motion.div key={card.title} variants={itemVariants}>
            <GlassCard className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-3">
                <card.icon size={22} className={`${card.color} flex-shrink-0`} />
                <h3 className="text-lg font-semibold text-text-primary leading-tight">
                  {card.title}
                </h3>
              </div>
              <CodeBlock code={card.code} language={card.language} />
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
