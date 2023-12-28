import { partyApi } from '@/service/api/party';
import { PartyDetail } from '@/types/party';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteFood = (partyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ foodId }: { foodId: string }) =>
      partyApi.deleteFood(partyId, foodId),
    onMutate: async (deleted) => {
      await queryClient.cancelQueries({ queryKey: ['parties', partyId] });

      const previousParty: PartyDetail | undefined = queryClient.getQueryData([
        'parties',
        partyId,
      ]);

      const newParty = {
        ...previousParty,
        foods: previousParty?.foods.filter(
          (food) => food.id !== deleted.foodId
        ),
      };

      const party = queryClient.setQueryData(['parites', partyId], newParty);

      return { party };
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['parties', partyId] }),
  });
};

export default useDeleteFood;
