'use client';

import { Food } from '@/types/party';

type Props = {
  foods: Food[];
};

const Voting = ({ foods }: Props) => {
  console.log(foods);
  return (
    <div>
      <ul>
        {foods.map((food) => (
          <li key={food.id} className='flex gap-3'>
            <p>{food.name}</p>
            <p>{food.voters.length}</p>
            <button> 투표 </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voting;
