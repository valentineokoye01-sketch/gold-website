import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionUser();
  if (!session) redirect('/auth/login');

  const user = db.users.findById(session.userId);
  if (!user) redirect('/auth/login');

  return (
    <div className="min-h-screen bg-[#0a1628]">
      <DashboardSidebar userName={user.name} />
      {/* Content offset for sidebar */}
      <div className="lg:pl-64">
        <div className="pt-14 lg:pt-10 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
