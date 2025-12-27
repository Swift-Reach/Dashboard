import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Status, success, error } from "@/lib/responses"

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: user, error: dbError } = await supabase
    .from('users')
    .select('id, email, name')
    .eq('id', Number(id))
    .maybeSingle();
  if (dbError || !user) return error(Status.NOT_FOUND, "User not found.")
  return success(user)
}

// export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await params;
//     return success(await prisma.user.delete({ where: { id: Number(id) }, select: { id: true, email: true, name: true } }))
//   } catch {
//     return error(Status.BAD_REQUEST, "Invalid user ID.")
//   }