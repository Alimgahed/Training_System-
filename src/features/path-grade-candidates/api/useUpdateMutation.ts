import { useMutation,useQueryClient } from '@tanstack/react-query';
import type { PathGradeCandidateRequest } from '../types';
import { updatePathGradeCandidate } from './update';

export const useUpdatePathGradeCandidateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: PathGradeCandidateRequest }) => updatePathGradeCandidate(id, payload),
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['path-grade-candidates'] }); },
  });
};
