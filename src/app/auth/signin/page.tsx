import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import LogIn from '@/components/LogIn';
import authOptions from '@/app/api/auth/[...nextauth]/options';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signup or Login to Instagram',
};

type Props = {
  searchParams: { callbackUrl: string };
};

const LogInPage = async ({ searchParams: { callbackUrl } }: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className='flex justify-center mt-24'>
      <LogIn providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
};

export default LogInPage;
