import { SimpleParty } from '@/types/party';
import Link from 'next/link';

type Props = {
  party: SimpleParty;
};

const PartyCard = ({ party: { name, id } }: Props) => {
  return (
    <div>
      <Link href={`/party/${id}`}>{name}</Link>
    </div>
  );
};

export default PartyCard;
