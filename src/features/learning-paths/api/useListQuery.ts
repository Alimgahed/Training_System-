import { useQuery } from '@tanstack/react-query';
import { getLearningPaths } from './list';

export const useLearningPaths = () => {
  return useQuery({
    queryKey: ['learning-paths'],
    queryFn: getLearningPaths,
  });
};
