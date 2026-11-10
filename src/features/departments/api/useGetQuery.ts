import { useQuery } from '@tanstack/react-query';
import { getDepartment } from './get';

export const useDepartment = (id: string | number) => {
  return useQuery({
    queryKey: ['department', id],
    queryFn: ({ signal }) => getDepartment(id, signal),
    enabled: !!id,
  });
};
