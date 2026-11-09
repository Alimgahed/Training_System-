import { useQuery } from '@tanstack/react-query';
import { getQualification } from './get';

export const useQualification = (id: string | number) => {
  return useQuery({
    queryKey: ['qualification', id],
    queryFn: () => getQualification(id),
    enabled: !!id,
  });
};
