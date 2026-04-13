import ReactECharts from 'echarts-for-react';
import { useInView } from 'react-intersection-observer';
import { getChartTheme } from './ChartTheme';
import { useTheme } from '@/hooks/useTheme';

export default function SqlReposBar() {
  const { isDark } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const theme = getChartTheme(isDark);

  const option = {
    backgroundColor: theme.backgroundColor,
    textStyle: theme.textStyle,
    tooltip: {
      ...theme.tooltip,
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: { left: '3%', right: '10%', top: '3%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLine: theme.valueAxis.axisLine,
      axisLabel: theme.valueAxis.axisLabel,
      splitLine: theme.valueAxis.splitLine,
    },
    yAxis: {
      type: 'category',
      data: [
        'ultron-emissao-endosso-param...',
        'ultron-sinistro-regulacao-sql',
        'ultron-proposta-scripts-sql',
        'ultron-emissao-scripts-sql',
        'ultron-sinistro-scripts-sql',
      ],
      axisLine: theme.categoryAxis.axisLine,
      axisLabel: {
        ...theme.categoryAxis.axisLabel,
        fontSize: 11,
      },
    },
    series: [
      {
        type: 'bar',
        data: [4, 5, 7, 10, 31],
        barWidth: '50%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#7c3aed' },
              { offset: 1, color: '#3b82f6' },
            ],
          },
          borderRadius: [0, 4, 4, 0],
        },
        label: {
          show: true,
          position: 'right',
          color: theme.textStyle.color,
          fontSize: 13,
          fontFamily: 'Inter',
        },
      },
    ],
    animationDuration: 1500,
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
