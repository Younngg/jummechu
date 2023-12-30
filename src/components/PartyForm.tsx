'use client';

import {
  useCreateParty,
  useGetPartyDetail,
  useUpdateParty,
} from '@/hooks/party';
import { redirect } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import LoadingDots from './ui/LoadingDots';

type Props = {
  partyId?: string;
};

const PartyForm = ({ partyId }: Props) => {
  const { data: party } = useGetPartyDetail(partyId ?? '');
  const {
    mutate: createParty,
    data: newParty,
    isPending: isPendingCreate,
  } = useCreateParty();
  const {
    mutate: updateParty,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useUpdateParty();

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
        className='px-2 py-1 bg-green-200 rounded-md relative'
        onClick={handleSubmit}
      >
        {partyId ? '수정' : '추가'}

        {(isPendingCreate || isPendingUpdate) && (
          <span className='absolute inset-0 bg-black/50 rounded-md'>
            <LoadingDots />
          </span>
        )}
      </button>
    </form>
  );
};

export default PartyForm;
