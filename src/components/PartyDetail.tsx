'use client';

import { PartyDetail } from '@/types/party';
import { useEffect, useState } from 'react';
import Voting from './Voting';

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
    <div>
      <h1>{party.name}</h1>
      <div>
        <Voting foods={party.foods} />
      </div>
    </div>
  );
};

export default PartyDetail;
