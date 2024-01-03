'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

const LogIn = ({ providers, callbackUrl }: Props) => {
  return (
    <ul className='flex flex-col gap-3'>
      {Object.values(providers).map(({ name, id }) => (
        <li key={id}>
          <button
            className='btn btn-outline btn-primary w-48'
            onClick={() => signIn(id, { callbackUrl })}
          >
            {name} 로그인
          </button>
        </li>
      ))}
    </ul>
  );
};

export default LogIn;
