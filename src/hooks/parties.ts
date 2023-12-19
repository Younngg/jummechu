import { partyApi } from '@/service/api/party';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const useParties = () => {
  const queryClient = useQueryClient();

  const {
    data: parties,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['parties'], queryFn: partyApi.getAllParties });

  const { mutate: createParty } = useMutation({
    mutationFn: (name: string) => partyApi.createParty(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['parties'] }),
  });

  return { parties, isError, isLoading, createParty };
};

export default useParties;
