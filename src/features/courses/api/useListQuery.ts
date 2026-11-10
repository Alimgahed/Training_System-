import { useQuery } from '@tanstack/react-query';
import { getCourses } from './list';

export const useCourses = (enabled = true) => {
  return useQuery({
    enabled,
    queryKey: ['courses'],
    queryFn: ({ signal }) => getCourses(signal),
  });
};
