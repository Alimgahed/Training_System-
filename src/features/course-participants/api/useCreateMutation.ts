import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createCourseParticipant } from './create';

export const useCreateCourseParticipantMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourseParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-participants'] });
    },
  });
};
