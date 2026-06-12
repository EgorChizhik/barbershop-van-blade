import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useServiceDetail = (slug) => {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: async () => {
      try {
        const response = await api.get(`services/${slug}/`);
        return response.data;
      } catch (error) {
        console.error('Ошибка при загрузке деталей услуги:', error);
        throw error;
      }
    },
    enabled: !!slug,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};