import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useServiceDetail = (slug) => {
  console.log('useServiceDetail called with slug:', slug);
  console.log('useServiceDetail enabled:', !!slug);
  
  const result = useQuery({
    queryKey: ['service', slug],
    queryFn: async () => {
      console.log('useServiceDetail queryFn executing for slug:', slug);
      try {
        const response = await api.get(`services/${slug}/`);
        console.log('useServiceDetail queryFn received response data:', {
          id: response.data?.id,
          name: response.data?.name,
          variants: response.data?.variants?.length,
          hasVariants: Array.isArray(response.data?.variants) && response.data.variants.length > 0
        });
        return response.data;
      } catch (error) {
        console.error('useServiceDetail queryFn error:', error);
        throw error;
      }
    },
    enabled: !!slug,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
  
  console.log('useServiceDetail returning full query object:', {
    data: result.data ? { name: result.data.name, id: result.data.id, hasVariants: result.data.variants?.length } : null,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    isFetching: result.isFetching,
    isRefetching: result.isRefetching
  });
  
  return result;
};