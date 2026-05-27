import type { Metadata } from 'next';
import { Mail, MessageCircle, Send, Clock, MapPin } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';
import ContactForm from '@/components/contact/ContactForm';
import { CONTACT_EMAIL, CONTACT_WHATSAPP, CONTACT_TELEGRAM, OFFICES, SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with AuraGold Investments. Email, WhatsApp, or Telegram — our team responds within 24 hours on business days.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact AuraGold Investments',
    description: 'We\'re here to help. Reach our support team via email, WhatsApp, or Telegram.',
  },
};

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    note: 'Response within 24–48 hours',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: CONTACT_WHATSAPP,
    href: SOCIAL_LINKS.whatsapp,
    note: 'Fastest response — 2–4 hours (business hours)',
    external: true,
  },
  {
    icon: Send,
    title: 'Telegram',
    value: CONTACT_TELEGRAM,
    href: SOCIAL_LINKS.telegram,
    note: 'Business hours: Mon–Fri 9am–6pm GMT',
    external: true,
  },
];

export default function ContactPage() {
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
              We&apos;re Here{' '}
              <span className="text-[#c9a84c]">to Help</span>
            </h1>
            <p className="text-white/60 text-xl">
              Have a question about investing, your account, or a withdrawal? Our global team is
              ready to assist.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Method Cards */}
      <section className="bg-[#faf8f4] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map(({ icon: Icon, title, value, href, note, external }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="bg-white rounded-2xl p-6 shadow-md border border-[#f0ece3] hover:-translate-y-1 hover:shadow-xl hover:border-[#c9a84c]/30 transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#c9a84c]/10 group-hover:bg-[#c9a84c]/20 transition-colors mb-4">
                    <Icon className="text-[#c9a84c]" size={24} />
                  </div>
                  <h3 className="font-bold text-[#0d1b2a] text-lg mb-1">{title}</h3>
                  <p className="text-[#c9a84c] font-semibold text-sm mb-1">{value}</p>
                  <p className="text-[#2e3d52]/60 text-xs">{note}</p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="bg-[#faf8f4] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeIn direction="left">
                <ContactForm />
              </FadeIn>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn direction="right">
                {/* Response Notice */}
                <div className="bg-[#0d1b2a] rounded-2xl p-6 border border-[#c9a84c]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="text-[#c9a84c]" size={22} />
                    <h3 className="text-white font-bold text-base">Response Times</h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">
                    We respond to all email enquiries within 24 hours on business days (Mon–Fri,
                    9am–6pm GMT). For urgent matters, WhatsApp and Telegram offer 2–4 hour response
                    times during business hours.
                  </p>
                </div>
              </FadeIn>

              {/* Office Cards */}
              {OFFICES.map((office, i) => (
                <FadeIn key={office.city} direction="right" delay={i * 80}>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0ece3]">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-[#c9a84c] mt-0.5 flex-shrink-0" size={18} />
                      <div>
                        <h4 className="font-bold text-[#0d1b2a] text-base mb-1">{office.city}</h4>
                        <p className="text-[#2e3d52] text-sm leading-relaxed mb-1">{office.address}</p>
                        <p className="text-[#2e3d52]/50 text-xs">{office.hours}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}

              {/* Map Placeholder */}
              <FadeIn direction="right" delay={250}>
                <div className="bg-[#0d1b2a] rounded-2xl border-2 border-[#c9a84c]/20 aspect-video flex flex-col items-center justify-center gap-3 text-center p-6">
                  <MapPin className="text-[#c9a84c]/40" size={36} />
                  <p className="text-white/40 text-sm font-semibold">Interactive map coming soon</p>
                  <p className="text-white/20 text-xs">London · Dubai · Singapore</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
