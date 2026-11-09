import { useMutation,useQueryClient } from '@tanstack/react-query';
import type { PathGradeCandidateRequest } from '../types';
import { createPathGradeCandidate } from './create';

export const useCreatePathGradeCandidateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PathGradeCandidateRequest) => createPathGradeCandidate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['path-grade-candidates'] });
    },
  });
};
