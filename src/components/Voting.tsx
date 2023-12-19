'use client';

import { Food, PartyDetail } from '@/types/party';
import { useSession } from 'next-auth/react';
import VotingForm from './VotingForm';
import FoodCard from './FoodCard';

type Props = {
  party: PartyDetail;
};

const Voting = ({ party: { id, foods, createdBy, isClosed } }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const checkVoted = () => {
    const voters = foods.flatMap((food) => food.voters);
    return voters.find((voter) => voter.email === user?.email) ? true : false;
  };

  const checkCanBeDeleted = () => {
    if (user) {
      if (!isClosed && user.id === createdBy.id) return true;
    }

    return false;
  };

  return (
    <div>
      <ul className='w-full flex flex-col gap-3 items-center'>
        {foods.map((food) => (
          <li key={food.id}>
            <FoodCard
              disabled={checkVoted()}
              food={food}
              partyId={id}
              canBeDeleted={checkCanBeDeleted()}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voting;
