import { useQuery } from '@tanstack/react-query';
import { getDocumentation } from './get';

export const useDocumentation = (id: string | number) => {
  return useQuery({
    queryKey: ['documentation', id],
    queryFn: () => getDocumentation(id),
    enabled: !!id,
  });
};
