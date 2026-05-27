'use client';

import { useState } from 'react';
import { CheckCircle, Send, AlertCircle } from 'lucide-react';
import { COUNTRIES } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  investmentInterest: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  country: '',
  investmentInterest: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email.';
    if (!form.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData])
      setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setForm(initialForm);
      } else {
        setServerError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setServerError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3.5 border-2 rounded-xl text-[#0d1b2a] bg-white focus:outline-none transition-colors ${
      errors[field]
        ? 'border-red-400 focus:border-red-500'
        : 'border-[#f0ece3] focus:border-[#c9a84c]'
    }`;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8 bg-white rounded-2xl shadow-lg border border-[#f0ece3]">
        <div className="w-20 h-20 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mb-6 animate-gold-pulse">
          <CheckCircle className="text-[#c9a84c]" size={40} />
        </div>
        <h3
          className="font-playfair text-2xl font-bold text-[#0d1b2a] mb-3"
          style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
        >
          Message Sent!
        </h3>
        <p className="text-[#2e3d52] text-base max-w-sm leading-relaxed">
          Thank you for reaching out. A member of our team will respond within 24 business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-sm text-[#c9a84c] font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 border border-[#f0ece3] space-y-5"
    >
      <h3
        className="font-playfair text-2xl font-bold text-[#0d1b2a] mb-2"
        style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
      >
        Send Us a Message
      </h3>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#0d1b2a] mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Smith"
            className={inputClass('name')}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0d1b2a] mb-1.5">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={inputClass('email')}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-[#0d1b2a] mb-1.5">
          Phone Number <span className="text-[#2e3d52]/40 font-normal">(optional)</span>
        </label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 800 000 0000"
          className={inputClass('phone')}
        />
      </div>

      {/* Country + Investment Interest */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#0d1b2a] mb-1.5">Country</label>
          <select name="country" value={form.country} onChange={handleChange} className={inputClass('country')}>
            <option value="">Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0d1b2a] mb-1.5">
            Investment Interest
          </label>
          <select
            name="investmentInterest"
            value={form.investmentInterest}
            onChange={handleChange}
            className={inputClass('investmentInterest')}
          >
            <option value="">Select range</option>
            <option value="browsing">Just browsing</option>
            <option value="under5k">Under $5,000</option>
            <option value="5k-25k">$5,000 – $25,000</option>
            <option value="over25k">$25,000+</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-[#0d1b2a] mb-1.5">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="How can we help you today?"
          className={`${inputClass('message')} resize-none`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {serverError && (
        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">
          <AlertCircle size={16} /> {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#c9a84c] hover:bg-[#a8852e] disabled:opacity-60 text-[#0d1b2a] font-bold text-base rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,168,76,0.35)] btn-shimmer"
      >
        {submitting ? (
          <>
            <div className="w-4 h-4 border-2 border-[#0d1b2a]/30 border-t-[#0d1b2a] rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
