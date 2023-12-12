'use client';

import { FormEvent, useState } from 'react';

const PartyForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch('/api/party', {
      method: 'POST',
      body: JSON.stringify({ name }),
    }).then((res) => res.json());

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
