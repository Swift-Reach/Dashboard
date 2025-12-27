import { supabase } from '@/lib/supabase';
import { error, success } from '@/lib/responses';

export const GET = async () => {
  const { data, error: dbError } = await supabase.from('actions').select('*');
  if (dbError) return error();
  return success(data);
}