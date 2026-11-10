import { useQuery } from '@tanstack/react-query';
import { getDocumentationType } from './get';

export const useDocumentationType = (id: string | number) => {
  return useQuery({
    queryKey: ['documentation-type', id],
    queryFn: ({ signal }) => getDocumentationType(id, signal),
    enabled: !!id,
  });
};
