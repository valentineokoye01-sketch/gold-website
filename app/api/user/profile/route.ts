import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, phone, country } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

  const { data: updated, error } = await supabase
    .from('profiles')
    .update({
      name: name.trim(),
      phone: phone?.trim() ?? '',
      country: country?.trim() ?? '',
    })
    .eq('id', user.id)
    .select('name, phone, country')
    .single();

  if (error || !updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ ok: true, user: updated });
}
