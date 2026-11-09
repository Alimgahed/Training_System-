import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createCourseParticipantFinalExam } from './create';

export const useCreateCourseParticipantFinalExamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourseParticipantFinalExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-participant-final-exams'] });
    },
  });
};
