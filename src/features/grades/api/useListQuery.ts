import { useQuery } from '@tanstack/react-query';
import { getGrades } from './list';

export const useGrades = () => {
  return useQuery({
    queryKey: ['grades'],
    queryFn: ({ signal }) => getGrades(signal),
  });
};
