import { useQuery } from '@tanstack/react-query';
import { getCourseSession } from './get';

export const useCourseSession = (id: string | number) => {
  return useQuery({
    queryKey: ['course-session', id],
    queryFn: () => getCourseSession(id),
    enabled: !!id,
  });
};
