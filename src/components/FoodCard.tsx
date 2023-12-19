import { Food } from '@/types/party';
import { useSession } from 'next-auth/react';
import ActionBar from './ActionBar';

type Props = {
  food: Food;
  disabled: boolean;
  canBeDeleted: boolean;
  partyId: string;
};

const FoodCard = ({ food, disabled, canBeDeleted, partyId }: Props) => {
  return (
    <div
      className={`flex items-center justify-between border w-96 px-4 py-3 rounded-md `}
    >
      <p>{food.name}</p>
      <ActionBar
        food={food}
        partyId={partyId}
        disabled={disabled}
        canBeDeleted={canBeDeleted}
      />
    </div>
  );
};

export default FoodCard;
