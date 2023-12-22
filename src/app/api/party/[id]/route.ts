import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import {
  updatePartyClosedState,
  getParty,
  deleteParty,
} from '@/service/sanity/party';

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getParty(context.params.id).then((res) => NextResponse.json(res));
}

export async function PUT(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { isClosed } = await req.json();

  return updatePartyClosedState(context.params.id, isClosed).then((res) =>
    NextResponse.json(res)
  );
}

export async function DELETE(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return deleteParty(context.params.id).then((res) => NextResponse.json(res));
}
