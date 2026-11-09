import { useQuery } from '@tanstack/react-query';
import { getDocumentationTypes } from './list';

export const useDocumentationTypes = () => {
  return useQuery({
    queryKey: ['documentation-types'],
    queryFn: getDocumentationTypes,
  });
};
