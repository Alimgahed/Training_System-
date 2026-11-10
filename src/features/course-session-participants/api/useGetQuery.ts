import { useQuery } from '@tanstack/react-query';
import { getCourseSessionParticipant } from './get';

export const useCourseSessionParticipant = (id: string | number) => {
  return useQuery({
    queryKey: ['course-session-participant', id],
    queryFn: ({ signal }) => getCourseSessionParticipant(id, signal),
    enabled: !!id,
  });
};
