import { useMutation,useQueryClient } from '@tanstack/react-query';
import { createTrainingRoom } from './create';

export const useCreateTrainingRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTrainingRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};
