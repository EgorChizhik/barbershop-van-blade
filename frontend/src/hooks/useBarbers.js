import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useBarbers = () => {
  return useQuery({
    queryKey: ['barbers'],
    queryFn: async () => {
      const { data } = await axios.get('http://127.0.0.1:8000/api/barbers/');
      return data;
    },
  });
};