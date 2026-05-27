export interface FAQ {
  category: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  // Getting Started
  {
    category: 'Getting Started',
    question: 'How do I open an account with AurimGold?',
    answer:
      'Opening an account is simple. Visit our registration page, provide your email address, create a secure password, and complete our identity verification process. Once verified, your account is activated and you can fund your first investment within minutes.',
  },
  {
    category: 'Getting Started',
    question: 'What documents do I need to verify my identity?',
    answer:
      'We require a government-issued photo ID (passport, national ID card, or driver\'s licence) and a proof of address document dated within the last three months (utility bill, bank statement, or official government letter). All documents must be clear and legible.',
  },
  {
    category: 'Getting Started',
    question: 'What countries are supported?',
    answer:
      'AurimGold accepts investors from 50+ countries across Europe, the Middle East, Asia, Africa, and the Americas. A full list of supported jurisdictions is available during registration. Physical gold shipment is available to all supported countries; bank transfers are processed in USD, EUR, GBP, AED, and SGD.',
  },
  {
    category: 'Getting Started',
    question: 'Is there a minimum age requirement?',
    answer:
      'Yes. All investors must be at least 18 years of age. This is a regulatory requirement applicable to all jurisdictions we operate in. Age is verified during our identity verification process.',
  },
  {
    category: 'Getting Started',
    question: 'How long does the verification process take?',
    answer:
      'Standard verification is completed within 24–48 business hours. In most cases, automated checks provide instant approval. If additional review is required, our compliance team will contact you directly. We recommend submitting clear, high-resolution document scans for fastest processing.',
  },

  // Investment & Returns
  {
    category: 'Investment & Returns',
    question: 'How are the 2–4% monthly returns generated?',
    answer:
      'Returns are generated through our proprietary gold trading operations, which include spot gold arbitrage, forward contracts, and leasing arrangements with institutional counterparties. The gold backing each investor\'s position is held in certified vaults, and our trading desk actively manages allocations to generate consistent monthly yields subject to market conditions.',
  },
  {
    category: 'Investment & Returns',
    question: 'Are my returns guaranteed?',
    answer:
      'The stated return ranges (2–4% per month) represent our target rates based on current market conditions and historical performance. While we have maintained these returns consistently, all investments carry inherent market risk, and past performance does not guarantee future results. We strongly encourage investors to review our Risk Disclosure before investing.',
  },
  {
    category: 'Investment & Returns',
    question: 'When do I receive my returns?',
    answer:
      'Returns accrue monthly throughout your investment period. At the end of your chosen plan duration (3, 6, or 12 months), your total principal plus accumulated profit becomes available for withdrawal. You can request withdrawal at that time via physical gold shipment or bank transfer.',
  },
  {
    category: 'Investment & Returns',
    question: 'Can I reinvest my profits?',
    answer:
      'Yes. At the end of your investment period, you can choose to reinvest your total payout (principal + profit) into a new plan. Many of our investors compound their returns by rolling over into higher-tier plans as their investment grows.',
  },
  {
    category: 'Investment & Returns',
    question: 'Can I invest in multiple plans simultaneously?',
    answer:
      'Yes. You may hold multiple active investment plans concurrently. For example, you could have a Starter plan running alongside a Growth plan. Each plan operates independently with its own timeline and withdrawal schedule.',
  },

  // Gold Storage & Security
  {
    category: 'Gold Storage & Security',
    question: 'Where is my gold stored?',
    answer:
      'All investor gold is held in allocated storage in LBMA-certified vaults in London, Zurich, and Singapore. Your gold is physically segregated from AurimGold\'s operational assets and is titled in your name for full transparency. Vault details are available in your investor portal.',
  },
  {
    category: 'Gold Storage & Security',
    question: 'Is my gold insured?',
    answer:
      'Yes. All gold held on behalf of AurimGold investors is insured at full replacement value through Lloyd\'s of London. Insurance covers theft, damage, and loss in transit for shipments. Premium plan investors receive enhanced shipment insurance for international deliveries.',
  },
  {
    category: 'Gold Storage & Security',
    question: 'How do I know my gold is genuine?',
    answer:
      'We exclusively purchase gold bars and coins from LBMA-approved refiners. Each bar carries a unique serial number and assay certificate confirming purity (minimum 99.5% fine gold). Investors can request a copy of their allocated gold\'s assay certificate from their investor portal at any time.',
  },
  {
    category: 'Gold Storage & Security',
    question: 'Are vaults independently audited?',
    answer:
      'Yes. Our vault holdings are independently audited on a quarterly basis by a Big Four accounting firm. Audit reports are published in our investor portal. Additionally, our vault partners undergo annual regulatory inspections by relevant financial authorities.',
  },

  // Withdrawals
  {
    category: 'Withdrawals',
    question: 'When can I withdraw my investment?',
    answer:
      'Withdrawals are available at the end of your investment period: 3 months for Starter, 6 months for Growth, and 12 months for Premium plans. Premium plan holders also have an early withdrawal option, subject to a 1% early exit fee. Withdrawal windows remain open for 30 days after each plan matures.',
  },
  {
    category: 'Withdrawals',
    question: 'What is the minimum withdrawal amount?',
    answer:
      'The minimum withdrawal is $500 USD equivalent for both gold shipment and bank transfer options. For physical gold, this equates to approximately the smallest standard denomination bar we hold (typically 1 troy ounce).',
  },
  {
    category: 'Withdrawals',
    question: 'How long does gold shipment take?',
    answer:
      'Once your withdrawal request is approved and identity verified, gold is dispatched within 3–5 business days. Delivery timelines vary by destination: 7–10 business days for Europe and the Middle East, 10–21 business days for Asia, Africa, and the Americas. A tracking number is provided within 48 hours of dispatch.',
  },
  {
    category: 'Withdrawals',
    question: 'Can I withdraw before my plan period ends?',
    answer:
      'Early withdrawal is available exclusively to Premium plan holders, subject to a 1% fee on the total withdrawal amount. Starter and Growth plan holders must wait until their plan matures. This structure allows us to maintain the stable returns we target for all investors.',
  },
  {
    category: 'Withdrawals',
    question: 'What happens if I miss the withdrawal window?',
    answer:
      'If you do not submit a withdrawal request within 30 days of your plan maturing, your funds are automatically rolled into a new plan at the same tier. You will receive multiple email notifications as your maturity date approaches. You can opt out of auto-rollover in your account settings.',
  },

  // Payments
  {
    category: 'Payments',
    question: 'What cryptocurrencies are accepted?',
    answer:
      'We accept Bitcoin (BTC), Ethereum (ETH on ERC-20), and Tether USDT (on both TRC-20 and ERC-20 networks). Minimum deposit amounts vary by currency: $100 for BTC and ETH, $50 for USDT. All wallet addresses are unique per investor and per transaction for security.',
  },
  {
    category: 'Payments',
    question: 'How do I confirm a bank transfer payment?',
    answer:
      'After initiating a bank wire, log into your investor portal and upload your transfer confirmation or SWIFT reference number. Include your unique AurimGold reference code in the memo field of the transfer. Once received and matched (typically 1–3 business days), your investment is activated.',
  },
  {
    category: 'Payments',
    question: 'What if my crypto transaction is not confirmed?',
    answer:
      'Blockchain confirmations can occasionally be delayed due to network congestion. Bitcoin requires 3 confirmations, Ethereum requires 12. If your transaction has not been credited after 24 hours, contact our support team with your transaction hash (TXID) and we will investigate promptly.',
  },
  {
    category: 'Payments',
    question: 'Are there deposit fees?',
    answer:
      'AurimGold does not charge deposit fees. For cryptocurrency payments, standard blockchain network fees (gas fees) apply and are payable by the sender. For bank transfers, your sending bank may charge an international wire fee — check with your bank. We receive the full amount you send.',
  },

  // Account & Verification
  {
    category: 'Account & Verification',
    question: 'How do I update my delivery address for gold shipment?',
    answer:
      'You can update your shipping address in your account settings under "Delivery Preferences." For security, any change to a shipping address requires re-verification of your identity before a gold shipment can be dispatched to the new address.',
  },
  {
    category: 'Account & Verification',
    question: 'What forms of ID are accepted?',
    answer:
      'We accept international passports, national identity cards, and government-issued driver\'s licences. The document must be valid (not expired), contain a clear photo, and show your full legal name. Documents must be submitted in colour; black-and-white scans are not accepted.',
  },
  {
    category: 'Account & Verification',
    question: 'Can I have multiple accounts?',
    answer:
      'Each individual may hold only one personal AurimGold account. Multiple plans can be held within a single account. If you believe you have a duplicate account, please contact support immediately. Corporate accounts are available for institutional investors — contact us for details.',
  },
  {
    category: 'Account & Verification',
    question: 'How do I contact support?',
    answer:
      'Our support team is available via email (support@auragoldinvestments.com), WhatsApp (+1 800 287-4653), and Telegram (@AurimGoldSupport). Email responses are provided within 24 business hours. WhatsApp and Telegram messages are typically answered within 2–4 hours during business hours (Mon–Fri, 9am–6pm GMT).',
  },
];

export const faqCategories = [
  'Getting Started',
  'Investment & Returns',
  'Gold Storage & Security',
  'Withdrawals',
  'Payments',
  'Account & Verification',
] as const;

export type FAQCategory = (typeof faqCategories)[number];
