import { useQuery } from '@tanstack/react-query';
import { getCourse } from './get';

export const useCourse = (id: string | number) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: ({ signal }) => getCourse(id, signal),
    enabled: !!id,
  });
};
