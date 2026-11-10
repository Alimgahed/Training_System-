import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { apiClient } from '../../core/api/apiClient';
import { Button } from '../components/Button';
import { Dialog } from '../components/Dialog';
import './enterprise.css';

/** Opt-in, contextual record actions. Delete is only sent after explicit confirmation. */
export function RecordActions({ resource, singular, id, name }: { resource: string; singular: string; id: string; name: string }) {
  const [confirming, setConfirming] = useState(false);
  const cache = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => apiClient.delete(`/${singular}/${id}`),
    onSuccess: async () => {
      await cache.invalidateQueries({ queryKey: [resource] });
      cache.removeQueries({ queryKey: [singular, id] });
      navigate(`/${resource}`);
    },
  });
  const close = () => { if (!mutation.isPending) { setConfirming(false); mutation.reset(); } };
  return <div className="enterprise-record-actions">
    <Link className="enterprise-link-button" to={`/${resource}/${id}/edit`}><Pencil size={16} aria-hidden="true" />تعديل</Link>
    <Button variant="ghost" onClick={() => setConfirming(true)}><Trash2 size={16} aria-hidden="true" />حذف</Button>
    <Dialog isOpen={confirming} onClose={close} title="تأكيد حذف السجل" description="راجع السجل قبل الحذف." actions={<><Button variant="outline" disabled={mutation.isPending} onClick={close}>إلغاء</Button><Button variant="danger" isLoading={mutation.isPending} onClick={() => mutation.mutate()}>تأكيد الحذف</Button></>}>
      <p>هل تريد حذف <strong>{name}</strong>؟ لا يمكن التراجع عن الحذف من هذه الشاشة. قد يرفض النظام حذف سجل مرتبط ببيانات أخرى.</p>
      {mutation.isError && <p role="alert" className="enterprise-mutation-error">تعذر الحذف. قد توجد بيانات مرتبطة أو صلاحيات غير كافية. يمكنك إعادة المحاولة أو الإلغاء.</p>}
      <span role="status">{mutation.isPending ? 'جارٍ حذف السجل…' : ''}</span>
    </Dialog>
  </div>;
}
