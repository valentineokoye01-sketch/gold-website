'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const labels = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
const prices = [1978, 2010, 2045, 1990, 2080, 2120, 2060, 2150, 2210, 2280, 2310, 2345];

export default function GoldPriceChart() {
  const data = {
    labels,
    datasets: [
      {
        label: 'XAU/USD',
        data: prices,
        fill: true,
        borderColor: '#c9a84c',
        borderWidth: 2.5,
        backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D; chartArea: { top: number; bottom: number } | null } }) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(201,168,76,0.1)';
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(201,168,76,0.25)');
          gradient.addColorStop(1, 'rgba(201,168,76,0.01)');
          return gradient;
        },
        pointBackgroundColor: '#c9a84c',
        pointBorderColor: '#0d1b2a',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#162336',
        borderColor: '#c9a84c',
        borderWidth: 1,
        titleColor: '#c9a84c',
        bodyColor: '#fff',
        callbacks: {
          label: (ctx: { parsed: { y: number } }) => ` $${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(201,168,76,0.06)' },
        ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 12 } },
      },
      y: {
        grid: { color: 'rgba(201,168,76,0.06)' },
        ticks: {
          color: 'rgba(255,255,255,0.4)',
          font: { size: 12 },
          callback: (v: unknown) => `$${Number(v).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="bg-[#162336] rounded-2xl p-6 border border-[#c9a84c]/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg">12-Month Gold Price</h3>
          <p className="text-white/40 text-sm">XAU/USD Historical Performance</p>
        </div>
        <span className="text-xs text-[#c9a84c] bg-[#c9a84c]/10 px-3 py-1 rounded-full font-semibold uppercase tracking-widest">
          +18.5% YTD
        </span>
      </div>
      <div className="h-64 md:h-80">
        <Line data={data} options={options as Parameters<typeof Line>[0]['options']} />
      </div>
    </div>
  );
}
