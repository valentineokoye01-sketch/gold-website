import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Mail } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';
import Accordion from '@/components/ui/Accordion';
import { faqs, faqCategories } from '@/lib/faqs';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Find answers to common questions about AuraGold — getting started, investment plans, gold storage, withdrawals, payments, and account management.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ — AuraGold Investments',
    description: 'Answers to the most common questions about gold investment with AuraGold.',
  },
};

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0d1b2a] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1
              className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
            >
              Frequently Asked{' '}
              <span className="text-[#c9a84c]">Questions</span>
            </h1>
            <p className="text-white/60 text-xl">
              Everything you need to know about investing with AuraGold — organised by topic.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="bg-[#faf8f4] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {faqCategories.map((category, i) => {
            const items = faqs
              .filter((f) => f.category === category)
              .map(({ question, answer }) => ({ question, answer }));

            return (
              <FadeIn key={category} delay={i * 60}>
                <div>
                  <h2
                    className="font-playfair text-2xl font-bold text-[#0d1b2a] mb-6 flex items-center gap-3"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                  >
                    <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-[#c9a84c]/10 text-[#c9a84c] text-sm font-bold">
                      {i + 1}
                    </span>
                    {category}
                  </h2>
                  <Accordion items={items} />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="bg-[#0d1b2a] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2
              className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
            >
              Still Have Questions?
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Our support team responds within 24 business hours. WhatsApp for the fastest reply.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2.5 px-7 py-4 border-2 border-[#c9a84c] text-[#c9a84c] font-bold rounded-xl hover:bg-[#c9a84c] hover:text-[#0d1b2a] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Mail size={18} /> Email Support
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a] font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 btn-shimmer"
              >
                <MessageCircle size={18} /> WhatsApp Us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
