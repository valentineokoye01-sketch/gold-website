export interface Testimonial {
  name: string;
  country: string;
  flag: string;
  rating: number;
  quote: string;
  plan: string;
  invested: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah K.',
    country: 'United Kingdom',
    flag: '🇬🇧',
    rating: 5,
    quote:
      "I was sceptical at first, but AurimGold completely changed how I think about investing. The process was seamless — I deposited $2,000, watched my returns grow monthly, and received my physical gold right at my door. Absolutely remarkable.",
    plan: 'Growth Plan',
    invested: '$2,000',
  },
  {
    name: 'Marcus T.',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    rating: 5,
    quote:
      "As someone in finance, I appreciate the transparency AurimGold offers. Real vault storage, audited quarterly, and a dedicated account manager who actually responds. My $10,000 Growth investment returned exactly as projected. I've since upgraded to Premium.",
    plan: 'Growth Plan → Premium',
    invested: '$10,000',
  },
  {
    name: 'Lin W.',
    country: 'Singapore',
    flag: '🇸🇬',
    rating: 5,
    quote:
      "Gold has always been my preferred store of value, but managing physical gold was a headache. AurimGold handles everything — secure storage, insurance, and the delivery to Singapore was prompt and professional. My $25,000 Premium investment is the best financial decision I've made.",
    plan: 'Premium Plan',
    invested: '$25,000',
  },
  {
    name: 'Amara O.',
    country: 'Nigeria',
    flag: '🇳🇬',
    rating: 5,
    quote:
      "I started with the Starter plan just to test the waters. Three months later I had my full principal plus profit, deposited directly to my bank. The platform is easy to use and customer support was available whenever I needed help.",
    plan: 'Starter Plan',
    invested: '$500',
  },
  {
    name: 'Priya M.',
    country: 'India',
    flag: '🇮🇳',
    rating: 5,
    quote:
      "Gold investment in India is culturally significant, but AurimGold made it global. I can invest in certified London vault gold from Mumbai and choose whether to receive physical gold or a bank transfer. The 3% monthly return on the Growth plan is outstanding.",
    plan: 'Growth Plan',
    invested: '$7,500',
  },
];
