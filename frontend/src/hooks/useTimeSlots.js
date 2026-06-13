import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useTimeSlots = (barberId) => {
  return useQuery({
    queryKey: ['slots', barberId],
    queryFn: async () => {
      if (!barberId) return [];
      

      const { data } = await api.get(`barbers/${barberId}/slots/`);
      return data;
    },
    enabled: !!barberId,
    staleTime: 1000 * 60 * 2, 
  });
};