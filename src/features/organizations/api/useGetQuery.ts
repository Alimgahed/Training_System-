import { useQuery } from '@tanstack/react-query';
import { getOrganization } from './get';

export const useOrganization = (id: string | number) => {
  return useQuery({
    queryKey: ['organization', id],
    queryFn: () => getOrganization(id),
    enabled: !!id,
  });
};
