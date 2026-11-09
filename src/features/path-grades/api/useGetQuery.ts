import { useQuery } from '@tanstack/react-query';
import { getPathGrade } from './get';

export const usePathGrade = (id: string | number) => {
  return useQuery({
    queryKey: ['path-grade', id],
    queryFn: () => getPathGrade(id),
    enabled: !!id,
  });
};
