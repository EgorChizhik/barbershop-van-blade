import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useBarbers = () => {
  return useQuery({
    queryKey: ['barbers'],
    queryFn: async () => {
      const { data } = await api.get('barbers/'); 
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};