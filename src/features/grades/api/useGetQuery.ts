import { useQuery } from '@tanstack/react-query';
import { getGrade } from './get';

export const useGrade = (id: string | number) => {
  return useQuery({
    queryKey: ['grade', id],
    queryFn: ({ signal }) => getGrade(id, signal),
    enabled: !!id,
  });
};
