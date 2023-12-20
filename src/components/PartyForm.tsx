'use client';

import useParties from '@/hooks/parties';
import { FormEvent, useState } from 'react';

const PartyForm = () => {
  const [name, setName] = useState('');
  const { createParty } = useParties();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createParty(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='partyName'>모임명</label>
      <input
        id='partyName'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button>추가</button>
    </form>
  );
};

export default PartyForm;
