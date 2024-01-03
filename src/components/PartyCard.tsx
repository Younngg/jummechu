import { SimpleParty } from '@/types/party';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

type Props = {
  party: SimpleParty;
};

dayjs.extend(utc);
dayjs.extend(timezone);

const PartyCard = ({
  party: { name, id, updatedAt, createdBy, isClosed },
}: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const formatDate = () => {
    const previous = dayjs(updatedAt).tz('Asia/Seoul');
    const year = previous.year();
    const month = previous.month() + 1;
    const date = previous.date();

    return `${year}-${('00' + month).slice(-2)}-${('00' + date).slice(-2)}`;
  };

  return (
    <Link
      href={`/party/${id}`}
      className={`flex items-center justify-between border w-full px-4 py-3 rounded-md ${
        isClosed && 'bg-gray-200 text-gray-500'
      }`}
    >
      <p>
        {name}
        {createdBy.id === user?.id && <span>👑</span>}
      </p>
      <p>{formatDate()}</p>
    </Link>
  );
};

export default PartyCard;
