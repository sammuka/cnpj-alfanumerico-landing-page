import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import ScrollReveal from '@/components/ui/ScrollReveal';
import DecisionDonut from '@/components/charts/DecisionDonut';
import { FUNNEL_STAGES } from '@/data/funnel-stages';

function formatNumber(n: number): string {
  return n.toLocaleString('pt-BR');
}

export default function Funnel() {
  const svgWidth = 600;
  const levelHeight = 80;
  const levelGap = 30;
  const startY = 40;

  return (
    <Section id="funnel">
      <ScrollReveal>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">
          De 70.729 achados brutos a 6.820 acoes confirmadas
        </h2>
      </ScrollReveal>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side: SVG Funnel */}
        <div className="lg:w-3/5">
          <svg viewBox="0 0 600 700" className="w-full h-auto">
            {FUNNEL_STAGES.map((stage, i) => {
              const rectWidth = (svgWidth - 80) * (stage.larguraRelativa / 100);
              const rectX = (svgWidth - rectWidth) / 2;
              const rectY = startY + i * (levelHeight + levelGap);

              return (
                <motion.g
                  key={stage.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <rect
                    x={rectX}
                    y={rectY}
                    width={rectWidth}
                    height={levelHeight}
                    rx={8}
                    fill={stage.cor}
                    opacity={0.8}
                  />
                  <text
                    x={svgWidth / 2}
                    y={rectY + levelHeight / 2 - 8}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={14}
                    fontWeight={600}
                  >
                    {stage.label}
                  </text>
                  <text
                    x={svgWidth / 2}
                    y={rectY + levelHeight / 2 + 14}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={18}
                    fontWeight={700}
                    fontFamily="monospace"
                  >
                    {formatNumber(stage.valor)}
                  </text>
                  {stage.operacao && (
                    <text
                      x={rectX + rectWidth + 12}
                      y={rectY + levelHeight / 2 + 5}
                      fill={stage.cor}
                      fontSize={12}
                      fontWeight={500}
                      opacity={0.9}
                    >
                      {stage.operacao}
                    </text>
                  )}
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Right side: Decision Donut */}
        <div className="lg:w-2/5 flex items-center justify-center">
          <DecisionDonut />
        </div>
      </div>
    </Section>
  );
}
