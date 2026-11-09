import { useQuery } from '@tanstack/react-query';
import { getCourseParticipants } from './list';

export const useCourseParticipants = () => {
  return useQuery({
    queryKey: ['course-participants'],
    queryFn: getCourseParticipants,
  });
};
