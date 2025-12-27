import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { error, success } from "@/lib/responses"

export async function GET (_:NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error: dbError } = await supabase
    .from('actions')
    .select('*')
    .eq('lead_id', Number(id));
  if (dbError) return error();
  return success(data);
}
