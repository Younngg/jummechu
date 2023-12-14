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
    <section className='px-3 py-6'>
      <h2 className='text-2xl font-bold'>내가 참여한 투표</h2>
      <ul className='mt-8 flex flex-col gap-3'>
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
