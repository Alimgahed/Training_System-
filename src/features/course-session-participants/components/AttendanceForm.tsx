import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Save } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Select } from '../../../shared/components/Select';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCourseParticipants } from '../../course-participants/api/useListQuery';
import type { CourseParticipant } from '../../course-participants/types';
import { useCourseSessions } from '../../course-sessions/api/useListQuery';
import type { CourseSession } from '../../course-sessions/types';
import { examDate } from '../../course-participant-final-exams/utils/results';
import { createCourseSessionParticipant } from '../api/create';
import { updateCourseSessionParticipant } from '../api/update';
import { useCourseSessionParticipant } from '../api/useGetQuery';
import type { CourseSessionParticipant } from '../types';
import './attendance.css';
const schema = z.object({course_session_id:z.coerce.number().int().min(1,'اختر الجلسة التدريبية'),course_participant_id:z.coerce.number().int().min(1,'اختر متدرباً مسجلاً في دورة الجلسة')});
type Values = z.infer<typeof schema>;
function AttendanceFields({id,record,sessions,participants}:{id?:string;record?:CourseSessionParticipant;sessions:CourseSession[];participants:CourseParticipant[]}) {
  const navigate=useNavigate();
  const cache=useQueryClient();
  const errorRef=useRef<HTMLDivElement>(null);
  const {register,handleSubmit,control,setValue,setError,formState:{errors,isDirty}}=useForm<Values>({resolver:zodResolver(schema),defaultValues:{course_session_id:record?.course_session_id||0,course_participant_id:record?.course_participant_id||0}});
  const sessionId=Number(useWatch({ control, name: 'course_session_id' }));
  const selectedSession=useMemo(()=>sessions.find(s=>s.id===sessionId),[sessions,sessionId]);
  const eligible=useMemo(()=>participants.filter(p=>selectedSession?.course_id!=null&&Number(p.course_id)===Number(selectedSession.course_id)),[participants,selectedSession]);
  const cancelTo=id?`/course-session-participants/${id}`:'/course-session-participants';
  const mutation=useMutation({mutationFn:(values:Values)=>id?updateCourseSessionParticipant(Number(id),values):createCourseSessionParticipant(values),onSuccess:async()=>{await Promise.all([cache.invalidateQueries({queryKey:['course-session-participants']}),cache.invalidateQueries({queryKey:['course-session-participant',id]})]);navigate(cancelTo);}});
  useEffect(()=>{if(mutation.isError)errorRef.current?.focus();},[mutation.isError]);
  const submit=(values:Values)=>{
    if(!selectedSession){setError('course_session_id',{message:'اختر جلسة متاحة من القائمة'},{shouldFocus:true});return;}
    if(!eligible.some(p=>p.id===values.course_participant_id)){setError('course_participant_id',{message:'اختر متدرباً من دورة الجلسة الحالية'},{shouldFocus:true});return;}
    mutation.mutate(values);
  };
  return <form className="attendance-form" onSubmit={handleSubmit(submit)} noValidate aria-busy={mutation.isPending}>
    {mutation.isError&&<div className="enterprise-form-error" tabIndex={-1} role="alert" ref={errorRef}><strong>لم يُحفظ تسجيل الحضور</strong><p>احتفظنا باختياراتك. تحقق من الاتصال والصلاحيات أو وجود تسجيل مكرر ثم أعد المحاولة.</p></div>}
    <Card title="ربط المتدرب بالجلسة"><div className="attendance-fields">
      <Select label="الجلسة التدريبية" required disabled={mutation.isPending} error={errors.course_session_id?.message} options={sessions.flatMap(s=>s.id==null?[]:[{value:s.id,label:`جلسة #${s.id} · ${examDate(s.session_date)} · ${s.start_time||'—'}–${s.end_time||'—'} · دورة #${s.course_id ?? '—'}`}])} {...register('course_session_id',{onChange:()=>setValue('course_participant_id',0,{shouldDirty:true})})}/>
      <p className="attendance-hint">١. اختر الجلسة لتحديد الدورة والمتدربين المؤهلين.</p>
      <Select label="المتدرب المسجل بالدورة" required disabled={!selectedSession||mutation.isPending||!eligible.length} error={errors.course_participant_id?.message} options={eligible.flatMap(p=>p.id==null?[]:[{value:p.id,label:p.person?.name?`${p.person.name} · مشاركة #${p.id}`:`مشارك #${p.id}`}])} {...register('course_participant_id')}/>
      <p className="attendance-hint" role="status">{!sessions.length?'لا توجد جلسات متاحة. أضف جلسة قبل تسجيل الحضور.':!selectedSession?'٢. اختر الجلسة أولاً لعرض المتدربين المسجلين بدورتها.':eligible.length?`${eligible.length.toLocaleString('ar-EG')} متدرب مؤهل من الدورة #${selectedSession.course_id}. تغيير الجلسة يمسح اختيار المتدرب.`:'لا يوجد متدربون مسجلون في دورة هذه الجلسة.'}</p>
    </div></Card>
    <footer className="enterprise-form-footer"><div><Button type="submit" isLoading={mutation.isPending} disabled={!sessions.length}><Save size={18} aria-hidden="true"/>{id?'حفظ التغييرات':'تسجيل الحضور'}</Button><Link className="enterprise-link-button" to={cancelTo} aria-disabled={mutation.isPending} onClick={e=>{if(mutation.isPending)e.preventDefault();}}>إلغاء</Link></div><span role="status">{mutation.isPending?'جارٍ حفظ الحضور…':isDirty?'تغييرات غير محفوظة':'الجلسة والمتدرب حقول مطلوبة'}</span></footer>
  </form>;
}
export function AttendanceForm({id}:{id?:string}) {
  const record=useCourseSessionParticipant(id||'');
  const sessions=useCourseSessions();
  const participants=useCourseParticipants();
  const loading=Boolean(id&&record.isPending)||sessions.isPending||participants.isPending;
  const failed=Boolean(id&&record.isError)||sessions.isError||participants.isError;
  const title=id?'تعديل تسجيل الحضور':'تسجيل حضور متدرب';
  return <div className="enterprise-page">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/course-session-participants">حضور جلسات التدريب</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
    <header className="enterprise-heading"><div><span className="enterprise-kicker">شئون التدريب والعمليات / {id?`سجل ${id}`:'تسجيل جديد'}</span><h1>{title}</h1><p>سجّل حضور متدرب في جلسة من دورته. تُعرض تسجيلات الدورة المرتبطة بالجلسة فقط.</p></div><Link className="enterprise-link-button" to="/course-session-participants"><ArrowRight size={18} aria-hidden="true"/>العودة للسجلات</Link></header>
    {loading?<div className="attendance-form"><Card title="ربط المتدرب بالجلسة"><EnterpriseSkeleton variant="fields" columns={2}/></Card></div>:failed?<ErrorState title="تعذر تجهيز تسجيل الحضور" message="لم نتمكن من تحميل السجل أو قوائم الجلسات والمتدربين. أعد المحاولة قبل الحفظ." onRetry={()=>{if(id)void record.refetch();void sessions.refetch();void participants.refetch();}}/>:<AttendanceFields key={id||'new'} id={id} record={record.data} sessions={sessions.data||[]} participants={participants.data||[]}/>}
  </div>;
}
