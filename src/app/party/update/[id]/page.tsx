import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PartyForm from '@/components/PartyForm';
import { getParty } from '@/service/sanity/party';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type Props = { params: { id: string } };

const UpdatePartyPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className='flex justify-center py-44'>
      <PartyForm partyId={id} />
    </div>
  );
};

export default UpdatePartyPage;
