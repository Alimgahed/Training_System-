import { useQuery } from '@tanstack/react-query';
import { getCourses } from './list';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });
};
