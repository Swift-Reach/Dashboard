import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { success, error, Status } from "@/lib/responses"

export const GET = async () => success(await prisma.user.findMany({ select: { id: true, email: true, name: true } }));

export async function POST(request: NextRequest) {

  const body = await request.json()

  const email = body.email;
  if (!email) return error(Status.BAD_REQUEST, "You need to provide an email.")

  const name = body.name;
  if (!name) return error(Status.BAD_REQUEST, "You need to provide a name.")

  const password = body.password;
  if (!password) return error(Status.BAD_REQUEST, "You need to provide a password.")

  return success(await prisma.user.create({ data: { email: email, name: name, password: password }, select: { id: true, email: true, name: true } }), Status.CREATED)

}