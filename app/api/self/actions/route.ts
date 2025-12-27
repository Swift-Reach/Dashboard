import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { error, Status, success } from '@/lib/responses';

export async function GET(request:NextRequest) {

    const user = await getCurrentUser(request.cookies)
    if (!user) return error(Status.UNAUTHORIZED)

    const today = new Date()
    today.setHours(23, 59, 59, 999)

    return success(await prisma.action.findMany({ where: { lead: { ownerId: user.id }, done: false, due: { lte: today } }, include: { lead: true } }))

}