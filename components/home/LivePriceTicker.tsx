'use client';

import { useGoldPrice } from '@/hooks/useGoldPrice';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TICKER_ITEMS = ['XAU/USD', 'XAU/EUR', 'XAU/GBP', 'XAU/AED', 'XAU/SGD', 'GOLD SPOT'];
const MULTIPLIERS = [1, 0.92, 0.79, 3.67, 1.35, 1];

export default function LivePriceTicker() {
  const { price, change, changePercent } = useGoldPrice();
  const isUp = change >= 0;

  const items = [...TICKER_ITEMS, ...TICKER_ITEMS].map((label, i) => {
    const mult = MULTIPLIERS[i % MULTIPLIERS.length];
    const p = (price * mult).toFixed(2);
    const c = (changePercent * 0.8 + Math.random() * 0.3).toFixed(2);
    return { label, price: p, change: c, up: isUp };
  });

  return (
    <div className="bg-[#080f17] border-y border-[#c9a84c]/20 py-3 overflow-hidden">
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-8 text-sm font-medium"
            >
              <span className="text-[#c9a84c]/60 uppercase tracking-widest text-xs font-bold">
                {item.label}
              </span>
              <span className="text-white font-semibold">${item.price}</span>
              <span
                className={`flex items-center gap-0.5 text-xs font-bold ${
                  item.up ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {item.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {item.up ? '+' : '-'}{Math.abs(Number(item.change))}%
              </span>
              <span className="text-[#c9a84c]/20 mx-2">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
