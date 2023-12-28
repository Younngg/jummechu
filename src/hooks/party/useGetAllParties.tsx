import { partyApi } from '@/service/api/party';
import { useQuery } from '@tanstack/react-query';

const useGetAllParties = () => {
  return useQuery({ queryKey: ['parties'], queryFn: partyApi.getAllParties });
};

export default useGetAllParties;
