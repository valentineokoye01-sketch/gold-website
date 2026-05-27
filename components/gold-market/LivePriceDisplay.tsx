'use client';

import { useGoldPrice } from '@/hooks/useGoldPrice';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export default function LivePriceDisplay() {
  const { price, change, changePercent, high24h, low24h, lastUpdated } = useGoldPrice();
  const isUp = change >= 0;

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const time = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '--';

  return (
    <div className="bg-[#162336] rounded-2xl p-8 border border-[#c9a84c]/20">
      <div className="flex flex-wrap items-start justify-between gap-6">
        {/* Main Price */}
        <div>
          <p className="text-[#c9a84c]/60 text-sm uppercase tracking-widest font-bold mb-2">
            XAU / USD · Spot Price
          </p>
          <div className="flex items-end gap-4">
            <span
              className="font-playfair text-5xl md:text-6xl font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
            >
              ${fmt(price)}
            </span>
            <div
              className={`flex items-center gap-1.5 pb-2 text-lg font-bold ${
                isUp ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {isUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              {isUp ? '+' : ''}{fmt(change)} ({isUp ? '+' : ''}{changePercent.toFixed(2)}%)
            </div>
          </div>
          <p className="text-white/30 text-xs mt-2 flex items-center gap-1.5">
            <RefreshCw size={11} className="animate-spin-slow" />
            Last updated: {time} UTC · Updates every 30s
          </p>
        </div>

        {/* 24h Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-[#0d1b2a] rounded-xl p-4 min-w-[120px]">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">24h High</p>
            <p className="text-emerald-400 font-bold text-xl">${fmt(high24h)}</p>
          </div>
          <div className="bg-[#0d1b2a] rounded-xl p-4 min-w-[120px]">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">24h Low</p>
            <p className="text-red-400 font-bold text-xl">${fmt(low24h)}</p>
          </div>
          <div className="bg-[#0d1b2a] rounded-xl p-4 col-span-2">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Per Troy Ounce</p>
            <p className="text-[#c9a84c] font-bold text-lg">{(price / 31.1035).toFixed(2)} USD/g</p>
          </div>
        </div>
      </div>
    </div>
  );
}
