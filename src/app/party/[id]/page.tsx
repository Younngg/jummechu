import PartyDetail from '@/components/PartyDetail';

type Props = { params: { id: string } };

const PartyDetailPage = ({ params: { id } }: Props) => {
  return (
    <div>
      <div>
        <PartyDetail partyId={id} />
      </div>
    </div>
  );
};

export default PartyDetailPage;
