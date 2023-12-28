import { Food } from '@/types/party';
import { useSession } from 'next-auth/react';
import ToggleButton from './ui/ToggleButton';
import DefaultButton from './ui/DefaultButton';
import { useDeleteFood, useSetVote } from '@/hooks/vote';

type Props = {
  food: Food;
  partyId: string;
  disabled: boolean;
  canBeDeleted: boolean;
};

const ActionBar = ({ food, partyId, disabled, canBeDeleted }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const { mutate: deleteFood } = useDeleteFood(partyId);
  const { mutate: setVote } = useSetVote(partyId);

  const voted = user
    ? food.voters.some((voter) => voter.id === user.id)
    : false;

  const handleVote = (vote: boolean) => setVote({ foodId: food.id, vote });

  const onClickDelete = () => deleteFood({ foodId: food.id });

  return (
    <div className='flex items-center gap-3'>
      <ToggleButton
        toggled={voted}
        onToggle={handleVote}
        onText='취소'
        offText='투표'
        disabled={disabled}
        style={`px-2 py-1 rounded-md disabled:bg-gray-300 ${
          voted ? 'bg-red-200' : 'bg-sky-100'
        }`}
      />
      {canBeDeleted && (
        <DefaultButton color='red' onClick={onClickDelete} text='삭제' />
      )}
    </div>
  );
};

export default ActionBar;
