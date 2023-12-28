import { partyApi } from '@/service/api/party';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useSetVote = (partyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ foodId, vote }: { foodId: string; vote: boolean }) =>
      partyApi.updateVote(foodId, vote),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['parties', partyId] }),
  });
};

export default useSetVote;
