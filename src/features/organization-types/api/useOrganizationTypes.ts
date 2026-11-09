import { useQuery } from '@tanstack/react-query';
import { getOrganizationTypes } from './getOrganizationTypes';

export const useOrganizationTypes = () => {
  return useQuery({
    queryKey: ['organization-types'],
    queryFn: getOrganizationTypes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
