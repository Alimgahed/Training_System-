import { useQuery } from '@tanstack/react-query';
import { getPersons } from './list';

export const usePersons = () => {
  return useQuery({
    queryKey: ['persons'],
    queryFn: getPersons,
  });
};
