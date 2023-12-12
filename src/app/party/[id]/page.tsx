import { getParty } from '@/service/party';

type Props = { params: { id: string } };

const PartyDetailPage = async ({ params: { id } }: Props) => {
  const party = await getParty(id)

  console.log(party)

  return <h1>party</h1>;
};

export default PartyDetailPage;
