import { useQuery } from '@tanstack/react-query';
import { getOrganizations } from './list';

export const useOrganizations = () => {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: getOrganizations,
  });
};
