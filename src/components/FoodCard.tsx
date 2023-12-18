import { Food } from '@/types/party';
import { useSession } from 'next-auth/react';

type Props = {
  food: Food;
  disabled: boolean;
  canBeDeleted: boolean;
  partyId: string;
};

const FoodCard = ({ food, disabled, canBeDeleted, partyId }: Props) => {
  const onClickVoteButton = (foodId: string) => {
    fetch('/api/vote', {
      method: 'PUT',
      body: JSON.stringify({ foodId }),
    }).then((res) => res.json());
  };

  const onClickDeleteButton = (foodId: string) => {
    fetch('/api/party', {
      method: 'DELETE',
      body: JSON.stringify({ foodId, partyId }),
    })
  };

  return (
    <div
      className={`flex items-center justify-between border w-96 px-4 py-3 rounded-md `}
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
        {canBeDeleted && (
          <button
            className={`bg-red-200 px-2 py-1 rounded-md disabled:bg-gray-300`}
            onClick={() => onClickDeleteButton(food.id)}
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
