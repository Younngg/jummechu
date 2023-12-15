'use client';

import { Food } from '@/types/party';
import { useSession } from 'next-auth/react';
import VotingForm from './VotingForm';
import FoodCard from './FoodCard';

type Props = {
  foods: Food[];
};

const Voting = ({ foods }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const checkVoted = () => {
    const voters = foods.flatMap((food) => food.voters);
    return voters.find((voter) => voter.email === user?.email) ? true : false;
  };

  return (
    <div>
      <ul>
        {foods.map((food) => (
          <li key={food.id} className='flex gap-3'>
            <FoodCard disabled={checkVoted()} food={food} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voting;
