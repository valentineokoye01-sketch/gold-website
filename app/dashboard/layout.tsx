import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase.from('profiles').select('name').eq('id', user.id).single();
  if (!profile) redirect('/auth/login');

  return (
    <div className="min-h-screen bg-[#0a1628]">
      <DashboardSidebar userName={profile.name} />
      {/* Content offset for sidebar */}
      <div className="lg:pl-64">
        <div className="pt-14 lg:pt-10 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
