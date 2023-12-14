'use client';

import { Food } from '@/types/party';
import { useSession } from 'next-auth/react';
import VotingForm from './VotingForm';

type Props = {
  foods: Food[];
  partyId:string
};

const Voting = ({ foods,partyId }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const onClickVoteButton = (foodId: string) => {
    fetch('/api/vote', {
      method: 'PUT',
      body: JSON.stringify({ foodId }),
    }).then((res) => res.json());
  };

  const checkVoted = () => {
    const voters = foods.flatMap((food) => food.voters);
    return voters.find((voter) => voter.email === user?.email) ? true : false;
  };

  return (
    <div>
      <ul>
        {foods.map((food) => (
          <li key={food.id} className='flex gap-3'>
            <p>{food.name}</p>
            {food.voters && <p>{food.voters.length}</p>}
            <button
              onClick={() => onClickVoteButton(food.id)}
              disabled={checkVoted()}
            >
              투표
            </button>
          </li>
        ))}
      </ul>
      <VotingForm partyId={partyId}/>
    </div>
  );
};

export default Voting;
