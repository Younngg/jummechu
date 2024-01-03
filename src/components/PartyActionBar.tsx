import Link from 'next/link';
import DefaultButton from './ui/DefaultButton';
import { PartyDetail } from '@/types/party';
import { FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useUpdateParty } from '@/hooks/party';
import VotingForm from './VotingForm';

const BUTTON_STYLE = 'px-2 py-1 rounded-md bg-gray-200';

type Props = {
  party: PartyDetail;
  isPresident: boolean;
  handleSubmit: (e: FormEvent, name: string) => void;
  openModal: () => void;
};

const PartyActionBar = ({
  party,
  isPresident,
  handleSubmit,
  openModal,
}: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const { mutate: updateParty } = useUpdateParty();

  const onClickVotingCloses = () =>
    updateParty({ partyId: party.id, updated: { isClosed: true } });

  const makeVisibleVotingForm = () => {
    if (!party.isClosed && user) {
      if (isPresident || (!isPresident && party.canBeAdded))
        return <VotingForm handleSubmit={handleSubmit} />;
    }
  };

  return (
    <>
      {makeVisibleVotingForm()}
      <div className='flex justify-center gap-2'>
        {isPresident && !party.isClosed ? (
          <DefaultButton
            color='gray'
            onClick={onClickVotingCloses}
            text='투표 마감'
          />
        ) : undefined}
        {isPresident && (
          <>
            <Link className={BUTTON_STYLE} href={`/party/update/${party.id}`}>
              수정
            </Link>
            <DefaultButton color='gray' onClick={openModal} text='삭제' />
          </>
        )}
      </div>
    </>
  );
};

export default PartyActionBar;
