import { partyApi } from '@/service/api/party';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      isAnonymous,
      canBeAdded,
    }: {
      name: string;
      isAnonymous: boolean;
      canBeAdded: boolean;
    }) => partyApi.createParty(name, isAnonymous, canBeAdded),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['parties'] }),
  });
};

export default useCreateParty;
