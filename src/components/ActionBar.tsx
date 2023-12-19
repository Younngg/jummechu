import { Food } from '@/types/party';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type Props = {
  food: Food;
  partyId: string;
  disabled: boolean;
  canBeDeleted: boolean;
};

const ActionBar = ({ food, partyId, disabled, canBeDeleted }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [isVoted, setIsVoted] = useState(false);

  const checkVotedFood = () => {
    if (user) {
      const filtered = food.voters.find((voter) => voter.id === user.id);

      return filtered !== undefined;
    }

    return false;
  };
  console.log(checkVotedFood());

  const onClickVote = (foodId: string) => {
    setIsVoted(true);

    fetch('/api/vote', {
      method: 'PUT',
      body: JSON.stringify({ foodId, vote: true }),
    }).then((res) => res.json());
  };

  const onClickDelete = (foodId: string) => {
    fetch('/api/party', {
      method: 'DELETE',
      body: JSON.stringify({ foodId, partyId }),
    });
  };
  return (
    <div className='flex items-center gap-5'>
      {food.voters && <p>{food.voters.length}</p>}
      <button
        className={`bg-sky-100 px-2 py-1 rounded-md disabled:bg-gray-300`}
        onClick={() => onClickVote(food.id)}
        disabled={disabled}
      >
        투표
      </button>
      {canBeDeleted && (
        <button
          className={`bg-red-200 px-2 py-1 rounded-md disabled:bg-gray-300`}
          onClick={() => onClickDelete(food.id)}
        >
          삭제
        </button>
      )}
    </div>
  );
};

export default ActionBar;
