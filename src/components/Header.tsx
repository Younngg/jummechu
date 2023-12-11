'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <div>
        <h1>점메추</h1>
      </div>
      <nav></nav>
      <div>
        {session ? (
          <button onClick={() => signOut()}>로그아웃</button>
        ) : (
          <button onClick={() => signIn()}>로그인</button>
        )}
      </div>
    </>
  );
};

export default Header;
