import { partyApi } from '@/service/api/party';
import { UpdatedParty } from '@/types/party';
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['parties'] }),
  });

  const { mutate: deleteParty, isSuccess: isSuccessDelete } = useMutation({
    mutationFn: (partyId: string) => partyApi.deleteParty(partyId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['parties'] }),
  });

  const { mutate: updateParty, isSuccess: isSuccessUpdate } = useMutation({
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

  return {
    parties,
    isError,
    isLoading,
    createParty,
    newParty,
    deleteParty,
    isSuccessDelete,
    updateParty,
    isSuccessUpdate,
  };
};

export default useParties;
