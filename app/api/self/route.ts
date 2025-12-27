import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { success } from '@/lib/responses';

export async function GET(request:NextRequest) {
  const user = await getCurrentUser(request.cookies)
  return success(await prisma.user.findUnique({ where: { id: user!.id }, select: { id: true, email: true, name: true } }))
}