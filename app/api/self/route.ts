import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';
import { success } from '@/lib/responses';

export async function GET(request:NextRequest) {
  const user = await getCurrentUser(request.cookies)
  const { data } = await supabase
    .from('users')
    .select('id, email, name')
    .eq('id', user!.id)
    .maybeSingle();
  return success(data)
}