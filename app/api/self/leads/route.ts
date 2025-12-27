import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { error, success } from "@/lib/responses"
import { getCurrentUser } from '@/lib/auth';

export async function GET(request:NextRequest) {
  const user = await getCurrentUser(request.cookies)
  const { data, error: dbError } = await supabase
    .from('leads')
    .select('*')
    .eq('owner_id', user!.id);
  if (dbError) return error();
  return success(data);
}