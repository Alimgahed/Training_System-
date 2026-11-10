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
import { useOrganizations } from '../../organizations/api/useListQuery';
import type { Organization } from '../../organizations/types';
import { useDepartment } from '../api/useGetQuery';
import type { Department } from '../types';
import './departments.css';
const schema=z.object({code:z.string().min(1,'كود الإدارة مطلوب'),name:z.string().trim().min(1,'اسم الإدارة مطلوب'),organization_id:z.coerce.number().int().positive('اختر الجهة التابعة لها')});
type Values=z.infer<typeof schema>;
function DepartmentFields({id,record,organizations}:{id?:string;record?:Department;organizations:Organization[]}) {
  const navigate=useNavigate();const cache=useQueryClient();const errorRef=useRef<HTMLDivElement>(null);
  const {register,handleSubmit,formState:{errors,isDirty}}=useForm<Values>({resolver:zodResolver(schema),defaultValues:{code:record?.code||'',name:record?.name||'',organization_id:record?.organization_id||0}});
  const mutation=useMutation({mutationFn:(values:Values)=>id?apiClient.put(`/department/${id}`,values):apiClient.post('/new-department',values),onSuccess:async()=>{await Promise.all([cache.invalidateQueries({queryKey:['departments']}),cache.invalidateQueries({queryKey:['department',id]})]);navigate('/departments');}});
  useEffect(()=>{if(mutation.isError)errorRef.current?.focus();},[mutation.isError]);
  return <form className="department-editor" onSubmit={handleSubmit(values=>mutation.mutate(values))} noValidate aria-busy={mutation.isPending}>
    {mutation.isError&&<div ref={errorRef} tabIndex={-1} role="alert" className="enterprise-form-error"><strong>لم تُحفظ الإدارة</strong><p>احتفظنا ببياناتك. تحقق من الكود والصلاحيات والاتصال ثم أعد المحاولة.</p></div>}
    <Card title="بيانات الإدارة"><div className="department-editor-fields"><Input label="اسم الإدارة" required error={errors.name?.message} readOnly={mutation.isPending} {...register('name')}/><Input label="كود الإدارة" required helperText="استخدم الكود المعتمد في الهيكل التنظيمي." error={errors.code?.message} readOnly={mutation.isPending} {...register('code')}/><Select label="الجهة التابعة لها" required options={organizations.flatMap(o=>o.id==null?[]:[{value:o.id,label:o.name||o.code||`جهة #${o.id}`}])} disabled={mutation.isPending||!organizations.length} error={errors.organization_id?.message} {...register('organization_id')}/>{!organizations.length&&<p role="status">لا توجد جهات متاحة. أضف جهة إلى الدليل قبل إنشاء الإدارة.</p>}</div></Card>
    <footer className="enterprise-form-footer"><div><Button type="submit" isLoading={mutation.isPending} disabled={!organizations.length}><Save size={18} aria-hidden="true"/>{id?'حفظ التغييرات':'إضافة الإدارة'}</Button><Link className="enterprise-link-button" to="/departments" aria-disabled={mutation.isPending} onClick={e=>{if(mutation.isPending)e.preventDefault();}}>إلغاء</Link></div><span role="status">{mutation.isPending?'جارٍ حفظ الإدارة…':isDirty?'تغييرات غير محفوظة':'الاسم والكود والجهة حقول مطلوبة'}</span></footer>
  </form>;
}
export function DepartmentCreate() {
  const {id}=useParams();const record=useDepartment(id||'');const organizations=useOrganizations();const title=id?'تعديل الإدارة':'إضافة إدارة';
  const loading=Boolean(id&&record.isPending)||organizations.isPending;
  const failed=Boolean(id&&record.isError&&!record.data)||(organizations.isError&&!organizations.data);
  return <div className="enterprise-page"><nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/departments">الإدارات</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav><header className="enterprise-heading"><div><span className="enterprise-kicker">الهيكل التنظيمي / {id?`إدارة ${id}`:'سجل جديد'}</span><h1>{title}</h1><p>حدد الاسم والكود المعتمدين واربط الإدارة بالجهة التابعة لها.</p></div><Link className="enterprise-link-button" to="/departments"><ArrowRight size={18} aria-hidden="true"/>العودة للإدارات</Link></header>
    {loading?<div className="department-editor"><Card title="بيانات الإدارة"><EnterpriseSkeleton variant="fields" columns={3}/></Card></div>:failed?<ErrorState title="تعذر تجهيز بيانات الإدارة" message="تعذر تحميل الإدارة أو الجهات المتاحة. أعد المحاولة قبل الحفظ." onRetry={()=>{if(id)void record.refetch();void organizations.refetch();}}/>:<DepartmentFields key={id||'new'} id={id} record={record.data} organizations={organizations.data||[]}/>}
  </div>;
}
