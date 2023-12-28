import PartyList from '@/components/PartyList';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import Link from 'next/link';

const Home = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div>
      <div className='text-right mt-8'>
        <Link
          className='px-2 py-1 bg-blue-300 text-white font-bold rounded-md'
          href='/party/create'
        >
          모임 만들기
        </Link>
      </div>
      <PartyList />
    </div>
  );
};

export default Home;
