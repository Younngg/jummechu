'use client';

import { Food, PartyDetail } from '@/types/party';
import { useSession } from 'next-auth/react';
import FoodCard from './FoodCard';
import VoterList from './VoterList';
import { User } from '@/types/user';

type Props = {
  party: PartyDetail;
  canBeDeleted: boolean;
};

const Voting = ({ party, canBeDeleted }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const checkVoted = () => {
    const voters = party.foods.flatMap((food) => food.voters);
    return voters.find((voter) => voter.email === user?.email) ? true : false;
  };

  const mostVotedFood = party.foods.reduce(
    (prev, cur) => {
      return cur.voters.length > prev.voters.length ? cur : prev;
    },
    { voters: [] } as unknown as Food
  );

  return (
    <div>
      <ul className='w-full flex flex-col gap-3 items-center'>
        {party.foods.map((food) => (
          <li key={food.id}>
            <FoodCard
              party={party}
              disabled={checkVoted()}
              food={food}
              canBeDeleted={canBeDeleted}
              mostVotedFood={mostVotedFood}
            />
            <div id={`accordion${food.id}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voting;
