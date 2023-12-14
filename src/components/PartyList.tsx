'use client';

import { useEffect, useState } from 'react';
import PartyCard from './PartyCard';
import { SimpleParty } from '@/types/party';

const PartyList = () => {
  const [parties, setParties] = useState<SimpleParty[]>([]);

  useEffect(() => {
    fetch('/api/party', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setParties(data));
  }, []);



  return (
    <section>
      <ul>
        {parties.map((party) => (
          <li key={party.id}>
            <PartyCard party={party} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PartyList;
