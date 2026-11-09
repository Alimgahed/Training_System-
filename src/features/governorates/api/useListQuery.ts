import { useQuery } from '@tanstack/react-query';
import { getGovernorates } from './list';

export const useGovernorates = () => {
  return useQuery({
    queryKey: ['governorates'],
    queryFn: getGovernorates,
  });
};
