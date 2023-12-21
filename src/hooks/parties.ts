import { partyApi } from '@/service/api/party';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const useParties = () => {
  const queryClient = useQueryClient();

  const {
    data: parties,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['parties'], queryFn: partyApi.getAllParties });

  const { mutate: createParty, data: newParty } = useMutation({
    mutationFn: ({
      name,
      isAnonymous,
      canBeAdded,
    }: {
      name: string;
      isAnonymous: boolean;
      canBeAdded: boolean;
    }) => partyApi.createParty(name, isAnonymous, canBeAdded),
    onSuccess: (data) =>
      queryClient.invalidateQueries({ queryKey: ['parties'] }),
  });

  return { parties, isError, isLoading, createParty, newParty };
};

export default useParties;
