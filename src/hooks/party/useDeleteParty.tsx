import { partyApi } from '@/service/api/party';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (partyId: string) => partyApi.deleteParty(partyId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['parties'] }),
  });
};

export default useDeleteParty;
