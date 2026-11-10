import { useQuery } from '@tanstack/react-query';
import { getCountrys } from './list';

export const useCountrys = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: ({ signal }) => getCountrys(signal),
  });
};
