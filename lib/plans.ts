export interface Plan {
  name: string;
  slug: string;
  minInvestment: number;
  maxInvestment: number | null;
  dailyReturn: number;       // % per day (simple interest)
  period: number;            // months
  days: number;              // trading days in period (period × 30)
  badge: string | null;
  features: string[];
  color: string;
  highlighted: boolean;
}

export const plans: Plan[] = [
  {
    name: 'Starter',
    slug: 'starter',
    minInvestment: 500,
    maxInvestment: 4999,
    dailyReturn: 2,
    period: 3,
    days: 90,
    badge: null,
    features: [
      'Crypto & Bank Transfer',
      'Gold or Cash Withdrawal',
      'Email Support',
      'Monthly Statements',
      'Secure Vault Storage',
    ],
    color: '#c9a84c',
    highlighted: false,
  },
  {
    name: 'Growth',
    slug: 'growth',
    minInvestment: 5000,
    maxInvestment: 24999,
    dailyReturn: 3,
    period: 6,
    days: 180,
    badge: 'Most Popular',
    features: [
      'Crypto & Bank Transfer',
      'Priority Processing',
      'Dedicated Support',
      'Gold or Cash Withdrawal',
      'Monthly Statements',
      'Secure Vault Storage',
    ],
    color: '#c9a84c',
    highlighted: true,
  },
  {
    name: 'Premium',
    slug: 'premium',
    minInvestment: 25000,
    maxInvestment: null,
    dailyReturn: 4,
    period: 12,
    days: 360,
    badge: 'Best Returns',
    features: [
      'Crypto & Bank Transfer',
      'Personal Account Manager',
      'VIP Support Line',
      'Gold Shipment Insured',
      'Quarterly Reports',
      'Early Withdrawal Option',
      'Secure Vault Storage',
    ],
    color: '#c9a84c',
    highlighted: false,
  },
];
