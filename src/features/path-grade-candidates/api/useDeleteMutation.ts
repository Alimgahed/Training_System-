import { useMutation,useQueryClient } from '@tanstack/react-query';
import { deletePathGradeCandidate } from './delete';

export const useDeletePathGradeCandidateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePathGradeCandidate,
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['path-grade-candidates'] }); },
  });
};
