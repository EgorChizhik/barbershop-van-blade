import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useWorks = (params = {}) => {
  return useQuery({
    queryKey: ['works', params],
    queryFn: async () => {
      const { data } = await api.get('gallery/', { params });
      return data;
    },
  });
};