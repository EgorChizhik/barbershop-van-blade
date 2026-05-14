import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useServices = (barberLevel = null) => {
  const queryParams = barberLevel ? `?barber_level=${encodeURIComponent(barberLevel)}` : '';

  return useQuery({
    queryKey: ['services', barberLevel],
    queryFn: async () => {
      console.log('useServices: Query executing with key:', ['services', barberLevel]);
      const response = await api.get(`services/${queryParams}`);
      const services = response.data;
      
      const processed = services.map(service => {
        const defaultVariant = service.variants?.find(v => v.barber_level === 'Матрос') || service.variants?.[0];
        return { ...service, defaultVariant: defaultVariant || null };
      });
      
      console.log('useServices: Returning', processed.length, 'processed services');
      return processed;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
  });
};