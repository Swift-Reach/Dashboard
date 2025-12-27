import { success } from '@/lib/responses';
import { NextRequest } from 'next/server';

export async function POST(request:NextRequest) {
  const res = success()
  res.cookies.delete("token")
  return res;
}