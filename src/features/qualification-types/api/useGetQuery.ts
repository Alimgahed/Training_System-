import { useQuery } from '@tanstack/react-query';
import { getQualificationType } from './get';

export const useQualificationType = (id: string | number) => {
  return useQuery({
    queryKey: ['qualification-type', id],
    queryFn: () => getQualificationType(id),
    enabled: !!id,
  });
};
