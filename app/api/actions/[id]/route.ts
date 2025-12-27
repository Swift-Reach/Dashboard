import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { success } from "@/lib/responses"

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return success(await prisma.action.findUnique({ where: { id: Number(id) }, include: { lead: true } }))
}
