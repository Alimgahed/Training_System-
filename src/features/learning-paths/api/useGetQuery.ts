import { useQuery } from '@tanstack/react-query';
import { getLearningPath } from './get';

export const useLearningPath = (id: string | number) => {
  return useQuery({
    queryKey: ['learning-path', id],
    queryFn: () => getLearningPath(id),
    enabled: !!id,
  });
};
