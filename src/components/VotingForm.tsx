import { FormEvent, useState } from 'react';

type Props = {
  partyId: string
}

const VotingForm = ({partyId}: Props) => {
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
    <form onSubmit={handleSubmit}>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
      <button>추가</button>
    </form>
  );
};

export default VotingForm;
