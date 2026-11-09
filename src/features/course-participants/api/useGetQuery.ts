import { useQuery } from '@tanstack/react-query';
import { getCourseParticipant } from './get';

export const useCourseParticipant = (id: string | number) => {
  return useQuery({
    queryKey: ['course-participant', id],
    queryFn: () => getCourseParticipant(id),
    enabled: !!id,
  });
};
