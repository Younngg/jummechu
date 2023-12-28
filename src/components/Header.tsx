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
          <div className='flex dropdown dropdown-bottom'>
            <div tabIndex={0} role='button'>
              <UserProfile user={user} />
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <button onClick={() => signOut()}>로그아웃</button>
              </li>
            </ul>
          </div>
        ) : (
          <button className='btn btn-ghost' onClick={() => signIn()}>
            로그인
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
