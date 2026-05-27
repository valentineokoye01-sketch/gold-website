'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  dark?: boolean;
}

function AccordionRow({
  item,
  dark,
  index,
}: {
  item: AccordionItem;
  dark: boolean;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b last:border-b-0 ${
        dark ? 'border-[#c9a84c]/15' : 'border-[#0d1b2a]/10'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between py-5 text-left gap-4 focus:outline-none group ${
          dark ? 'text-white' : 'text-[#0d1b2a]'
        }`}
        aria-expanded={open}
      >
        <span className="font-semibold text-base md:text-lg leading-snug pr-4">
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
            open
              ? 'bg-[#c9a84c] border-[#c9a84c] rotate-180'
              : dark
              ? 'border-[#c9a84c]/40 text-[#c9a84c]'
              : 'border-[#0d1b2a]/30 text-[#0d1b2a] group-hover:border-[#c9a84c] group-hover:text-[#c9a84c]'
          }`}
        >
          <ChevronDown
            size={16}
            className={open ? 'text-[#0d1b2a]' : ''}
          />
        </span>
      </button>
      <div
        className="accordion-content"
        style={{ maxHeight: open ? '600px' : '0' }}
      >
        <p
          className={`pb-5 text-base leading-relaxed ${
            dark ? 'text-[#c9a84c]/70' : 'text-[#2e3d52]'
          }`}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function Accordion({ items, dark = false }: AccordionProps) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${
        dark ? 'bg-[#162336] border border-[#c9a84c]/20' : 'bg-white shadow-md'
      }`}
    >
      <div className="px-6 divide-y divide-transparent">
        {items.map((item, i) => (
          <AccordionRow key={i} item={item} dark={dark} index={i} />
        ))}
      </div>
    </div>
  );
}
