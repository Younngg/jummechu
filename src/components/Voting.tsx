'use client';

import { PartyDetail } from '@/types/party';
import { useSession } from 'next-auth/react';
import FoodCard from './FoodCard';
import VoterList from './VoterList';

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
            />
            <div id={`accordion${food.id}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voting;
