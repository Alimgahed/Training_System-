import { createContext, useContext, type ReactNode } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm, type FieldValues, type UseFormProps, type DefaultValues } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { apiClient } from '../../core/api/apiClient';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorState } from './ErrorState';

const RecordContext = createContext<{ resource: string; singular: string; id?: string; data?: Record<string, unknown> } | null>(null);

export function ReferenceEditor({ resource, singular, children }: { resource: string; singular: string; children: ReactNode }) {
  const { id } = useParams();
  const query = useQuery({ queryKey: [resource, 'edit', id], enabled: Boolean(id), queryFn: async ({ signal }) => (await apiClient.get(`/${singular}/${id}`, { signal })).data });
  if (id && query.isPending) return <LoadingSkeleton variant="form" />;
  if (id && query.isError) return <ErrorState onRetry={() => query.refetch()} />;
  return <RecordContext.Provider value={{ resource, singular, id, data: query.data }}>
    <div className="reference-editor"><p className="reference-editor-context">{id ? 'تعديل السجل' : 'إضافة سجل'} · <Link to={`/${resource}`}>العودة للقائمة</Link></p>{children}</div>
  </RecordContext.Provider>;
}

export function useReferenceForm<T extends FieldValues, O extends FieldValues = T>(options: UseFormProps<T, unknown, O>) {
  const context = useContext(RecordContext);
  const values = context?.data && Object.fromEntries(Object.entries(context.data).map(([key, value]) => [key, value ?? '']));
  if (values && context?.resource === 'courses') {
    values.subject_type = values.path_grade_subject_id ? 'subject' : values.path_grade_subject_term_id ? 'subject_term' : 'learning_subject';
    for (const key of ['starting_date', 'end_date']) values[key] = String(values[key] || '').slice(0, 10);
  }
  return useForm<T, unknown, O>({ ...options, defaultValues: (values || options.defaultValues) as DefaultValues<T> });
}

export function useReferenceMutation<T extends FieldValues>() {
  const context = useContext(RecordContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: T) => {
      if (!context) throw new Error('Missing reference editor context');
      return context.id
        ? (await apiClient.put(`/${context.singular}/${context.id}`, payload)).data
        : (await apiClient.post(`/new-${context.singular}`, payload)).data;
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
