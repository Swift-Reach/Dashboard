import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PrismaClientValidationError } from '@prisma/client/runtime/react-native.js';
import { error, Status, success } from '@/lib/responses';

export const GET = async () => success(await prisma.lead.findMany())

export async function POST (request:NextRequest) {
  try {
    const body = await request.json();
    return success(await prisma.lead.create({ data: { ...body }, select: { id: true }}), Status.CREATED)
  } catch (e) {
    if (e instanceof PrismaClientValidationError) return error(Status.BAD_REQUEST, "Invalid lead data");
    console.error(e);
    return error()
  }
}