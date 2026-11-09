import { useQuery } from '@tanstack/react-query';
import { getParticipantTypes } from './list';

export const useParticipantTypes = () => {
  return useQuery({
    queryKey: ['participant-types'],
    queryFn: getParticipantTypes,
  });
};
