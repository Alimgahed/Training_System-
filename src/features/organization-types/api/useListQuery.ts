import { useQuery } from '@tanstack/react-query';
import { getOrganizationTypes } from './list';

export const useOrganizationTypes = () => {
  return useQuery({
    queryKey: ['organization-types'],
    queryFn: getOrganizationTypes,
  });
};
