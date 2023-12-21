'use client';

import useParties from '@/hooks/parties';
import { redirect } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const PartyForm = () => {
  const [name, setName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [canBeAdded, setCanBeAdded] = useState(false);
  const { createParty, newParty } = useParties();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createParty({ name, isAnonymous, canBeAdded });
    setName('');
  };

  useEffect(() => {
    if (newParty) redirect(`/party/${newParty._id}`);
  }, [newParty]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <div className='flex gap-3'>
        <label htmlFor='partyName'>투표명</label>
        <input
          className='w-72 px-2 py-1 border rounded-md'
          id='partyName'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='flex gap-14'>
        <div className='flex gap-3'>
          <label htmlFor='anonymous'>익명</label>
          <input
            type='checkbox'
            id='anonymous'
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
        </div>
        <div className='flex gap-3'>
          <label htmlFor='canBeAdded'>항목 추가 허용</label>
          <input
            type='checkbox'
            id='canBeAdded'
            onChange={(e) => setCanBeAdded(e.target.checked)}
          />
        </div>
      </div>
      <button className='px-2 py-1 bg-green-200 rounded-md'>추가</button>
    </form>
  );
};

export default PartyForm;
