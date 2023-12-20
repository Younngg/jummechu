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

const Voting = ({
  party: { id, foods, createdBy, isClosed },
  canBeDeleted,
}: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const checkVoted = () => {
    const voters = foods.flatMap((food) => food.voters);
    return voters.find((voter) => voter.email === user?.email) ? true : false;
  };

  const mostVotedFood = foods.reduce(
    (prev, cur) => {
      return cur.voters.length > prev.voters.length ? cur : prev;
    },
    { voters: [] } as unknown as Food
  );

  return (
    <div>
      <ul className='w-full flex flex-col gap-3 items-center'>
        {foods.map((food) => (
          <li key={food.id}>
            <FoodCard
              isClosed={isClosed}
              disabled={checkVoted()}
              food={food}
              partyId={id}
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
