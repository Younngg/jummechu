'use client';

import { Food, PartyDetail } from '@/types/party';
import { useSession } from 'next-auth/react';
import FoodCard from './FoodCard';

type Props = {
  party: PartyDetail;
  canBeDeleted: boolean;
  mostVotedFood: Food;
};

const Voting = ({ party, canBeDeleted, mostVotedFood }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const checkVoted = () => {
    const voters = party.foods.flatMap((food) => food.voters);
    return voters.find((voter) => voter.email === user?.email) ? true : false;
  };

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
