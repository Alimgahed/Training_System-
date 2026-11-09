import { useQuery } from '@tanstack/react-query';
import { getGovernorate } from './get';

export const useGovernorate = (id: string | number) => {
  return useQuery({
    queryKey: ['governorate', id],
    queryFn: () => getGovernorate(id),
    enabled: !!id,
  });
};
