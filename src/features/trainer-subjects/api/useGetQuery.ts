import { useQuery } from '@tanstack/react-query';
import { getTrainerSubject } from './get';

export const useTrainerSubject = (id: string | number) => {
  return useQuery({
    queryKey: ['trainer-subject', id],
    queryFn: () => getTrainerSubject(id),
    enabled: !!id,
  });
};
