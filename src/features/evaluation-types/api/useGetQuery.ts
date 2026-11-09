import { useQuery } from '@tanstack/react-query';
import { getEvaluationType } from './get';

export const useEvaluationType = (id: string | number) => {
  return useQuery({
    queryKey: ['evaluation-type', id],
    queryFn: () => getEvaluationType(id),
    enabled: !!id,
  });
};
