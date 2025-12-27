import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { success, error, Status } from "@/lib/responses"

export const GET = async () => {
  const { data, error: dbError } = await supabase
    .from('users')
    .select('id, email, name');
  if (dbError) return error();
  return success(data);
};

export async function POST(request: NextRequest) {

  const body = await request.json()

  const email = body.email;
  if (!email) return error(Status.BAD_REQUEST, "You need to provide an email.")

  const name = body.name;
  if (!name) return error(Status.BAD_REQUEST, "You need to provide a name.")

  const password = body.password;
  if (!password) return error(Status.BAD_REQUEST, "You need to provide a password.")

  const { data, error: dbError } = await supabase
    .from('users')
    .insert({ email, name, password })
    .select('id, email, name')
    .single();

  if (dbError) return error(Status.BAD_REQUEST, "Failed to create user.");
  return success(data, Status.CREATED)

}