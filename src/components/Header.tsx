'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className='mx-auto flex justify-between items-center px-6 py-3 gap-4'>
      <h1 className='text-3xl font-bold'>
        <Link href='/'>점메추</Link>
      </h1>

      <nav></nav>
      <div>
        {session ? (
          <button onClick={() => signOut()}>로그아웃</button>
        ) : (
          <button onClick={() => signIn()}>로그인</button>
        )}
      </div>
    </div>
  );
};

export default Header;
