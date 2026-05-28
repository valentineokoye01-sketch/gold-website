'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Gem, LayoutDashboard, TrendingUp, PlusCircle, ArrowUpCircle, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview',      href: '/dashboard' },
  { icon: TrendingUp,     label: 'My Investments', href: '/dashboard/investments' },
  { icon: PlusCircle,     label: 'Invest More',    href: '/dashboard/invest' },
  { icon: ArrowUpCircle,  label: 'Withdraw',       href: '/dashboard/withdraw' },
  { icon: User,           label: 'Profile',        href: '/dashboard/profile' },
];

interface Props { userName: string; }

export default function DashboardSidebar({ userName }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  const NavContent = () => (
    <>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 px-4 mb-8">
        <Gem className="text-[#c9a84c]" size={22} />
        <span className="font-bold text-base text-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          AurimGold
        </span>
      </Link>

      {/* User badge */}
      <div className="mx-4 mb-6 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-xl px-4 py-3">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">Logged in as</p>
        <p className="text-white font-semibold text-sm truncate">{userName}</p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-[#c9a84c] text-[#0d1b2a]'
                  : 'text-white/60 hover:text-white hover:bg-[#c9a84c]/10'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 mt-6 mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0d1b2a] border-r border-[#c9a84c]/10 min-h-screen fixed left-0 top-0 pt-6 z-40">
        <NavContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0d1b2a] border-b border-[#c9a84c]/20 px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Gem className="text-[#c9a84c]" size={20} />
          <span className="font-bold text-white text-base" style={{ fontFamily: 'var(--font-playfair), serif' }}>AurimGold</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/70 hover:text-white">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 left-0 w-72 h-full bg-[#0d1b2a] border-r border-[#c9a84c]/20 flex flex-col pt-6">
            <NavContent />
          </div>
        </div>
      )}
    </>
  );
}
