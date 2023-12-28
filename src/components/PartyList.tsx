'use client';

import PartyCard from './PartyCard';
import useParties from '@/hooks/parties';
import Spinner from './ui/Spinner';
import { useGetAllParties } from '@/hooks/party';

const PartyList = () => {
  const { data: parties, isLoading } = useGetAllParties();

  return (
    <section className='px-3 py-6'>
      <h2 className='text-2xl font-bold text-center'>내가 참여한 투표</h2>
      {isLoading && (
        <div className='flex flex-col items-center gap-4 mt-24'>
          <Spinner />
          <p>불러오는 중...</p>
        </div>
      )}
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
