'use client';

import { PartyDetail } from '@/types/party';
import { useEffect, useState } from 'react';
import Voting from './Voting';
import VotingForm from './VotingForm';

type Props = {
  partyId: string;
};

const PartyDetail = ({ partyId }: Props) => {
  const [party, setParty] = useState<PartyDetail>();

  useEffect(() => {
    fetch(`/api/party/${partyId}`)
      .then((res) => res.json())
      .then((data) => setParty(data));
  }, [partyId]);

  if (!party) {
    return <></>;
  }

  return (
    <section className='px-3 py-6'>
      <div>
        <h2 className='text-2xl font-bold'>{party.name}</h2>
      </div>
      <div className='mt-8 flex flex-col gap-3'>
        <Voting foods={party.foods} />
        <VotingForm partyId={partyId} />
      </div>
    </section>
  );
};

export default PartyDetail;
