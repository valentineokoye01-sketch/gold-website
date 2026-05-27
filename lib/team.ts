export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    name: 'James Hartley',
    title: 'Chief Executive Officer',
    bio: 'James brings 20 years of experience in commodities trading and wealth management, having previously led gold desk operations at a tier-one London bank. He founded AuraGold in 2018 with a singular mission: make institutional-grade gold investment available to everyone.',
    image: '/images/team/james-hartley.jpg',
  },
  {
    name: 'Fatima Al-Rashid',
    title: 'Chief Operations Officer',
    bio: 'Fatima oversees AuraGold\'s global vault partnerships and investor relations across the Middle East and Asia. With a background in central bank gold reserves, she ensures every investor\'s allocation is securely stored, fully insured, and independently audited.',
    image: '/images/team/fatima-alrashid.jpg',
  },
  {
    name: 'David Chen',
    title: 'Chief Technology Officer',
    bio: 'David architected AuraGold\'s secure investment platform, drawing on prior experience at leading fintech firms in Singapore and New York. He leads the engineering and cybersecurity teams ensuring platform integrity and seamless investor experience.',
    image: '/images/team/david-chen.jpg',
  },
  {
    name: 'Sophia Williams',
    title: 'Head of Compliance & Legal',
    bio: 'Sophia manages AuraGold\'s regulatory relationships across multiple jurisdictions, ensuring the platform meets the highest standards of financial compliance. She is a qualified solicitor with 15 years of experience in financial services regulation.',
    image: '/images/team/sophia-williams.jpg',
  },
];
