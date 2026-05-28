import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function PATCH(req: NextRequest) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, phone, country } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

  const updated = db.users.update(session.userId, {
    name: name.trim(),
    phone: phone?.trim() ?? '',
    country: country?.trim() ?? '',
  });

  if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ ok: true, user: { name: updated.name, phone: updated.phone, country: updated.country } });
}
