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
import { useCountry } from '../api/useGetQuery';

const schema = z.object({ name: z.string().trim().min(1, 'اسم الدولة مطلوب') });
type FormInputs = z.infer<typeof schema>;

function CountryForm({ id, name }: { id?: string; name: string }) {
  const navigate = useNavigate();
  const cache = useQueryClient();
  const errorRef = useRef<HTMLDivElement>(null);
  const mutation = useMutation({
    mutationFn: (payload: FormInputs) => id ? apiClient.put(`/country/${id}`, payload) : apiClient.post('/new-country', payload),
    onSuccess: async () => {
      await Promise.all([cache.invalidateQueries({ queryKey: ['countries'] }), cache.invalidateQueries({ queryKey: ['country', id] })]);
      navigate('/countries');
    },
  });
  useEffect(() => { if (mutation.isError) errorRef.current?.focus(); }, [mutation.isError]);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<FormInputs>({ resolver: zodResolver(schema), defaultValues: { name } });
  return <form className="enterprise-country-form" onSubmit={handleSubmit(payload => mutation.mutate(payload))} noValidate aria-busy={mutation.isPending}>
    {mutation.isError && <div ref={errorRef} tabIndex={-1} role="alert" className="enterprise-form-error"><strong>لم تُحفظ البيانات</strong><p>تحقق من الاتصال والصلاحيات ثم أعد المحاولة. احتفظنا بالتغييرات التي أدخلتها.</p></div>}
    <Card title="بيانات الدولة"><div className="enterprise-country-field"><Input label="اسم الدولة" required placeholder="مثال: جمهورية مصر العربية" helperText="اكتب الاسم المعتمد ليظهر بوضوح في قوائم المحافظات والمواقع." error={errors.name?.message} readOnly={mutation.isPending} {...register('name')} /></div></Card>
    <footer className="enterprise-form-footer"><div><Button type="submit" isLoading={mutation.isPending}><Save size={18} aria-hidden="true" />{id ? 'حفظ التغييرات' : 'إضافة الدولة'}</Button><Link className="enterprise-link-button" to="/countries" aria-disabled={mutation.isPending} onClick={event => { if (mutation.isPending) event.preventDefault(); }}>إلغاء</Link></div><span role="status">{mutation.isPending ? 'جارٍ الحفظ…' : isDirty ? 'تغييرات غير محفوظة' : 'اسم الدولة حقل مطلوب'}</span></footer>
  </form>;
}

export function CountryCreate() {
  const { id } = useParams<{ id: string }>();
  const query = useCountry(id || '');
  const title = id ? 'تعديل الدولة' : 'إضافة دولة';
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/countries">الدول</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">البيانات الجغرافية{id ? ` / سجل ${id}` : ''}</span><h1>{title}</h1><p>{id ? 'حدّث الاسم المعتمد للدولة مع الحفاظ على ارتباطاتها بالمحافظات.' : 'أضف دولة إلى الدليل لاستخدامها في بيانات المحافظات والمواقع.'}</p></div><Link className="enterprise-link-button" to="/countries"><ArrowRight size={18} aria-hidden="true" />العودة للقائمة</Link></header>
    {id && query.isPending ? <div className="enterprise-country-form"><Card title="بيانات الدولة"><div className="enterprise-country-field"><EnterpriseSkeleton variant="fields" columns={1} /></div></Card></div> : id && !query.data ? <ErrorState title="تعذر فتح الدولة للتعديل" message="تحقق من الاتصال وتوفر السجل ثم أعد المحاولة، أو ارجع للقائمة." onRetry={() => query.refetch()} /> : <CountryForm key={id || 'new'} id={id} name={query.data?.name || ''} />}
  </div>;
}
