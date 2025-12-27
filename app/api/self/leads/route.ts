import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { success } from "@/lib/responses"
import { getCurrentUser } from '@/lib/auth';

export async function GET(request:NextRequest) {
  const user = await getCurrentUser(request.cookies)
  return success(await prisma.lead.findMany({ where: { ownerId: user!.id } }))
}