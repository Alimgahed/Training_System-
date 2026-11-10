import { useQuery } from '@tanstack/react-query';
import { getDepartments } from './list';

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: ({ signal }) => getDepartments(signal),
  });
};
