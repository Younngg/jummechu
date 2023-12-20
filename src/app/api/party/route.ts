import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import {
  createParty,
  deleteFood,
  getPartiesOfUserId,
} from '@/service/sanity/party';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getPartiesOfUserId(user.id).then((res) => NextResponse.json(res));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { name } = await req.json();

  return createParty(name, user.id).then((res) => NextResponse.json(res));
}
