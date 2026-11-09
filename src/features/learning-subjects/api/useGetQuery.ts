import { useQuery } from '@tanstack/react-query';
import { getLearningSubject } from './get';

export const useLearningSubject = (id: string | number) => {
  return useQuery({
    queryKey: ['learning-subject', id],
    queryFn: () => getLearningSubject(id),
    enabled: !!id,
  });
};
