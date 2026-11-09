import { useQuery } from '@tanstack/react-query';
import { getCourseSessions } from './list';

export const useCourseSessions = () => {
  return useQuery({
    queryKey: ['course-sessions'],
    queryFn: getCourseSessions,
  });
};
