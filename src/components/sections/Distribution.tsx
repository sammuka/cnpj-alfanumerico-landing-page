import Section from '@/components/layout/Section';
import GlassCard from '@/components/ui/GlassCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SystemBarChart from '@/components/charts/SystemBarChart';
import RiskDonutChart from '@/components/charts/RiskDonutChart';
import ImpactTreemap from '@/components/charts/ImpactTreemap';

const cards = [
  { title: 'Por Sistema', Chart: SystemBarChart },
  { title: 'Por Risco', Chart: RiskDonutChart },
  { title: 'Por Tipo de Impacto', Chart: ImpactTreemap },
] as const;

export default function Distribution() {
  return (
    <Section id="distribution">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Onde esta o impacto
        </h2>
        <p className="text-text-muted max-w-2xl mx-auto">
          Visualize a distribuicao do impacto do CNPJ alfanumerico por sistema,
          nivel de risco e tipo de alteracao necessaria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {cards.map(({ title, Chart }, i) => (
          <ScrollReveal key={title} delay={i * 0.15}>
            <GlassCard>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {title}
              </h3>
              <Chart />
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
