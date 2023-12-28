import { partyApi } from '@/service/api/party';
import { useQuery } from '@tanstack/react-query';

const useGetPartyDetail = (partyId: string) => {
  return useQuery({
    queryKey: ['parties', partyId],
    queryFn: () => partyApi.getPartyDetail(partyId),
  });
};

export default useGetPartyDetail;
