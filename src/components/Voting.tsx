'use client';

import { Food } from '@/types/party';

type Props = {
  foods: Food[];
};

const Voting = ({ foods }: Props) => {
  const onClickVoteButton = (foodId: string) => {
    fetch('/api/vote', {
      method: 'PUT',
      body: JSON.stringify({ foodId }),
    }).then(res => res.json());
  };

  return (
    <div>
      <ul>
        {foods.map((food) => (
          <li key={food.id} className='flex gap-3'>
            <p>{food.name}</p>
            {food.voters && <p>{food.voters.length}</p>}
            <button onClick={()=>onClickVoteButton(food.id)}>투표</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voting;
