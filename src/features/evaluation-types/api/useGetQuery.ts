import { useQuery } from '@tanstack/react-query';
import { getEvaluationType } from './get';

export const useEvaluationType = (id: string | number) => {
  return useQuery({
    queryKey: ['evaluation-type', id],
    queryFn: ({ signal }) => getEvaluationType(id, signal),
    enabled: !!id,
  });
};
