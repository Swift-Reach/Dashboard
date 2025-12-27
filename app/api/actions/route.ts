import { prisma } from '@/lib/prisma';
import { success } from '@/lib/responses';

export const GET = async () => success(await prisma.action.findMany())