import { useQuery } from '@tanstack/react-query';
import { getDepartment } from './get';

export const useDepartment = (id: string | number) => {
  return useQuery({
    queryKey: ['department', id],
    queryFn: () => getDepartment(id),
    enabled: !!id,
  });
};
