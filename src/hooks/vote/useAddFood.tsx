import { partyApi } from '@/service/api/party';
import { Food, PartyDetail } from '@/types/party';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAddFood = (partyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name }: { name: string }) => partyApi.addFood(partyId, name),
    onMutate: async (newFood) => {
      await queryClient.cancelQueries({ queryKey: ['parties', partyId] });

      const previousParty: PartyDetail | undefined = queryClient.getQueryData([
        'parties',
        partyId,
      ]);

      const newParty = {
        ...previousParty,
        foods: [
          ...(previousParty?.foods as Food[]),
          { name: newFood.name, voters: [], id: 'test' },
        ],
      };

      const party = queryClient.setQueryData(['parites', partyId], newParty);

      console.log(party);

      return { party };
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['parties', partyId] }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['parties', partyId] }),
  });
};

export default useAddFood;
