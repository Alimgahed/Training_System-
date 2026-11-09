import { useQuery } from '@tanstack/react-query';
import { getQualificationTypes } from './list';

export const useQualificationTypes = () => {
  return useQuery({
    queryKey: ['qualification-types'],
    queryFn: getQualificationTypes,
  });
};
