import { NextResponse } from 'next/server';

const BASE_PRICE = 2345.0;
let currentPrice = BASE_PRICE;

export async function GET() {
  const fluctuation = (Math.random() - 0.5) * 16; // ±$8
  currentPrice = Math.max(2200, Math.min(2500, currentPrice + fluctuation));

  const change = currentPrice - BASE_PRICE;
  const changePercent = (change / BASE_PRICE) * 100;
  const high24h = currentPrice + Math.random() * 15 + 5;
  const low24h = currentPrice - Math.random() * 20 - 5;

  return NextResponse.json({
    price: Math.round(currentPrice * 100) / 100,
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100,
    high24h: Math.round(high24h * 100) / 100,
    low24h: Math.round(low24h * 100) / 100,
    timestamp: new Date().toISOString(),
  });
}
