'use client';

import { useSession } from 'next-auth/react';
import Voting from './Voting';
import VotingForm from './VotingForm';
import usePartyDetail from '@/hooks/party';
import useParties from '@/hooks/parties';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

type Props = {
  partyId: string;
};

const PartyDetail = ({ partyId }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  const { deleteParty, isSuccessDelete } = useParties();
  const { party, updateParty } = usePartyDetail(partyId);

  useEffect(() => {
    if (isSuccessDelete) redirect('/');
  }, [isSuccessDelete]);

  if (!party) {
    return <></>;
  }

  const checkPresident = () => {
    const { createdBy } = party;

    if (user) {
      if (user.id === createdBy.id) return true;
    }

    return false;
  };

  const onClickVotingCloses = () => updateParty({ isClosed: true });

  const onClickDeleteParty = () => deleteParty(party.id);

  const makeVisibleVotingForm = () => {
    if (!party.isClosed) {
      if (checkPresident() || (!checkPresident && party.canBeAdded))
        return <VotingForm partyId={partyId} />;
    }
  };

  console.log(checkPresident());

  return (
    <section className='px-3 py-6'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>{party.name}</h2>
        {party.isAnonymous && (
          <p className='text-sm text-gray-600 mt-1'>익명 투표</p>
        )}
      </div>
      <div className='mt-8 flex flex-col gap-3'>
        <Voting party={party} canBeDeleted={checkPresident()} />
        {makeVisibleVotingForm()}
        <div className='flex justify-center gap-2'>
          {checkPresident() && !party.isClosed ? (
            <button
              className='px-2 py-1 rounded-md bg-gray-200'
              onClick={onClickVotingCloses}
            >
              투표 마감
            </button>
          ) : undefined}
          {checkPresident() && (
            <button
              className='px-2 py-1 rounded-md bg-gray-200'
              onClick={onClickDeleteParty}
            >
              삭제
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartyDetail;
