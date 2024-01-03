import PartyDetail from '@/components/PartyDetail';

type Props = { params: { id: string } };

const PartyDetailPage = ({ params: { id } }: Props) => {
  return (
    <section className='px-3 py-6'>
      <PartyDetail partyId={id} />
    </section>
  );
};

export default PartyDetailPage;
