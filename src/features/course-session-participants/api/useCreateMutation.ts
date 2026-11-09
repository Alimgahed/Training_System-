import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createCourseSessionParticipant } from './create';

export const useCreateCourseSessionParticipantMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourseSessionParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-session-participants'] });
    },
  });
};
