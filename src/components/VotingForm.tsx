import { useAddFood } from '@/hooks/vote';
import { FormEvent, useState } from 'react';

type Props = {
  handleSubmit: (e: FormEvent, name: string) => void;
};

const VotingForm = ({ handleSubmit }: Props) => {
  const [name, setName] = useState('');

  return (
    <form
      className='flex items-center justify-center gap-1'
      onSubmit={(e) => {
        handleSubmit(e, name);
        setName('');
      }}
    >
      <input
        placeholder='항목 이름'
        className='w-96 border px-2 py-1 rounded-md'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className='px-2 py-1 bg-sky-200 rounded-md btn btn-sm'>
        추가
      </button>
    </form>
  );
};

export default VotingForm;
