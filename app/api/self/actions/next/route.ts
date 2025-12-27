import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { error, Status, success } from '@/lib/responses';

export async function GET(request:NextRequest) {

  const user = await getCurrentUser(request.cookies)
  if (!user) return error(Status.UNAUTHORIZED)

  const lead = await prisma.lead.findFirst({ where: { ownerId: null } })
  if (!lead) return error(Status.SERVICE_UNAVALIBLE, "No unassigned leads available.")

  await prisma.lead.update({ where: { id: lead.id }, data: { ownerId: user.id } })
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return success(await prisma.action.create({ data: { leadId: lead.id, type: 'Call', due: today } }))

}