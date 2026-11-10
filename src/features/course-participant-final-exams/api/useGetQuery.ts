import { useQuery } from '@tanstack/react-query';
import { getCourseParticipantFinalExam } from './get';

export const useCourseParticipantFinalExam = (id: string | number) => {
  return useQuery({
    queryKey: ['course-participant-final-exam', id],
    queryFn: ({ signal }) => getCourseParticipantFinalExam(id, signal),
    enabled: !!id,
  });
};
