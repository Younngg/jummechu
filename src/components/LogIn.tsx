'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

const LogIn = ({ providers, callbackUrl }: Props) => {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <button
          key={id}
          className='btn btn-outline btn-primary'
          onClick={() => signIn(id, { callbackUrl })}
        >
          {name}으로 로그인
        </button>
      ))}
    </>
  );
};

export default LogIn;
