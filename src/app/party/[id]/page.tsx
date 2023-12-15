import PartyDetail from '@/components/PartyDetail';

type Props = { params: { id: string } };

const PartyDetailPage = ({ params: { id } }: Props) => {
  return (
    <div>
      <PartyDetail partyId={id} />
    </div>
  );
};

export default PartyDetailPage;
