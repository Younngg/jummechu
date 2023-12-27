'use client';

import useParties from '@/hooks/parties';
import useVote from '@/hooks/vote';
import { redirect } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import DefaultButton from './ui/DefaultButton';

type Props = {
  partyId?: string;
};

const PartyForm = ({ partyId }: Props) => {
  const { party } = useVote(partyId ?? '');
  const { createParty, newParty, updateParty, isSuccessUpdate } = useParties();

  const [name, setName] = useState(party ? party.name : '');
  const [isAnonymous, setIsAnonymous] = useState(
    party ? party.isAnonymous : false
  );
  const [canBeAdded, setCanBeAdded] = useState(
    party ? party.canBeAdded : false
  );

  useEffect(() => {
    if (newParty) redirect(`/party/${newParty._id}`);
  }, [newParty]);

  useEffect(() => {
    if (party) {
      isSuccessUpdate && redirect(`/party/${party.id}`);
    }
  }, [isSuccessUpdate, party]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (partyId) {
      updateParty({
        partyId,
        updated: { name, isAnonymous, canBeAdded },
      });
      setName('');
      return;
    }
    createParty({ name, isAnonymous, canBeAdded });
    setName('');
  };

  return (
    <form className='flex flex-col gap-3'>
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
            defaultChecked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
        </div>
        <div className='flex gap-3'>
          <label htmlFor='canBeAdded'>선택 항목 추가 허용</label>
          <input
            type='checkbox'
            id='canBeAdded'
            defaultChecked={canBeAdded}
            onChange={(e) => setCanBeAdded(e.target.checked)}
          />
        </div>
      </div>
      <button
        className='px-2 py-1 bg-green-200 rounded-md'
        onClick={handleSubmit}
      >
        {partyId ? '수정' : '추가'}
      </button>
    </form>
  );
};

export default PartyForm;
