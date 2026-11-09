import { useQuery } from '@tanstack/react-query';
import { getDocumentations } from './list';

export const useDocumentations = () => {
  return useQuery({
    queryKey: ['documentations'],
    queryFn: getDocumentations,
  });
};
