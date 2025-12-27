import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Status, success, error } from "@/lib/responses"

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id: Number(id) }, select: { id: true, email: true, name: true } });
  if (!user) return error(Status.NOT_FOUND, "User not found.")
  return success(user)
}

// export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await params;
//     return success(await prisma.user.delete({ where: { id: Number(id) }, select: { id: true, email: true, name: true } }))
//   } catch {
//     return error(Status.BAD_REQUEST, "Invalid user ID.")
//   }