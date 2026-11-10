import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Save } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useExecutedCourses } from '../../courses/api/executedCourses';
import type { Course } from '../../courses/types';
import { createCourseSession } from '../api/create';
import { updateCourseSession } from '../api/update';
import { useCourseSession } from '../api/useGetQuery';
import type { CourseSession } from '../types';
import { sessionDay } from '../utils/schedule';
import './session-form.css';
const timePattern=/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
const schema=z.object({course_id:z.coerce.number().int().min(1,'اختر الدورة المنفذة'),session_date:z.string().refine(value=>sessionDay(value)!==null,'أدخل تاريخ جلسة صالحاً'),start_time:z.string().regex(timePattern,'أدخل وقت البدء'),end_time:z.string().regex(timePattern,'أدخل وقت الانتهاء')});
type Values=z.infer<typeof schema>;
function SessionFields({id,record,courses}:{id?:string;record?:CourseSession;courses:Course[]}) {
  const navigate=useNavigate();const cache=useQueryClient();const errorRef=useRef<HTMLDivElement>(null);
  const {register,handleSubmit,setValue,setError,formState:{errors,isDirty}}=useForm<Values>({resolver:zodResolver(schema),defaultValues:{course_id:record?.course_id||0,session_date:sessionDay(record?.session_date)||'',start_time:record?.start_time||'',end_time:record?.end_time||''}});
  const cancelTo=id?`/course-sessions/${id}`:'/course-sessions';
  const mutation=useMutation({mutationFn:(values:Values)=>id?updateCourseSession(Number(id),values):createCourseSession(values),onSuccess:async()=>{await Promise.all([cache.invalidateQueries({queryKey:['course-sessions']}),cache.invalidateQueries({queryKey:['course-session',id]})]);navigate(cancelTo);}});
  useEffect(()=>{if(mutation.isError)errorRef.current?.focus();},[mutation.isError]);
  const submit=(values:Values)=>{if(!courses.some(course=>Number(course.id)===values.course_id)){setError('course_id',{message:'اختر دورة متاحة من قائمة الدورات المنفذة'},{shouldFocus:true});return;}mutation.mutate(values);};
  return <form className="session-editor" noValidate aria-busy={mutation.isPending} onSubmit={handleSubmit(submit)}>
    {mutation.isError&&<div className="enterprise-form-error" role="alert" tabIndex={-1} ref={errorRef}><strong>لم يُحفظ موعد الجلسة</strong><p>احتفظنا بتغييراتك. تحقق من الاتصال والصلاحيات ثم أعد المحاولة.</p></div>}
    <Card title="الدورة وموعد الانعقاد"><div className="session-editor-fields">
      <div className="session-editor-wide"><Select label="الدورة التدريبية المنفذة" required disabled={mutation.isPending||!courses.length} error={errors.course_id?.message} options={courses.flatMap(c=>c.id==null?[]:[{value:c.id,label:`${c.name||'دورة'} (#${c.id})`}])} {...register('course_id')}/><p className="session-editor-hint">{courses.length?'تتاح الجدولة للدورات المنفذة فقط، وفقاً لقواعد النظام.':'لا توجد دورات منفذة متاحة للجدولة.'}</p></div>
      <div className="session-editor-wide"><Input label="تاريخ الجلسة" type="date" required readOnly={mutation.isPending} error={errors.session_date?.message} {...register('session_date')} onInput={e=>setValue('session_date',e.currentTarget.value,{shouldDirty:true})}/></div>
      <Input label="وقت البدء" type="time" step="1" required readOnly={mutation.isPending} error={errors.start_time?.message} {...register('start_time')} onInput={e=>setValue('start_time',e.currentTarget.value,{shouldDirty:true})}/>
      <Input label="وقت الانتهاء" type="time" step="1" required readOnly={mutation.isPending} error={errors.end_time?.message} {...register('end_time')} onInput={e=>setValue('end_time',e.currentTarget.value,{shouldDirty:true})}/>
    </div></Card>
    <footer className="enterprise-form-footer"><div><Button type="submit" disabled={!courses.length} isLoading={mutation.isPending}><Save size={18} aria-hidden="true"/>{id?'حفظ التغييرات':'حفظ وجدولة الجلسة'}</Button><Link className="enterprise-link-button" to={cancelTo} aria-disabled={mutation.isPending} onClick={e=>{if(mutation.isPending)e.preventDefault();}}>إلغاء</Link></div><span role="status">{mutation.isPending?'جارٍ حفظ الموعد…':isDirty?'تغييرات غير محفوظة':'جميع الحقول مطلوبة'}</span></footer>
  </form>;
}
export function SessionForm({id}:{id?:string}) {
  const record=useCourseSession(id||'');const courses=useExecutedCourses();
  const loading=Boolean(id&&record.isPending)||courses.isPending;
  const failed=Boolean(id&&record.isError)||courses.isError;
  const title=id?'تعديل الجلسة التدريبية':'جدولة جلسة تدريبية جديدة';
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/course-sessions">الجلسات التدريبية</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">إدارة التدريب / {id?`جلسة ${id}`:'موعد جديد'}</span><h1>{title}</h1><p>حدد الدورة المنفذة وتاريخ الجلسة ووقت بدايتها وانتهائها.</p></div><Link className="enterprise-link-button" to="/course-sessions"><ArrowRight size={18} aria-hidden="true"/>العودة للجدول</Link></header>
    {loading?<div className="session-editor"><Card title="الدورة وموعد الانعقاد"><EnterpriseSkeleton variant="fields" columns={4}/></Card></div>:failed?<ErrorState title="تعذر تجهيز موعد الجلسة" message="تعذر تحميل بيانات الجلسة أو قائمة الدورات المنفذة. أعد المحاولة قبل الحفظ." onRetry={()=>{if(id)void record.refetch();void courses.refetch();}}/>:<SessionFields key={id||'new'} id={id} record={record.data} courses={courses.data||[]}/>}
  </div>;
}
