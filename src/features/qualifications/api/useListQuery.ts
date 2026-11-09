import { useQuery } from '@tanstack/react-query';
import { getQualifications } from './list';

export const useQualifications = () => {
  return useQuery({
    queryKey: ['qualifications'],
    queryFn: getQualifications,
  });
};
