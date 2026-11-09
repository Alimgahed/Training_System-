import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { referenceResources } from '../../app/referenceRoutes';
import { apiClient } from '../../core/api/apiClient';
import { Button } from './Button';

export function ReferenceActions({ placement = 'page' }: { placement?: 'page' | 'toolbar' }) {
  const { pathname } = useLocation();
  const [resource, id, mode] = pathname.split('/').filter(Boolean);
  const singular = resource === 'courses' ? 'course' : resource === 'trainer-subjects' ? 'trainer-subject' : referenceResources[resource];
  const navigate = useNavigate();
  const cache = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => apiClient.delete(`/${singular}/${id}`),
    onSuccess: async () => { await cache.invalidateQueries(); navigate(`/${resource}`); },
  });
  if ((!id && placement !== 'toolbar') || (id && placement === 'toolbar')) return null;
  if (!singular || id === 'new' || mode || (!id && resource === 'courses')) return null;
  return <div className="reference-actions">
    {!id ? <Link to={`/${resource}/new`}><Button><Plus size={17} />إضافة سجل</Button></Link> : <>
      <Link to={`/${resource}/${id}/edit`}><Button variant="outline"><Pencil size={17} />تعديل</Button></Link>
      <Button variant="danger" isLoading={mutation.isPending} onClick={() => { if (window.confirm('حذف هذا السجل نهائياً؟ قد يرفض النظام الحذف إذا كان مرتبطاً ببيانات أخرى.')) mutation.mutate(); }}><Trash2 size={17} />حذف</Button>
    </>}
    {mutation.isError && <p role="alert">تعذر الحذف. قد يكون السجل مرتبطاً ببيانات أخرى أو ليست لديك الصلاحية.</p>}
  </div>;
}
