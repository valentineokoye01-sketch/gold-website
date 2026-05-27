import { Shield, Award, Users, Globe, Clock } from 'lucide-react';

const badges = [
  { icon: Shield, label: 'Insured Storage' },
  { icon: Award, label: 'Licensed & Regulated' },
  { icon: Users, label: '10,000+ Investors' },
  { icon: Globe, label: 'Ships to 50+ Countries' },
  { icon: Clock, label: '24/7 Support' },
];

export default function TrustBadges() {
  return (
    <section className="bg-[#faf8f4] border-y border-[#c9a84c]/15 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row items-center gap-2.5 justify-center text-center sm:text-left"
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#c9a84c]/10">
                <Icon className="text-[#c9a84c]" size={18} />
              </div>
              <span className="text-sm font-semibold text-[#1a2535]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
