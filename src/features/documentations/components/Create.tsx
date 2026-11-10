import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm, type DefaultValues } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { apiClient } from '../../../core/api/apiClient';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCourseSessions } from '../../course-sessions/api/useListQuery';
import { useCourses } from '../../courses/api/useListQuery';
import { useDocumentationTypes } from '../../documentation-types/api/useListQuery';
import { useLearningSubjects } from '../../learning-subjects/api/useListQuery';
import { usePathGradeSubjectTerms } from '../../path-grade-subject-terms/api/useListQuery';
import { usePathGradeSubjects } from '../../path-grade-subjects/api/useListQuery';
import { useDocumentation } from '../api/useGetQuery';
import type { Documentation } from '../types';
import './document-editor.css';
const schema = z.object({
  name: z.string().trim().min(1, 'هذا الحقل مطلوب'),
  file_path: z.string().min(1, 'هذا الحقل مطلوب'),
  documentation_type_id: z.coerce.number().int().nonnegative(),
  learning_subject_id: z.coerce.number().int().nonnegative(),
  path_grade_subject_id: z.coerce.number().int().nonnegative(),
  path_grade_subject_term_id: z.coerce.number().int().nonnegative(),
  course_id: z.coerce.number().int().nonnegative(),
  course_session_id: z.coerce.number().int().nonnegative(),

}).refine(data => [data.learning_subject_id, data.path_grade_subject_id, data.path_grade_subject_term_id, data.course_id, data.course_session_id].filter(Boolean).length === 1, { message: 'اختر جهة ارتباط واحدة فقط للوثيقة من الحقول التالية', path: ['learning_subject_id'] });

