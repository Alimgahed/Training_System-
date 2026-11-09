import { useQuery } from '@tanstack/react-query';
import { getLearningSubjects } from './list';

export const useLearningSubjects = () => {
  return useQuery({
    queryKey: ['learning-subjects'],
    queryFn: getLearningSubjects,
  });
};
