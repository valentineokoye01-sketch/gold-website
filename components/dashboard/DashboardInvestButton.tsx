'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import NewInvestmentModal from './NewInvestmentModal';

interface Props { label?: string; className?: string; defaultPlan?: string; }

export default function DashboardInvestButton({ label = 'New Investment', className = '', defaultPlan }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8852e] text-[#0d1b2a] font-bold px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-sm btn-shimmer ${className}`}
      >
        <PlusCircle size={16} /> {label}
      </button>
      {open && <NewInvestmentModal onClose={() => setOpen(false)} defaultPlan={defaultPlan} />}
    </>
  );
}
