import { useQuery } from '@tanstack/react-query';
import { getPerson } from './get';

export const usePerson = (id: string | number) => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => getPerson(id),
    enabled: !!id,
  });
};
