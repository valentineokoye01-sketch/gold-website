export interface Plan {
  name: string;
  slug: string;
  minInvestment: number;
  maxInvestment: number | null;
  monthlyReturn: number;
  period: number;
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
    monthlyReturn: 2,
    period: 3,
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
    monthlyReturn: 3,
    period: 6,
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
    monthlyReturn: 4,
    period: 12,
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
