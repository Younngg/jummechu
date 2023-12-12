import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PartyForm from '@/components/PartyForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const CreatePartyPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return <PartyForm />;
};

export default CreatePartyPage;
