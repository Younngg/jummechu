'use client';

import { useSession } from 'next-auth/react';
import Voting from './Voting';
import VotingForm from './VotingForm';
import usePartyDetail from '@/hooks/party';

type Props = {
  partyId: string;
};

const PartyDetail = ({ partyId }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  const { party, updatePartyClosed } = usePartyDetail(partyId);

  if (!party) {
    return <></>;
  }

  const checkPresident = () => {
    const { isClosed, createdBy } = party;

    if (user) {
      if (isClosed === false && user.id === createdBy.id) return true;
    }

    return false;
  };
  console.log(party);

  const onClickVotingCloses = () => updatePartyClosed({ isClosed: true });

  return (
    <section className='px-3 py-6'>
      <div>
        <h2 className='text-2xl font-bold text-center'>{party.name}</h2>
      </div>
      <div className='mt-8 flex flex-col gap-3'>
        <Voting party={party} canBeDeleted={checkPresident()} />
        <VotingForm partyId={partyId} />
        {checkPresident() && party.isClosed === false ? (
          <div className='flex justify-center'>
            <button
              className='px-2 py-1 rounded-md bg-gray-200'
              onClick={onClickVotingCloses}
            >
              투표 마감
            </button>
          </div>
        ) : undefined}
      </div>
    </section>
  );
};

export default PartyDetail;
