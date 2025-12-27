import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { error, Status, success } from '@/lib/responses';

export const GET = async () => {
  const { data, error: dbError } = await supabase.from('leads').select('*');
  if (dbError) return error();
  return success(data);
}

export async function POST (request:NextRequest) {
  try {
    const body = await request.json();
    const { data, error: dbError } = await supabase
      .from('leads')
      .insert(body)
      .select('id')
      .single();
    if (dbError) return error(Status.BAD_REQUEST, "Invalid lead data");
    return success(data, Status.CREATED)
  } catch (e) {
    console.error(e);
    return error()
  }
}