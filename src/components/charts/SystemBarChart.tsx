import ReactECharts from 'echarts-for-react';
import { useInView } from 'react-intersection-observer';
import { getChartTheme } from './ChartTheme';
import { useTheme } from '@/hooks/useTheme';

export default function SystemBarChart() {
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
      data: ['SIMULADORES', 'SEGBR', 'ULTRON'],
      axisLine: theme.categoryAxis.axisLine,
      axisLabel: theme.categoryAxis.axisLabel,
    },
    series: [
      {
        type: 'bar',
        data: [
          { value: 1304, itemStyle: { color: '#10b981' } },
          { value: 1742, itemStyle: { color: '#f59e0b' } },
          { value: 3773, itemStyle: { color: '#3b82f6' } },
        ],
        barWidth: '50%',
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
