import { Food, PartyDetail } from '@/types/party';
import VotingActionBar from './VotingActionBar';
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
  party: PartyDetail;
  mostVotedFood: Food;
};

const FoodCard = ({
  party: { isClosed, id: partyId, isAnonymous },
  food,
  disabled,
  canBeDeleted,
  mostVotedFood,
}: Props) => {
  const [isOpenVoterList, setIsOpenVoterList] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-between border w-96 px-4 py-3 rounded-md ${
        isClosed && mostVotedFood.id === food.id && 'bg-yellow-50'
      }`}
    >
      <p>
        {food.name}
        <span>{isClosed && mostVotedFood.id === food.id && '🥇'}</span>
      </p>
      <div className='flex items-center gap-3'>
        <div className='flex'>
          <p>{food.voters.length}</p>
          {!isAnonymous && (
            <ToggleButton
              toggled={isOpenVoterList}
              onToggle={setIsOpenVoterList}
              onText={<UpIcon />}
              offText={<DownIcon />}
            />
          )}
        </div>
        {!isClosed && (
          <VotingActionBar
            food={food}
            partyId={partyId}
            disabled={disabled}
            canBeDeleted={canBeDeleted}
          />
        )}
      </div>
      {!isAnonymous && isOpenVoterList && (
        <AccordionPortal id={food.id}>
          <VoterList voters={food.voters} />
        </AccordionPortal>
      )}
    </div>
  );
};

export default FoodCard;
