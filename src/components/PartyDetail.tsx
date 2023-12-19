'use client';

import Voting from './Voting';
import VotingForm from './VotingForm';
import usePartyDetail from '@/hooks/party';

type Props = {
  partyId: string;
};

const PartyDetail = ({ partyId }: Props) => {
  const { party } = usePartyDetail(partyId);

  if (!party) {
    return <></>;
  }

  return (
    <section className='px-3 py-6'>
      <div>
        <h2 className='text-2xl font-bold text-center'>{party.name}</h2>
      </div>
      <div className='mt-8 flex flex-col gap-3'>
        <Voting party={party} />
        <VotingForm partyId={partyId} />
      </div>
    </section>
  );
};

export default PartyDetail;
