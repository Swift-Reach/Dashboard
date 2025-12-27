import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';
import { error, Status, success } from '@/lib/responses';

export async function GET(request:NextRequest) {

  const user = await getCurrentUser(request.cookies)
  if (!user) return error(Status.UNAUTHORIZED)

  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .is('owner_id', null)
    .limit(1)
    .maybeSingle();

  if (leadError || !lead) return error(Status.SERVICE_UNAVALIBLE, "No unassigned leads available.")

  await supabase
    .from('leads')
    .update({ owner_id: user.id })
    .eq('id', lead.id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: action, error: actionError } = await supabase
    .from('actions')
    .insert({ lead_id: lead.id, type: 'Call', due: today.toISOString() })
    .select('*')
    .single();

  if (actionError) return error();
  return success(action);

}