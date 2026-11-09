import { useQuery } from '@tanstack/react-query';
import { getLearningTerm } from './get';

export const useLearningTerm = (id: string | number) => {
  return useQuery({
    queryKey: ['learning-term', id],
    queryFn: () => getLearningTerm(id),
    enabled: !!id,
  });
};
