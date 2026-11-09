import { useQuery } from '@tanstack/react-query';
import { getTrainerSubjects } from './list';

export const useTrainerSubjects = () => {
  return useQuery({
    queryKey: ['trainer-subjects'],
    queryFn: getTrainerSubjects,
  });
};
