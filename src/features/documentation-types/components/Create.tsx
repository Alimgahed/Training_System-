import '../../../shared/components/training-workspace.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Save, Files } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { apiClient } from '../../../core/api/apiClient';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Input } from '../../../shared/components/Input';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useDocumentationType } from '../api/useGetQuery';

const schema = z.object({ name: z.string().trim().min(1, 'اسم نوع الوثيقة مطلوب') });
type FormInputs = z.infer<typeof schema>;

function DocumentationTypeForm({ id, name }: { id?: string; name: string }) {
  const navigate = useNavigate();
  const cache = useQueryClient();
  const errorRef = useRef<HTMLDivElement>(null);
  const mutation = useMutation({
    mutationFn: (payload: FormInputs) => id ? apiClient.put(`/documentation-type/${id}`, payload) : apiClient.post('/new-documentation-type', payload),
    onSuccess: async () => {
      await Promise.all([cache.invalidateQueries({ queryKey: ['documentation-types'] }), cache.invalidateQueries({ queryKey: ['documentation-type', id] })]);
      navigate('/documentation-types');
    },
  });
  useEffect(() => { if (mutation.isError) errorRef.current?.focus(); }, [mutation.isError]);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<FormInputs>({ resolver: zodResolver(schema), defaultValues: { name } });
  return <form className="enterprise-country-form" onSubmit={handleSubmit(payload => mutation.mutate(payload))} noValidate aria-busy={mutation.isPending}>
    {mutation.isError && <div ref={errorRef} tabIndex={-1} role="alert" className="enterprise-form-error"><strong>لم تُحفظ البيانات</strong><p>تحقق من الاتصال والصلاحيات ثم أعد المحاولة. احتفظنا بالتغييرات التي أدخلتها.</p></div>}
    <Card title="بيانات نوع الوثيقة" action={<Files size={21} aria-hidden="true"/>}><div className="enterprise-country-field"><Input label="اسم نوع الوثيقة" required placeholder="مثال: شهادة إتمام تدريب" helperText="استخدم اسماً واضحاً يميّز هذا النوع عند تصنيف الوثائق." error={errors.name?.message} readOnly={mutation.isPending} {...register('name')} /></div></Card>
    <footer className="enterprise-form-footer"><div><Button type="submit" isLoading={mutation.isPending}><Save size={18} aria-hidden="true" />{id ? 'حفظ التغييرات' : 'إضافة نوع الوثيقة'}</Button><Link className="enterprise-link-button" to="/documentation-types" aria-disabled={mutation.isPending} onClick={event => { if (mutation.isPending) event.preventDefault(); }}>إلغاء</Link></div><span role="status">{mutation.isPending ? 'جارٍ الحفظ…' : isDirty ? 'تغييرات غير محفوظة' : 'اسم نوع الوثيقة حقل مطلوب'}</span></footer>
  </form>;
}

export function DocumentationTypeCreate() {
  const { id } = useParams<{ id: string }>();
  const query = useDocumentationType(id || '');
  const title = id ? 'تعديل نوع الوثيقة' : 'إضافة نوع وثيقة';
  return <div className="enterprise-page training-workspace training-editor training-editor--compact">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/documentation-types">أنواع الوثائق</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
    <header className="enterprise-heading"><div className="training-page-title"><span className="training-page-icon"><Files size={28} aria-hidden="true"/></span><div><span className="enterprise-kicker">الوثائق والأرشفة{id ? ` / سجل ${id}` : ''}</span><h1>{title}</h1><p>{id ? 'حدّث اسم التصنيف مع الحفاظ على ارتباطه بالوثائق الحالية.' : 'أضف تصنيفاً مرجعياً لاستخدامه عند إنشاء الوثائق وأرشفتها.'}</p></div></div><Link className="enterprise-link-button" to="/documentation-types"><ArrowRight size={18} aria-hidden="true" />العودة للقائمة</Link></header>
    {id && query.isPending ? <div className="enterprise-country-form"><Card title="بيانات نوع الوثيقة" action={<Files size={21} aria-hidden="true"/>}><div className="enterprise-country-field"><EnterpriseSkeleton variant="fields" columns={1} /></div></Card></div> : id && !query.data ? <ErrorState title="تعذر فتح نوع الوثيقة للتعديل" message="تحقق من الاتصال وتوفر السجل ثم أعد المحاولة، أو ارجع للقائمة." onRetry={() => query.refetch()} /> : <DocumentationTypeForm key={id || 'new'} id={id} name={query.data?.name || ''} />}
  </div>;
}
