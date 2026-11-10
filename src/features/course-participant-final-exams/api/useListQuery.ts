import { useQuery } from '@tanstack/react-query';
import { getCourseParticipantFinalExams } from './list';

export const useCourseParticipantFinalExams = () => {
  return useQuery({
    queryKey: ['course-participant-final-exams'],
    queryFn: ({ signal }) => getCourseParticipantFinalExams(signal),
  });
};
