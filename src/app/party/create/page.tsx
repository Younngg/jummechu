import authOptions from '@/app/api/auth/[...nextauth]/options';
import PartyForm from '@/components/PartyForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const CreatePartyPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className='flex justify-center py-44'>
      <PartyForm />
    </div>
  );
};

export default CreatePartyPage;
