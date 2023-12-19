'use client';

import { useEffect, useState } from 'react';
import PartyCard from './PartyCard';
import { SimpleParty } from '@/types/party';
import useParties from '@/hooks/parties';

const PartyList = () => {
  const { parties } = useParties();

  return (
    <section className='px-3 py-6'>
      <h2 className='text-2xl font-bold text-center'>내가 참여한 투표</h2>
      {parties && (
        <ul className='mt-8 flex flex-col gap-3'>
          {parties.map((party) => (
            <li key={party.id}>
              <PartyCard party={party} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PartyList;
