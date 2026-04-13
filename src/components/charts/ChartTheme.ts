export const DARK_CHART_THEME = {
  backgroundColor: 'transparent',
  textStyle: { color: '#94a3b8', fontFamily: 'Inter' },
  tooltip: {
    backgroundColor: 'rgba(5, 5, 16, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    textStyle: { color: '#f0f0ff', fontSize: 13 },
  },
  legend: {
    textStyle: { color: '#94a3b8', fontSize: 12 },
  },
  categoryAxis: {
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.06)' } },
    axisLabel: { color: '#94a3b8' },
  },
  valueAxis: {
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.06)' } },
    axisLabel: { color: '#94a3b8' },
    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.04)' } },
  },
};

export const LIGHT_CHART_THEME = {
  backgroundColor: 'transparent',
  textStyle: { color: '#475569', fontFamily: 'Inter' },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    textStyle: { color: '#0f172a', fontSize: 13 },
  },
  legend: {
    textStyle: { color: '#475569', fontSize: 12 },
  },
  categoryAxis: {
    axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' } },
    axisLabel: { color: '#475569' },
  },
  valueAxis: {
    axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' } },
    axisLabel: { color: '#475569' },
    splitLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.06)' } },
  },
};

export function getChartTheme(isDark: boolean) {
  return isDark ? DARK_CHART_THEME : LIGHT_CHART_THEME;
}
