import { partyApi } from '@/service/api/party';
import { useQuery } from '@tanstack/react-query';

const usePartyDetail = (partyId: string) => {
  const {
    data: party,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['parties', partyId],
    queryFn: () => partyApi.getPartyDetail(partyId),
  });

  return { party, isError, isLoading };
};

export default usePartyDetail;
