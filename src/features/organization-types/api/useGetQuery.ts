import { useQuery } from '@tanstack/react-query';
import { getOrganizationType } from './get';

export const useOrganizationType = (id: string | number) => {
  return useQuery({
    queryKey: ['organization-type', id],
    queryFn: () => getOrganizationType(id),
    enabled: !!id,
  });
};
