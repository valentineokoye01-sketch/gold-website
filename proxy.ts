import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';

export async function proxy(req: NextRequest) {
  return updateSession(req);
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
