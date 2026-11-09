import { useQuery } from '@tanstack/react-query';
import { getLearningTerms } from './list';

export const useLearningTerms = () => {
  return useQuery({
    queryKey: ['learning-terms'],
    queryFn: getLearningTerms,
  });
};
