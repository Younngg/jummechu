import { partyApi } from '@/service/api/party';
import { UpdatedParty } from '@/types/party';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      partyId,
      updated,
    }: {
      partyId: string;
      updated: UpdatedParty;
    }) => partyApi.updateParty(partyId, updated),
    onSuccess: (_, { partyId }) =>
      queryClient.invalidateQueries({ queryKey: ['parties', partyId] }),
  });
};

export default useUpdateParty;
