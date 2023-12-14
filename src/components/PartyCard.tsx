import { SimpleParty } from '@/types/party';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Props = {
  party: SimpleParty;
};

const PartyCard = ({
  party: { name, id, updatedAt, createdBy, isClosed },
}: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <Link
      href={`/party/${id}`}
      className={`flex items-center justify-between border w-full px-4 py-3 rounded-md ${
        isClosed && 'bg-gray-200 text-gray-500'
      }`}
    >
      <p>
        {name}
        {createdBy.id === user.id && <span>👑</span>}
      </p>
      <p>{updatedAt}</p>
    </Link>
  );
};

export default PartyCard;
