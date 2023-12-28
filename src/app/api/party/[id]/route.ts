import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getParty, deleteParty, updateParty } from '@/service/sanity/party';
import authOptions from '../../auth/[...nextauth]/options';

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

  const party = await req.json();

  return updateParty(context.params.id, party).then((res) =>
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
