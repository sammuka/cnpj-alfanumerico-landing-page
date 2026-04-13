import ReactECharts from 'echarts-for-react';
import { useInView } from 'react-intersection-observer';
import { STATS } from '@/data/impact-stats';
import { getChartTheme } from './ChartTheme';
import { useTheme } from '@/hooks/useTheme';

const GRADIENT_COLORS = [
  '#7c3aed', '#7640e0', '#6f47d3', '#694dc6', '#6253b9',
  '#5b59ac', '#545fa0', '#4d6693', '#476c86', '#3f7279',
  '#38786d', '#317e60', '#2a8453', '#228a47', '#1b903a',
  '#06b6d4',
];

export default function ImpactTreemap() {
  const { isDark } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const theme = getChartTheme(isDark);

  const data = STATS.porTipoImpacto.map((t, i) => ({
    name: t.tipo,
    value: t.valor,
    itemStyle: {
      color: GRADIENT_COLORS[Math.round((i / (STATS.porTipoImpacto.length - 1)) * (GRADIENT_COLORS.length - 1))],
    },
  }));

  const option = {
    backgroundColor: theme.backgroundColor,
    textStyle: theme.textStyle,
    tooltip: {
      ...theme.tooltip,
      formatter: '{b}: {c}',
    },
    series: [
      {
        type: 'treemap',
        data,
        width: '100%',
        height: '100%',
        roam: false,
        nodeClick: false,
        breadcrumb: { show: false },
        levels: [
          {
            itemStyle: {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              borderWidth: 2,
            },
          },
        ],
        label: {
          show: true,
          color: '#f0f0ff',
          fontSize: 11,
          fontFamily: 'Inter',
          formatter: '{b}\n{c}',
        },
      },
    ],
  };

  return (
    <div ref={ref} style={{ width: '100%', height: 350 }}>
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
