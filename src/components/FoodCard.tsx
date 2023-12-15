import { Food } from '@/types/party';
import { useSession } from 'next-auth/react';

type Props = {
  food: Food;
  disabled: boolean;
};

const FoodCard = ({ food, disabled }: Props) => {
  const onClickVoteButton = (foodId: string) => {
    fetch('/api/vote', {
      method: 'PUT',
      body: JSON.stringify({ foodId }),
    }).then((res) => res.json());
  };

  return (
    <div
      className={`flex items-center justify-between border w-full px-4 py-3 rounded-md `}
    >
      <p>{food.name}</p>
      <div className='flex items-center gap-5'>
        {food.voters && <p>{food.voters.length}</p>}
        <button
          className={`bg-sky-100 px-2 py-1 rounded-md disabled:bg-gray-300`}
          onClick={() => onClickVoteButton(food.id)}
          disabled={disabled}
        >
          투표
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
