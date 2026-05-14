import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useTimeSlots = (barberId) => {
  return useQuery({
    queryKey: ['slots', barberId],
    queryFn: async () => {
      if (!barberId) {
        console.error("Барбер не выбран!");
        return [];
      }
      const url = `http://127.0.0.1:8000/api/barbers/${barberId}/slots/`;
      console.log("Стучимся по адресу:", url);
      
      const { data } = await axios.get(url);
      return data;
    },
    enabled: !!barberId,
  });
};