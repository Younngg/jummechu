import { Food } from '@/types/party';
import { useSession } from 'next-auth/react';
import ActionBar from './ActionBar';
import ToggleButton from './ui/ToggleButton';
import { useState } from 'react';
import UpIcon from './ui/icons/UpIcon';
import DownIcon from './ui/icons/DownIcon';
import AccordionPortal from './ui/AccordionPortal';
import VoterList from './VoterList';

type Props = {
  food: Food;
  disabled: boolean;
  canBeDeleted: boolean;
  partyId: string;
  isClosed: boolean;
};

const FoodCard = ({
  food,
  disabled,
  canBeDeleted,
  partyId,
  isClosed,
}: Props) => {
  const [isOpenVoterList, setIsOpenVoterList] = useState(false);

  return (
    <div className='flex items-center justify-between border w-96 px-4 py-3 rounded-md'>
      <p>{food.name}</p>
      <div className='flex items-center gap-3'>
        <div className='flex'>
          <p>{food.voters.length}</p>
          <ToggleButton
            toggled={isOpenVoterList}
            onToggle={setIsOpenVoterList}
            onText={<UpIcon />}
            offText={<DownIcon />}
          />
        </div>
        {isClosed === false && (
          <ActionBar
            food={food}
            partyId={partyId}
            disabled={disabled}
            canBeDeleted={canBeDeleted}
          />
        )}
      </div>
      {isOpenVoterList && (
        <AccordionPortal id={food.id}>
          <VoterList voters={food.voters} />
        </AccordionPortal>
      )}
    </div>
  );
};

export default FoodCard;
