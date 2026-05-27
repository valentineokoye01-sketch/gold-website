'use client';

import { useEffect, useState } from 'react';

export interface GoldPriceData {
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  lastUpdated: string;
}

const BASE_PRICE = 2345.0;

export function useGoldPrice(): GoldPriceData {
  const [data, setData] = useState<GoldPriceData>({
    price: BASE_PRICE,
    change: 0,
    changePercent: 0,
    high24h: BASE_PRICE + 12,
    low24h: BASE_PRICE - 18,
    lastUpdated: new Date().toISOString(),
  });

  const fetchPrice = async () => {
    try {
      const res = await fetch('/api/gold-price');
      if (res.ok) {
        const json = await res.json();
        setData({
          price: json.price,
          change: json.change,
          changePercent: json.changePercent,
          high24h: json.high24h,
          low24h: json.low24h,
          lastUpdated: json.timestamp,
        });
      }
    } catch {
      // Keep previous data on error
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 30_000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
