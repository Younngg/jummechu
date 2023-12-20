import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { addFood, deleteFood } from '@/service/sanity/party';

type Context = {
  params: { id: string };
};

export async function DELETE(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { foodId } = await req.json();

  return deleteFood(foodId, context.params.id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}

export async function POST(req: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { name } = await req.json();

  return addFood(context.params.id, name).then((res) => NextResponse.json(res));
}
