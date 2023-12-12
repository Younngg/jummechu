'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className='mx-auto flex justify-between items-center px-6 py-3 gap-4'>
      <h1 className='text-3xl font-bold'>
        <Link href='/'>점메추</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link href='/party/create'>파티 추가</Link>
          </li>
        </ul>
      </nav>
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
