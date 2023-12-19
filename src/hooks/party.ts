import { partyApi } from '@/service/api/party';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const usePartyDetail = (partyId: string) => {
  const queryClient = useQueryClient();

  const {
    data: party,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['parties', partyId],
    queryFn: () => partyApi.getPartyDetail(partyId),
  });

  const { mutate: setVote } = useMutation({
    mutationFn: ({ foodId, vote }: { foodId: string; vote: boolean }) =>
      partyApi.updateVote(foodId, vote),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['parties', partyId] }),
  });

  return { party, isError, isLoading, setVote };
};

export default usePartyDetail;
