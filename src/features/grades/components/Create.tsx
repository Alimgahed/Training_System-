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
import { useGrade } from '../api/useGetQuery';
import type { Grade } from '../types';
import './directory.css';
const schema = z.object({
  code: z.coerce.number().int('الكود يجب أن يكون رقماً صحيحاً'),
  name: z.string().trim().min(1, 'هذا الحقل مطلوب'),
  grade_interval: z.coerce.number().int().nonnegative('المدة لا يمكن أن تكون سالبة'),

});

type FormInputs = z.infer<typeof schema>;
function GradeFields({id,record}:{id?:string;record?:Grade}) {
  const navigate=useNavigate();const cache=useQueryClient();const errorRef=useRef<HTMLDivElement>(null);
  const {register,handleSubmit,formState:{errors,isDirty}}=useForm<z.input<typeof schema>,unknown,FormInputs>({resolver:zodResolver(schema),defaultValues:{name:record?.name||'',code:Number(record?.code??0),grade_interval:Number(record?.grade_interval??0)}});
  const mutation=useMutation({mutationFn:(values:FormInputs)=>id?apiClient.put(`/grade/${id}`,values):apiClient.post('/new-grade',values),onSuccess:async()=>{await Promise.all([cache.invalidateQueries({queryKey:['grades']}),cache.invalidateQueries({queryKey:['grade',id]})]);navigate('/grades');}});
  useEffect(()=>{if(mutation.isError)errorRef.current?.focus();},[mutation.isError]);
  return <form className="grade-editor" noValidate onSubmit={handleSubmit(values=>mutation.mutate(values))} aria-busy={mutation.isPending}>
    {mutation.isError&&<div className="enterprise-form-error" role="alert" tabIndex={-1} ref={errorRef}><strong>لم تُحفظ الدرجة الوظيفية</strong><p>احتفظنا ببياناتك. تحقق من الاتصال والصلاحيات وأعد المحاولة.</p></div>}
    <Card title="بيانات الدرجة"><div className="grade-fields"><Input label="اسم الدرجة" required error={errors.name?.message} readOnly={mutation.isPending} {...register('name')}/><Input label="الكود" type="number" step={1} dir="ltr" helperText="كود رقمي صحيح؛ القيمة صفر مسموحة." error={errors.code?.message} readOnly={mutation.isPending} {...register('code')}/><Input label="المدة البينية" type="number" min={0} step={1} dir="ltr" helperText="عدد صحيح لا يقل عن صفر وفق الوحدة المعتمدة في النظام." error={errors.grade_interval?.message} readOnly={mutation.isPending} {...register('grade_interval')}/></div></Card>
    <footer className="enterprise-form-footer"><div><Button type="submit" isLoading={mutation.isPending}><Save size={18} aria-hidden="true"/>{id?'حفظ التغييرات':'إضافة الدرجة'}</Button><Link className="enterprise-link-button" to="/grades" aria-disabled={mutation.isPending} onClick={event=>{if(mutation.isPending)event.preventDefault();}}>إلغاء</Link></div><span role="status">{mutation.isPending?'جارٍ حفظ الدرجة…':isDirty?'تغييرات غير محفوظة':'اسم الدرجة مطلوب، والكود والمدة قيمتان صحيحتان'}</span></footer>
  </form>;
}
export function GradeCreate() {
  const {id}=useParams<{id:string}>();const query=useGrade(id||'');const title=id?'تعديل الدرجة الوظيفية':'إضافة درجة وظيفية';
  return <div className="enterprise-page"><nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/grades">الدرجات الوظيفية</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav><header className="enterprise-heading"><div><span className="enterprise-kicker">الموارد البشرية{id?` / سجل #${id}`:''}</span><h1>{title}</h1><p>أدخل الاسم والكود والمدة البينية المعتمدة للدرجة.</p></div><Link className="enterprise-link-button" to="/grades"><ArrowRight size={18} aria-hidden="true"/>العودة للقائمة</Link></header>{id&&query.isPending?<Card title="بيانات الدرجة"><EnterpriseSkeleton variant="fields" columns={3}/></Card>:id&&!query.data?<ErrorState title="تعذر فتح الدرجة للتعديل" onRetry={()=>query.refetch()}/>:<GradeFields key={id||'new'} id={id} record={query.data}/>}</div>;
}
