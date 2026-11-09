import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createCourseSession } from './create';

export const useCreateCourseSessionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourseSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-sessions'] });
    },
  });
};
