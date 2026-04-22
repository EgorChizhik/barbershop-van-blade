import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';


export const useServices = (barberLevel = null) => {
  const queryParams = barberLevel ? `?barber_level=${barberLevel}` : '';
  
  return useQuery({
    queryKey: ['services', barberLevel],
    queryFn: async () => {
      const response = await api.get(`services/${queryParams}`);
      return response.data;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const useServiceBySlug = (slug) => {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: async () => {
      const response = await api.get(`services/${slug}/`);
      return response.data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};