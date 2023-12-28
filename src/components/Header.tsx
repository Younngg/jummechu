'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import UserProfile from './UserProfile';

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className='mx-auto flex justify-between items-center p-3 gap-4'>
      <h1 className='text-3xl font-bold'>
        <Link href='/'>점메추</Link>
      </h1>
      <div>
        {user ? (
          <div className='flex'>
            <UserProfile user={user} />
            <button onClick={() => signOut()}>로그아웃</button>
          </div>
        ) : (
          <button onClick={() => signIn()}>로그인</button>
        )}
      </div>
    </div>
  );
};

export default Header;
