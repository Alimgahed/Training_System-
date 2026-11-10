import { useQuery } from '@tanstack/react-query';
import { getGovernorate } from './get';

export const useGovernorate = (id: string | number) => {
  return useQuery({
    queryKey: ['governorate', id],
    queryFn: ({ signal }) => getGovernorate(id, signal),
    enabled: !!id,
  });
};
