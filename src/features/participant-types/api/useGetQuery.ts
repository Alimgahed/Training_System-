import { useQuery } from '@tanstack/react-query';
import { getParticipantType } from './get';

export const useParticipantType = (id: string | number) => {
  return useQuery({
    queryKey: ['participant-type', id],
    queryFn: () => getParticipantType(id),
    enabled: !!id,
  });
};
