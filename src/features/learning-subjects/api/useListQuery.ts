import { useQuery } from '@tanstack/react-query';
import { getLearningSubjects } from './list';

export const useLearningSubjects = (enabled = true) => {
  return useQuery({
    enabled,
    queryKey: ['learning-subjects'],
    queryFn: ({ signal }) => getLearningSubjects(signal),
  });
};
