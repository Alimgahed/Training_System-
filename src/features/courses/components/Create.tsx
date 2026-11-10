import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { useForm, useWatch, type DefaultValues } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { ArrowRight, Save } from 'lucide-react';
import { apiClient } from '../../../core/api/apiClient';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { usePlannedCourses } from '../api/plannedCourses';
import { useCourse } from '../api/useGetQuery';
import type { Course, CreateCourseRequest } from '../types';
import { useLearningSubjects } from '../../learning-subjects/api/useListQuery';
import { useOrganizations } from '../../organizations/api/useListQuery';
import { usePathGradeSubjectTerms } from '../../path-grade-subject-terms/api/useListQuery';
import { usePathGradeSubjects } from '../../path-grade-subjects/api/useListQuery';
import { usePersons } from '../../persons/api/useListQuery';
import { useRooms } from '../../rooms/api/useListQuery';
import './course-editor.css';
const schema = z.object({
  name: z.string().trim().min(1, 'اسم الدورة/الكورس مطلوب'),
  duration_in_days: z.coerce.number().int('المدة يجب أن تكون عدداً صحيحاً').min(1, 'المدة بالأيام مطلوبة'),
  starting_date: z.string().min(1, 'تاريخ البداية مطلوب'),
  end_date: z.string().optional(),
  number_of_internal_participants: z.union([z.literal(''), z.coerce.number().int('العدد يجب أن يكون صحيحاً')]).optional().transform(value => value === '' || value === undefined ? null : value),
  number_of_external_participants: z.union([z.literal(''), z.coerce.number().int('العدد يجب أن يكون صحيحاً')]).optional().transform(value => value === '' || value === undefined ? null : value),
  cost: z.union([z.string(), z.number()]).optional().transform(value => String(value ?? '').trim() || '0').refine(value => /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value), 'أدخل تكلفة رقمية صحيحة'),
  
  is_planned: z.boolean().default(false),
  is_executed: z.boolean().default(false),
  planned_id: z.coerce.number().int().nonnegative().optional(),

  subject_type: z.enum(['subject', 'subject_term', 'learning_subject']),
  path_grade_subject_id: z.coerce.number().int().nonnegative().optional(),
  path_grade_subject_term_id: z.coerce.number().int().nonnegative().optional(),
  learning_subject_id: z.coerce.number().int().nonnegative().optional(),

  room_id: z.coerce.number().int().positive('اختر قاعة التدريب'),
  trainer_id: z.coerce.number().int().positive('اختر المدرب الأساسي'),
  backup_trainer_id: z.coerce.number().int().nonnegative().optional(),
  coordinator_id: z.coerce.number().int().nonnegative().optional(),
  funding_organization_id: z.coerce.number().int().nonnegative().optional(),
}).superRefine((data, ctx) => {
  for (const key of ['starting_date', 'end_date'] as const) {
    const value = data[key];
    if (value && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'أدخل تاريخاً صحيحاً', path: [key] });
    }
  }
  if (!data.is_planned && !data.is_executed) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'يجب أن يكون الكورس إما مخططاً أو منفذاً أو كلاهما', path: ['is_planned'] });
  }
  if (data.is_planned && data.is_executed && !data.planned_id) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'يجب اختيار الكورس المخطط الأساسي إذا كان هذا التنفيذ بناءً على خطة', path: ['planned_id'] });
  }
  if (data.subject_type === 'subject' && !data.path_grade_subject_id) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'يرجى اختيار مادة المسار', path: ['path_grade_subject_id'] });
  }
  if (data.subject_type === 'subject_term' && !data.path_grade_subject_term_id) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'يرجى اختيار مادة الترم', path: ['path_grade_subject_term_id'] });
  }
  if (data.subject_type === 'learning_subject' && !data.learning_subject_id) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'يرجى اختيار الموضوع التدريبي الحر', path: ['learning_subject_id'] });
  }
});

type FormInputs = z.infer<typeof schema>;

