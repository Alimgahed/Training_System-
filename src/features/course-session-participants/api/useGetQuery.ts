import { useQuery } from '@tanstack/react-query';
import { getCourseSessionParticipant } from './get';

export const useCourseSessionParticipant = (id: string | number) => {
  return useQuery({
    queryKey: ['course-session-participant', id],
    queryFn: () => getCourseSessionParticipant(id),
    enabled: !!id,
  });
};
