import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, email, country, phone, kyc_status, referral_code, created_at')
    .eq('id', user.id)
    .single();

  if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({
    id: user.id,
    name: profile.name,
    email: profile.email,
    country: profile.country,
    phone: profile.phone,
    kycStatus: profile.kyc_status,
    referralCode: profile.referral_code,
    createdAt: profile.created_at,
  });
}
