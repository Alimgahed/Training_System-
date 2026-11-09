import { useQuery } from '@tanstack/react-query';
import { getCountry } from './get';

export const useCountry = (id: string | number) => {
  return useQuery({
    queryKey: ['country', id],
    queryFn: () => getCountry(id),
    enabled: !!id,
  });
};