function Lookup({loading,failed,retry,label,children}:{loading:boolean;failed:boolean;retry:()=>unknown;label:string;children:ReactNode}) {
  return loading?<div className="course-lookup-loading"><span>{label}</span><EnterpriseSkeleton variant="fields" columns={1}/></div>:failed?<div role="alert" className="course-lookup-error"><span>تعذر تحميل {label}.</span><Button type="button" variant="outline" onClick={()=>retry()}>إعادة تحميل {label}</Button></div>:<>{children}</>;
}
function CourseFields({id,record}:{id?:string;record?:Course}) {
  const navigate=useNavigate();const cache=useQueryClient();const errorRef=useRef<HTMLDivElement>(null);
  const mutation=useMutation({mutationFn:(payload:CreateCourseRequest)=>id?apiClient.put(`/course/${id}`,payload):apiClient.post('/new-course',payload),onSuccess:async()=>{await Promise.all([cache.invalidateQueries({queryKey:['courses']}),cache.invalidateQueries({queryKey:['course',id]}),cache.invalidateQueries({queryKey:['planned-courses']}),cache.invalidateQueries({queryKey:['executed-courses']})]);}});
  const baseDefaults={name:'',duration_in_days:'',starting_date:'',end_date:'',number_of_internal_participants:'',number_of_external_participants:'',cost:'',planned_id:'',path_grade_subject_id:'',path_grade_subject_term_id:'',learning_subject_id:'',room_id:'',trainer_id:'',backup_trainer_id:'',coordinator_id:'',funding_organization_id:'',is_planned:false,is_executed:true,subject_type:'learning_subject'};
  const defaults=record?{...baseDefaults,...Object.fromEntries(Object.entries(record).map(([k,v])=>[k,v??''])),subject_type:record.path_grade_subject_id?'subject':record.path_grade_subject_term_id?'subject_term':'learning_subject',starting_date:record.starting_date?.slice(0,10)||'',end_date:record.end_date?.slice(0,10)||''}:baseDefaults;
  const {register,handleSubmit,control,setValue,formState:{errors,isDirty}}=useForm<z.input<typeof schema>,unknown,FormInputs>({resolver:zodResolver(schema),defaultValues:defaults as unknown as DefaultValues<z.input<typeof schema>>});
  const [isPlanned,isExecuted,subjectType]=useWatch({control,name:['is_planned','is_executed','subject_type']});
  const pgs=usePathGradeSubjects(subjectType==='subject');const terms=usePathGradeSubjectTerms(subjectType==='subject_term');const learning=useLearningSubjects(subjectType==='learning_subject');
  const roomQuery=useRooms();const peopleQuery=usePersons();const organizationQuery=useOrganizations();const planned=usePlannedCourses({},Boolean(isPlanned&&isExecuted));
  const trainers=useMemo(()=>peopleQuery.data?.filter(p=>p.is_trainer)||[],[peopleQuery.data]);
  const requiredSubject=subjectType==='subject'?pgs:subjectType==='subject_term'?terms:learning;
  const lookupsBlocked=requiredSubject.isLoading||requiredSubject.isError||roomQuery.isLoading||roomQuery.isError||peopleQuery.isLoading||peopleQuery.isError||Boolean(isPlanned&&isExecuted&&(planned.isLoading||planned.isError));
  const missingOptions=!requiredSubject.isLoading&&!requiredSubject.isError&&!requiredSubject.data?.length||!roomQuery.isLoading&&!roomQuery.isError&&!roomQuery.data?.length||!peopleQuery.isLoading&&!peopleQuery.isError&&!trainers.length||Boolean(isPlanned&&isExecuted&&!planned.isLoading&&!planned.isError&&!planned.data?.length);
  useEffect(()=>{if(mutation.isError)errorRef.current?.focus();},[mutation.isError]);
  const onSubmit = (data: FormInputs) => {
    const { subject_type, ...finalData } = data;
    if (subject_type !== 'subject') delete finalData.path_grade_subject_id;
    if (subject_type !== 'subject_term') delete finalData.path_grade_subject_term_id;
    if (subject_type !== 'learning_subject') delete finalData.learning_subject_id;
    if (!(data.is_planned && data.is_executed)) delete finalData.planned_id;
    if (!data.end_date) delete finalData.end_date;
    
    const payload: CreateCourseRequest = {
      ...finalData,
      starting_date: `${data.starting_date}T00:00:00Z`,
      ...(data.end_date ? { end_date: `${data.end_date}T00:00:00Z` } : {}),
      funding_organization_id: data.funding_organization_id || null,
      backup_trainer_id: data.backup_trainer_id || null,
      coordinator_id: data.coordinator_id || null,
    };
    mutation.mutate(payload, { onSuccess: () => navigate('/courses') });
  };
  const options=(values?:{id?:number;name?:string|null}[])=>values?.flatMap(item=>item.id==null?[]:[{value:item.id,label:item.name||`سجل #${item.id}`}])||[];
  return <form className="course-editor" onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={mutation.isPending}>
    {mutation.isError&&<div ref={errorRef} tabIndex={-1} role="alert" className="enterprise-form-error"><strong>لم تُحفظ الدورة</strong><p>احتفظنا بتغييراتك. راجع البيانات والاتصال والصلاحيات ثم أعد المحاولة.</p></div>}
    <fieldset disabled={mutation.isPending} className="course-editor-body"><legend className="sr-only">بيانات الدورة التدريبية</legend>
      <Card title="١. البيانات الأساسية"><div className="course-editor-grid"><Input label="اسم الدورة" required error={errors.name?.message} {...register('name')}/><Input label="المدة بالأيام" type="number" required step="1" error={errors.duration_in_days?.message} {...register('duration_in_days')}/></div></Card>
      <Card title="٢. الحالة ومحتوى التدريب"><div className="course-editor-section">
        <fieldset className="course-choice-group"><legend>حالة الدورة</legend><label><input type="checkbox" {...register('is_planned')}/>مدرجة في الخطة</label><label><input type="checkbox" {...register('is_executed')}/>منفذة</label></fieldset>
        {errors.is_planned&&<p role="alert" className="course-field-error">{errors.is_planned.message}</p>}
        {isPlanned&&isExecuted&&<Lookup label="الدورات المخططة" loading={planned.isLoading} failed={planned.isError} retry={planned.refetch}><Select label="الدورة المخططة الأصلية" required options={options(planned.data)} error={errors.planned_id?.message} {...register('planned_id')}/></Lookup>}
        <fieldset className="course-choice-group"><legend>نوع محتوى الدورة</legend><label><input type="radio" value="learning_subject" {...register('subject_type')}/>موضوع تدريبي حر</label><label><input type="radio" value="subject" {...register('subject_type')}/>مادة مسار</label><label><input type="radio" value="subject_term" {...register('subject_type')}/>مادة ترم</label></fieldset>
        {subjectType==='learning_subject'&&<Lookup label="المواضيع التدريبية" loading={learning.isLoading} failed={learning.isError} retry={learning.refetch}><Select label="الموضوع التدريبي" required options={options(learning.data)} error={errors.learning_subject_id?.message} {...register('learning_subject_id')}/>{!learning.data?.length&&<p role="status">لا يوجد محتوى تدريبي متاح لهذا النوع. اختر نوعاً آخر أو أضف بياناته إلى الدليل.</p>}</Lookup>}
        {subjectType==='subject'&&<Lookup label="مواد المسار" loading={pgs.isLoading} failed={pgs.isError} retry={pgs.refetch}><Select label="مادة المسار" required options={options(pgs.data)} error={errors.path_grade_subject_id?.message} {...register('path_grade_subject_id')}/>{!pgs.data?.length&&<p role="status">لا يوجد محتوى تدريبي متاح لهذا النوع. اختر نوعاً آخر أو أضف بياناته إلى الدليل.</p>}</Lookup>}
        {subjectType==='subject_term'&&<Lookup label="مواد الترم" loading={terms.isLoading} failed={terms.isError} retry={terms.refetch}><Select label="مادة الترم" required options={terms.data?.flatMap(t=>t.id==null?[]:[{value:t.id,label:t.code||`ترم #${t.id}`}])||[]} error={errors.path_grade_subject_term_id?.message} {...register('path_grade_subject_term_id')}/>{!terms.data?.length&&<p role="status">لا يوجد محتوى تدريبي متاح لهذا النوع. اختر نوعاً آخر أو أضف بياناته إلى الدليل.</p>}</Lookup>}
      </div></Card>
      <div className="course-editor-columns"><Card title="٣. المواعيد والمكان"><div className="course-editor-section"><Input label="تاريخ البداية" type="date" required error={errors.starting_date?.message} {...register('starting_date')} onInput={e=>setValue('starting_date',e.currentTarget.value,{shouldDirty:true})}/><Input label="تاريخ النهاية" type="date" error={errors.end_date?.message} {...register('end_date')} onInput={e=>setValue('end_date',e.currentTarget.value,{shouldDirty:true})}/><Lookup label="القاعات" loading={roomQuery.isLoading} failed={roomQuery.isError} retry={roomQuery.refetch}><Select label="قاعة التدريب" required options={options(roomQuery.data)} error={errors.room_id?.message} {...register('room_id')}/>{!roomQuery.data?.length&&<p role="status">لا توجد قاعات متاحة. <Link to="/rooms/new">إضافة قاعة تدريب</Link></p>}</Lookup></div></Card>
      <Card title="٤. فريق التدريب"><div className="course-editor-section"><Lookup label="الموظفين والمدربين" loading={peopleQuery.isLoading} failed={peopleQuery.isError} retry={peopleQuery.refetch}><Select label="المدرب الأساسي" required options={options(trainers)} error={errors.trainer_id?.message} {...register('trainer_id')}/><Select label="المدرب الاحتياطي" options={options(trainers)} error={errors.backup_trainer_id?.message} {...register('backup_trainer_id')}/><Select label="منسق الدورة" options={options(peopleQuery.data)} error={errors.coordinator_id?.message} {...register('coordinator_id')}/>{!trainers.length&&<p role="status">لا يوجد موظف مسجل كمدرب. <Link to="/persons">راجع بيانات الموظفين</Link></p>}</Lookup></div></Card></div>
      <Card title="٥. المشاركون والتمويل"><div className="course-editor-grid"><Input label="عدد المشاركين الداخليين" type="number" step="1" error={errors.number_of_internal_participants?.message} {...register('number_of_internal_participants')}/><Input label="عدد المشاركين الخارجيين" type="number" step="1" error={errors.number_of_external_participants?.message} {...register('number_of_external_participants')}/><Input label="التكلفة" type="number" step="any" error={errors.cost?.message} {...register('cost')}/><Lookup label="جهات التمويل" loading={organizationQuery.isLoading} failed={organizationQuery.isError} retry={organizationQuery.refetch}><Select label="الجهة الممولة" options={options(organizationQuery.data)} error={errors.funding_organization_id?.message} {...register('funding_organization_id')}/></Lookup></div><p className="course-editor-note">أعداد المشاركين وجهة التمويل والمدرب الاحتياطي والمنسق حقول اختيارية. اترك العدد فارغاً إذا لم يُحدد بعد.</p></Card>
    </fieldset>
    <footer className="enterprise-form-footer"><div><Button type="submit" isLoading={mutation.isPending} disabled={lookupsBlocked||missingOptions}><Save size={18} aria-hidden="true"/>{id?'حفظ تغييرات الدورة':'حفظ الدورة التدريبية'}</Button><Link className="enterprise-link-button" to="/courses" aria-disabled={mutation.isPending} onClick={e=>{if(mutation.isPending)e.preventDefault();}}>إلغاء</Link></div><span role="status">{mutation.isPending?'جارٍ حفظ الدورة…':lookupsBlocked?'أكمل تحميل القوائم المطلوبة قبل الحفظ':missingOptions?'لا تتوفر خيارات لازمة للحفظ؛ راجع القوائم المطلوبة':isDirty?'تغييرات غير محفوظة':'الحقول المحددة بعلامة النجمة مطلوبة'}</span></footer>
  </form>;
}
export function CourseCreate() {
  const {id}=useParams();const record=useCourse(id||'');const title=id?'تعديل الدورة التدريبية':'تأسيس دورة تدريبية';
  return <div className="enterprise-page"><nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/courses">الدورات التدريبية</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav><header className="enterprise-heading"><div><span className="enterprise-kicker">إدارة التدريب / {id?`دورة ${id}`:'دورة جديدة'}</span><h1>{title}</h1><p>حدد معلومات الدورة وحالتها ومحتواها، ثم أكمل الموعد والفريق والتمويل.</p></div><Link className="enterprise-link-button" to="/courses"><ArrowRight size={18} aria-hidden="true"/>العودة للدورات</Link></header>{id&&record.isPending?<div className="course-editor"><Card title="بيانات الدورة"><EnterpriseSkeleton variant="fields" columns={4}/></Card></div>:id&&record.isError?<ErrorState title="تعذر فتح الدورة للتعديل" onRetry={()=>record.refetch()}/>:<CourseFields key={id||'new'} id={id} record={record.data}/>}</div>;
}
