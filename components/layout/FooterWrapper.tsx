'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <div className="lg:pl-64">
        <Footer />
      </div>
    );
  }

  return <Footer />;
}
