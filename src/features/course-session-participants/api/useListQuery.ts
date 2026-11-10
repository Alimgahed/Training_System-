import { useQuery } from '@tanstack/react-query';
import { getCourseSessionParticipants } from './list';

export const useCourseSessionParticipants = () => {
  return useQuery({
    queryKey: ['course-session-participants'],
    queryFn: ({ signal }) => getCourseSessionParticipants(signal),
  });
};
