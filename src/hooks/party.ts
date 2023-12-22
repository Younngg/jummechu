import { partyApi } from '@/service/api/party';
import { UpdatedParty } from '@/types/party';
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

  const { mutate: addFood } = useMutation({
    mutationFn: ({ name }: { name: string }) => partyApi.addFood(partyId, name),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['parties', partyId] }),
  });

  const { mutate: deleteFood } = useMutation({
    mutationFn: ({ foodId }: { foodId: string }) =>
      partyApi.deleteFood(partyId, foodId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['parties', partyId] }),
  });

  const { mutate: updateParty } = useMutation({
    mutationFn: (party: UpdatedParty) => partyApi.updateParty(partyId, party),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['parties', partyId] }),
  });

  return {
    party,
    isError,
    isLoading,
    setVote,
    addFood,
    deleteFood,
    updateParty,
  };
};

export default usePartyDetail;