type FormInputs = z.infer<typeof schema>;
const relationFields = ['learning_subject_id','path_grade_subject_id','path_grade_subject_term_id','course_id','course_session_id'] as const;
type Relation = typeof relationFields[number];
const relationLabels: Record<Relation,string> = { learning_subject_id:'موضوع تدريبي', path_grade_subject_id:'مادة درجة المسار', path_grade_subject_term_id:'مادة فصل تدريبي', course_id:'دورة تدريبية', course_session_id:'جلسة تدريبية' };
function DocumentForm({ id, record }: { id?:string; record?:Documentation }) {
  const existing = relationFields.filter(key=>record?.[key]);
  const [relation,setRelation] = useState<Relation|''>(existing.length===1?existing[0]:'');
  const subjects=useLearningSubjects(relation==='learning_subject_id');
  const grades=usePathGradeSubjects(relation==='path_grade_subject_id');
  const terms=usePathGradeSubjectTerms(relation==='path_grade_subject_term_id');
  const courses=useCourses(relation==='course_id');
  const sessions=useCourseSessions(relation==='course_session_id');
  const types=useDocumentationTypes();
  const lookup=relation==='learning_subject_id'?subjects:relation==='path_grade_subject_id'?grades:relation==='path_grade_subject_term_id'?terms:relation==='course_id'?courses:sessions;
  const { register,handleSubmit,setValue,formState:{errors,isDirty} }=useForm<z.input<typeof schema>,unknown,FormInputs>({resolver:zodResolver(schema),defaultValues:{name:record?.name||'',file_path:record?.file_path||'',documentation_type_id:record?.documentation_type_id||'',...Object.fromEntries(relationFields.map(key=>[key,record?.[key]||0]))} as unknown as DefaultValues<z.input<typeof schema>>});
  const navigate=useNavigate();const cache=useQueryClient();const errorRef=useRef<HTMLDivElement>(null);
  const mutation=useMutation({mutationFn:(values:FormInputs)=>{
    const payload=Object.fromEntries(Object.entries(values).map(([key,value])=>[key,key.endsWith('_id')&&value===0?null:value]));
    return id?apiClient.put(`/documentation/${id}`,payload):apiClient.post('/new-documentation',payload);
  },onSuccess:async()=>{await Promise.all([cache.invalidateQueries({queryKey:['documentations']}),cache.invalidateQueries({queryKey:['documentation',id]})]);navigate('/documentations');}});
  useEffect(()=>{if(mutation.isError)errorRef.current?.focus();},[mutation.isError]);
  const options=(lookup.data||[]).filter(item=>item.id!=null).map(item=>({value:item.id!,label:String(item.name||item.code||(relation==='course_session_id'?`جلسة #${item.id} · ${item.session_date||'بدون تاريخ'}`:`سجل #${item.id}`))}));
  if(relation&&record?.[relation]&&!options.some(item=>item.value===record[relation]))options.push({value:record[relation]!,label:`السجل الحالي #${record[relation]}`});
  const typeOptions=(types.data||[]).filter(item=>item.id!=null).map(item=>({value:item.id!,label:item.name||`نوع #${item.id}`}));
  if(record?.documentation_type_id&&!typeOptions.some(item=>item.value===record.documentation_type_id))typeOptions.push({value:record.documentation_type_id,label:`النوع الحالي #${record.documentation_type_id}`});
  const blocked=!!relation&&(lookup.isPending||lookup.isError||!options.length);
  return <form className="document-editor" noValidate onSubmit={handleSubmit(values=>mutation.mutate(values))} aria-busy={mutation.isPending}>
    {mutation.isError&&<div className="enterprise-form-error" role="alert" tabIndex={-1} ref={errorRef}><strong>لم تُحفظ الوثيقة</strong><p>تحقق من الاتصال والصلاحيات وأعد المحاولة. احتفظنا بالبيانات المدخلة.</p></div>}
    <fieldset disabled={mutation.isPending}><Card title="بيانات الوثيقة"><div className="document-editor-grid"><Input label="اسم الوثيقة" required placeholder="مثال: دليل السلامة المهنية" error={errors.name?.message} {...register('name')}/><Input label="مسار الملف" required dir="auto" placeholder="/uploads/document.pdf" helperText="أدخل مسار الملف المسجّل في النظام." error={errors.file_path?.message} {...register('file_path')}/><div>{types.isPending?<><span>نوع الوثيقة (اختياري)</span><EnterpriseSkeleton variant="fields" columns={1}/></>:<Select label="نوع الوثيقة (اختياري)" options={typeOptions} error={errors.documentation_type_id?.message} {...register('documentation_type_id')}/ >}{types.isError&&<div role="status" className="document-lookup-note">تعذر تحميل الأنواع؛ يمكنك الاحتفاظ بالنوع الحالي أو تركه فارغاً.<Button variant="ghost" onClick={()=>types.refetch()}>إعادة تحميل الأنواع</Button></div>}</div></div></Card>
    <Card title="ارتباط الوثيقة"><div className="document-editor-grid"><p className="document-editor-intro">اربط الوثيقة بجهة واحدة فقط من بيانات التدريب.</p><Select label="جهة الارتباط" value={relation} error={!relation?errors.learning_subject_id?.message:undefined} options={relationFields.map(key=>({value:key,label:relationLabels[key]}))} onChange={event=>{const next=event.target.value as Relation|'';setRelation(next);relationFields.forEach(key=>setValue(key,0,{shouldDirty:true}));}}/>
    {relation&&(lookup.isPending?<div><span>تحميل {relationLabels[relation]}</span><EnterpriseSkeleton variant="fields" columns={1}/></div>:lookup.isError?<ErrorState title="تعذر تحميل قائمة الارتباط" message="يمكنك إعادة المحاولة دون فقد البيانات المدخلة." onRetry={()=>lookup.refetch()}/>:<div><Select key={relation} label={`اختر ${relationLabels[relation]}`} options={options} error={errors[relation]?.message||errors.learning_subject_id?.message} {...register(relation)}/>{!options.length&&<p role="status" className="document-lookup-note">لا توجد سجلات متاحة لهذه الجهة. اختر جهة أخرى أو أضف سجلاتها أولاً.</p>}</div>)}
    {existing.length>1&&!relation&&<p className="document-lookup-note" role="status">السجل الحالي مرتبط بأكثر من جهة. اختر جهة واحدة قبل الحفظ وفق قاعدة النموذج الحالية.</p>}
    </div></Card></fieldset>
    <footer className="enterprise-form-footer"><div><Button type="submit" disabled={blocked} isLoading={mutation.isPending}><Save size={18} aria-hidden="true"/>{id?'حفظ التغييرات':'إضافة الوثيقة'}</Button><Link className="enterprise-link-button" to="/documentations" aria-disabled={mutation.isPending} onClick={event=>{if(mutation.isPending)event.preventDefault();}}>إلغاء</Link></div><span role="status">{mutation.isPending?'جارٍ حفظ الوثيقة…':isDirty?'تغييرات غير محفوظة':'الاسم ومسار الملف وجهة ارتباط واحدة مطلوبة'}</span></footer>
  </form>;
}
export function DocumentationCreate() {
  const {id}=useParams<{id:string}>();const query=useDocumentation(id||'');const title=id?'تعديل الوثيقة':'إضافة وثيقة';
  return <div className="enterprise-page"><nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">لوحة التحكم</Link><span aria-hidden="true">/</span><Link to="/documentations">الوثائق والمستندات</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav><header className="enterprise-heading"><div><span className="enterprise-kicker">الوثائق والأرشفة{id?` / سجل #${id}`:''}</span><h1>{title}</h1><p>سجّل بيانات الملف واختر التصنيف والجهة التدريبية المرتبطة به.</p></div><Link className="enterprise-link-button" to="/documentations"><ArrowRight size={18} aria-hidden="true"/>العودة للقائمة</Link></header>{id&&query.isPending?<Card title="بيانات الوثيقة"><EnterpriseSkeleton variant="fields" columns={5}/></Card>:id&&!query.data?<ErrorState title="تعذر فتح الوثيقة للتعديل" onRetry={()=>query.refetch()}/>:<DocumentForm key={id||'new'} id={id} record={query.data}/>}</div>;
}
