import ReactECharts from 'echarts-for-react';
import { useInView } from 'react-intersection-observer';
import { STATS } from '@/data/impact-stats';
import { getChartTheme } from './ChartTheme';
import { useTheme } from '@/hooks/useTheme';

const LABEL_MAP: Record<string, string> = {
  BACKLOG_PRIORIZADO: 'Backlog Priorizado',
  ROTINA_OU_CAMPO_REFERENCIA: 'Rotina / Campo Ref.',
  CALLGRAPH_UTIL_CNPJ: 'Callgraph Util CNPJ',
  BIAS_FIXTURE_TESTE: 'Bias Fixture Teste',
  ASSINATURA_MULTILINE: 'Assinatura Multiline',
  REGRA_FORMATO_HARDCODEADA: 'Formato Hardcoded',
  CONSTRAINT_UI_DOCUMENTO: 'Constraint UI',
  NUMERIC_CONVERSION: 'Conversão Numérica',
  PIPELINE_STRIP_NUMERICO: 'Strip Numérico',
  DIGIT_STRIP: 'Digit Strip',
};

const BAR_COLORS = [
  '#7c3aed', '#7640e0', '#6f47d3', '#6253b9',
  '#545fa0', '#4d6693', '#3f7279', '#2a8453',
  '#1b903a', '#06b6d4',
];

export default function ImpactTreemap() {
  const { isDark } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const theme = getChartTheme(isDark);

  const sorted = [...STATS.porTipoImpacto].sort((a, b) => b.valor - a.valor);
  const labels = sorted.map((d) => LABEL_MAP[d.tipo] ?? d.tipo);
  const values = sorted.map((d) => d.valor);

  const option = {
    backgroundColor: 'transparent',
    textStyle: theme.textStyle,
    tooltip: {
      ...theme.tooltip,
      formatter: (params: { name: string; value: number }) =>
        `<b>${params.name}</b><br/>${params.value.toLocaleString('pt-BR')} achados`,
    },
    grid: {
      left: 20,
      right: 80,
      top: 10,
      bottom: 10,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: {
        lineStyle: {
          color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
        },
      },
    },
    yAxis: {
      type: 'category',
      data: labels,
      inverse: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: isDark ? '#94a3b8' : '#475569',
        fontSize: 12,
        fontFamily: 'Inter',
      },
    },
    series: [
      {
        type: 'bar',
        data: values.map((v, i) => ({
          value: v,
          itemStyle: {
            color: BAR_COLORS[i % BAR_COLORS.length],
            borderRadius: [0, 4, 4, 0],
          },
        })),
        label: {
          show: true,
          position: 'right',
          color: isDark ? '#f0f0ff' : '#0f172a',
          fontSize: 12,
          fontFamily: 'JetBrains Mono',
          fontWeight: 600,
          formatter: (params: { value: number }) =>
            params.value.toLocaleString('pt-BR'),
        },
        barMaxWidth: 32,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(124,58,237,0.4)',
          },
        },
      },
    ],
  };

  return (
    <div ref={ref} style={{ width: '100%', height: 380 }}>
      {inView && (
        <ReactECharts
          option={option}
          style={{ width: '100%', height: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      )}
    </div>
  );
}
