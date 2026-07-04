'use client';

import { memo, useMemo, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartMetric } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

type Props = {
  activeChart: ChartMetric;
  data: {
    label: string;
    views: number;
    impressions: number;
    followers: number;
  }[] | null;
};

function AnalyticsChart({ activeChart, data }: Props) {
  const chartRef = useRef<any>(null);
  const safeData = Array.isArray(data) ? data : [];

  const chartData = useMemo(() => {
    return {
      labels: safeData.map((d) => d.label),
      datasets: [
        {
          label: activeChart,
          data: safeData.map((d) =>
            Number(d[activeChart] ?? 0)
          ),
          borderColor: '#4a3728',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#4a3728',
          fill: true,
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) return null;

            const gradient = ctx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );

            gradient.addColorStop(0, 'rgba(74,55,40,0.25)');
            gradient.addColorStop(1, 'rgba(74,55,40,0.02)');

            return gradient;
          },
        },
      ],
    };
  }, [safeData, activeChart]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart' as const,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#4a3728',
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
          titleColor: '#fff',
          bodyColor: '#fff',
          callbacks: {
            label: function (context: any) {
              return `${context.parsed.y.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#7a5c4d',
            font: {
              size: 11,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(74,55,40,0.06)',
          },
          ticks: {
            color: '#7a5c4d',
            font: {
              size: 11,
            },
            callback: function (value: any) {
              return Number(value).toLocaleString();
            },
          },
        },
      },
      hover: {
        mode: 'nearest' as const,
        intersect: false,
      },
    };
  }, []);

  if (!safeData.length) {
    return (
      <div className="h-72 flex items-center justify-center text-sm text-[#4a3728]/60">
        No analytics data available
      </div>
    );
  }

  return (
    <div className="h-72 cursor-pointer">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
}

export default memo(AnalyticsChart);