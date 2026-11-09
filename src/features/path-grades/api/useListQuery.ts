import { useQuery } from '@tanstack/react-query';
import { getPathGrades } from './list';

export const usePathGrades = () => {
  return useQuery({
    queryKey: ['path-grades'],
    queryFn: getPathGrades,
  });
};
