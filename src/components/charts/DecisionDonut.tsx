import ReactECharts from 'echarts-for-react';
import { useInView } from 'react-intersection-observer';
import { DECISIONS } from '@/data/decisions';
import { getChartTheme } from './ChartTheme';
import { useTheme } from '@/hooks/useTheme';

export default function DecisionDonut() {
  const { isDark } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const theme = getChartTheme(isDark);

  const option = {
    backgroundColor: theme.backgroundColor,
    textStyle: theme.textStyle,
    tooltip: {
      ...theme.tooltip,
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      ...theme.legend,
      orient: 'horizontal',
      bottom: 10,
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: isDark ? 'rgba(5, 5, 16, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderWidth: 2,
        },
        label: {
          color: theme.textStyle.color,
          fontSize: 13,
          fontFamily: 'Inter',
        },
        data: DECISIONS.map((d) => ({
          value: d.valor,
          name: d.nomeExibicao,
          itemStyle: { color: d.cor },
        })),
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
