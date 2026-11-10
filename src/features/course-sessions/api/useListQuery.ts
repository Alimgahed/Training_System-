import { useQuery } from '@tanstack/react-query';
import { getCourseSessions } from './list';

export const useCourseSessions = (enabled = true) => {
  return useQuery({
    enabled,
    queryKey: ['course-sessions'],
    queryFn: ({ signal }) => getCourseSessions(signal),
  });
};
