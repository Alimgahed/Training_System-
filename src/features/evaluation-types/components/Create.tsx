import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Save } from 'lucide-react';
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
import { useEvaluationType } from '../api/useGetQuery';
import './directory.css';

const schema = z.object({ name: z.string().trim().min(1, 'اسم نوع التقييم مطلوب'), should_repeat: z.boolean() });
type FormInputs = z.infer<typeof schema>;

function EvaluationTypeForm({ id, name, repeat }: { id?: string; name: string; repeat: boolean }) {
  const navigate = useNavigate();
  const cache = useQueryClient();
  const errorRef = useRef<HTMLDivElement>(null);
  const mutation = useMutation({
    mutationFn: (payload: FormInputs) => id ? apiClient.put(`/evaluation-type/${id}`, payload) : apiClient.post('/new-evaluation-type', payload),
    onSuccess: async () => {
      await Promise.all([cache.invalidateQueries({ queryKey: ['evaluation-types'] }), cache.invalidateQueries({ queryKey: ['evaluation-type', id] })]);
      navigate('/evaluation-types');
    },
  });
  useEffect(() => { if (mutation.isError) errorRef.current?.focus(); }, [mutation.isError]);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<FormInputs>({ resolver: zodResolver(schema), defaultValues: { name, should_repeat: repeat } });
  return <form className="enterprise-country-form" onSubmit={handleSubmit(payload => mutation.mutate(payload))} noValidate aria-busy={mutation.isPending}>
    {mutation.isError && <div ref={errorRef} tabIndex={-1} role="alert" className="enterprise-form-error"><strong>لم تُحفظ البيانات</strong><p>تحقق من الاتصال والصلاحيات ثم أعد المحاولة. احتفظنا بالتغييرات التي أدخلتها.</p></div>}
    <Card title="بيانات نوع التقييم"><div className="enterprise-country-field"><Input label="اسم نوع التقييم" required placeholder="مثال: تقييم نهائي" helperText="اكتب الاسم المعتمد لنوع التقييم." error={errors.name?.message} readOnly={mutation.isPending} {...register('name')} /><label className="evaluation-repeat"><input type="checkbox" disabled={mutation.isPending} {...register('should_repeat')} /><span>يلزم إعادة الدورة عند عدم الاجتياز</span></label></div></Card>
    <footer className="enterprise-form-footer"><div><Button type="submit" isLoading={mutation.isPending}><Save size={18} aria-hidden="true" />{id ? 'حفظ التغييرات' : 'إضافة نوع التقييم'}</Button><Link className="enterprise-link-button" to="/evaluation-types" aria-disabled={mutation.isPending} onClick={event => { if (mutation.isPending) event.preventDefault(); }}>إلغاء</Link></div><span role="status">{mutation.isPending ? 'جارٍ الحفظ…' : isDirty ? 'تغييرات غير محفوظة' : 'اسم نوع التقييم حقل مطلوب'}</span></footer>
  </form>;
}

export function EvaluationTypeCreate() {
  const { id } = useParams<{ id: string }>();
  const query = useEvaluationType(id || '');
  const title = id ? 'تعديل نوع التقييم' : 'إضافة نوع تقييم';
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/evaluation-types">أنواع التقييم</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">شئون المتدربين / التقييم{id ? ` / سجل ${id}` : ''}</span><h1>{title}</h1><p>{id ? 'حدّث الاسم وسياسة إعادة الدورة لهذا النوع من التقييم.' : 'أضف نوع تقييم وحدّد سياسة إعادة الدورة عند عدم الاجتياز.'}</p></div><Link className="enterprise-link-button" to="/evaluation-types"><ArrowRight size={18} aria-hidden="true" />العودة للقائمة</Link></header>
    {id && query.isPending ? <div className="enterprise-country-form"><Card title="بيانات نوع التقييم"><div className="enterprise-country-field"><EnterpriseSkeleton variant="fields" columns={2} /></div></Card></div> : id && !query.data ? <ErrorState title="تعذر فتح نوع التقييم للتعديل" message="تحقق من الاتصال وتوفر السجل ثم أعد المحاولة، أو ارجع للقائمة." onRetry={() => query.refetch()} /> : <EvaluationTypeForm key={id || 'new'} id={id} name={query.data?.name || ''} repeat={query.data?.should_repeat === true} />}
  </div>;
}
