import { useQuery } from '@tanstack/react-query';
import { getEvaluationTypes } from './list';

export const useEvaluationTypes = () => {
  return useQuery({
    queryKey: ['evaluation-types'],
    queryFn: getEvaluationTypes,
  });
};
