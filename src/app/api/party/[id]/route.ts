import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { addFood, getParty } from '@/service/sanity/party';

type Context = {
  params: { id: string };
};

export async function POST(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { name } = await req.json();

  return addFood(context.params.id, name).then((res) => NextResponse.json(res));
}

export async function GET(_: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getParty(context.params.id).then((res) => NextResponse.json(res));
}
