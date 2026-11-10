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
import { Select } from '../../../shared/components/Select';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCountrys } from '../../countries/api/useListQuery';
import type { Country } from '../../countries/types';
import { useGovernorate } from '../api/useGetQuery';
import type { Governorate } from '../types';
import './governorates.css';
const schema=z.object({name:z.string().trim().min(1,'اسم المحافظة مطلوب'),country_id:z.coerce.number().int().positive('اختر الدولة')});
type Values=z.infer<typeof schema>;
function GovernorateFields({id,record,countries}:{id?:string;record?:Governorate;countries:Country[]}) {
  const navigate=useNavigate();const cache=useQueryClient();const errorRef=useRef<HTMLDivElement>(null);
  const {register,handleSubmit,formState:{errors,isDirty}}=useForm<Values>({resolver:zodResolver(schema),defaultValues:{name:record?.name||'',country_id:record?.country_id||0}});
  const mutation=useMutation({mutationFn:(values:Values)=>id?apiClient.put(`/governorate/${id}`,values):apiClient.post('/new-governorate',values),onSuccess:async()=>{await Promise.all([cache.invalidateQueries({queryKey:['governorates']}),cache.invalidateQueries({queryKey:['governorate',id]})]);navigate('/governorates');}});
  useEffect(()=>{if(mutation.isError)errorRef.current?.focus();},[mutation.isError]);
  return <form className="governorate-editor" onSubmit={handleSubmit(values=>mutation.mutate(values))} noValidate aria-busy={mutation.isPending}>
    {mutation.isError&&<div ref={errorRef} tabIndex={-1} role="alert" className="enterprise-form-error"><strong>لم تُحفظ المحافظة</strong><p>احتفظنا ببياناتك. تحقق من الصلاحيات والاتصال ثم أعد المحاولة.</p></div>}
    <Card title="بيانات المحافظة"><div className="governorate-editor-fields"><Input label="اسم المحافظة" required error={errors.name?.message} readOnly={mutation.isPending} {...register('name')}/><Select label="الدولة" required options={countries.flatMap(o=>o.id==null?[]:[{value:o.id,label:o.name||`دولة #${o.id}`}])} disabled={mutation.isPending||!countries.length} error={errors.country_id?.message} {...register('country_id')}/>{!countries.length&&<p role="status">لا توجد دول متاحة. أضف دولة إلى الدليل قبل إنشاء المحافظة.</p>}</div></Card>
    <footer className="enterprise-form-footer"><div><Button type="submit" isLoading={mutation.isPending} disabled={!countries.length}><Save size={18} aria-hidden="true"/>{id?'حفظ التغييرات':'إضافة المحافظة'}</Button><Link className="enterprise-link-button" to="/governorates" aria-disabled={mutation.isPending} onClick={e=>{if(mutation.isPending)e.preventDefault();}}>إلغاء</Link></div><span role="status">{mutation.isPending?'جارٍ حفظ المحافظة…':isDirty?'تغييرات غير محفوظة':'الاسم والدولة حقول مطلوبة'}</span></footer>
  </form>;
}
export function GovernorateCreate() {
  const {id}=useParams();const record=useGovernorate(id||'');const countries=useCountrys();const title=id?'تعديل المحافظة':'إضافة محافظة';
  const loading=Boolean(id&&record.isPending)||countries.isPending;
  const failed=Boolean(id&&record.isError&&!record.data)||(countries.isError&&!countries.data);
  return <div className="enterprise-page"><nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/governorates">المحافظات</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav><header className="enterprise-heading"><div><span className="enterprise-kicker">البيانات الجغرافية / {id?`محافظة ${id}`:'سجل جديد'}</span><h1>{title}</h1><p>حدّد اسم المحافظة والدولة التابعة لها.</p></div><Link className="enterprise-link-button" to="/governorates"><ArrowRight size={18} aria-hidden="true"/>العودة للمحافظات</Link></header>
    {loading?<div className="governorate-editor"><Card title="بيانات المحافظة"><EnterpriseSkeleton variant="fields" columns={2}/></Card></div>:failed?<ErrorState title="تعذر تجهيز بيانات المحافظة" message="تعذر تحميل المحافظة أو الدول المتاحة. أعد المحاولة قبل الحفظ." onRetry={()=>{if(id)void record.refetch();void countries.refetch();}}/>:<GovernorateFields key={id||'new'} id={id} record={record.data} countries={countries.data||[]}/>}
  </div>;
}
