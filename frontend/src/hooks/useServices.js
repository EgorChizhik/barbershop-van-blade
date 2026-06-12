import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useServices = (barberLevel = null) => {
  
  return useQuery({
    queryKey: ['services', barberLevel], 
    queryFn: async () => {
      console.log('useServices: Query executing for level:', barberLevel);
      
      const response = await api.get('services/', {
        params: barberLevel ? { barber_level: barberLevel } : {}
      });
      
      const services = response.data;

      const processed = services.map(service => {
        const defaultVariant = service.variants?.find(v => v.barber_level === 'Матрос') || service.variants?.[0];
        return { ...service, defaultVariant: defaultVariant || null };
      });
      
      console.log('useServices: Returning', processed.length, 'processed services');
      return processed;
    },
    staleTime: 3 * 60 * 1000, 
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};