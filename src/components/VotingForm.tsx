import { FormEvent, useState } from 'react';

type Props = {
  partyId: string;
};

const VotingForm = ({ partyId }: Props) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch(`/api/party/${partyId}`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    }).then((res) => res.json());

    setName('');
  };

  return (
    <form
      className='flex items-center justify-center gap-1'
      onSubmit={handleSubmit}
    >
      <input
        placeholder='항목 이름'
        className='w-96 border px-2 py-1 rounded-sm'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className='px-2 py-1 bg-sky-200 rounded-sm'>추가</button>
    </form>
  );
};

export default VotingForm;
