import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { cancleVoteForFood, voteForFood } from '@/service/sanity/party';
import authOptions from '../auth/[...nextauth]/options';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { foodId, vote } = await req.json();

  const request = vote ? voteForFood : cancleVoteForFood;

  return request(foodId, user.id)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
