import '../../../shared/components/training-workspace.css';
import { Table } from '../../../shared/components/Table';
import { ErrorState } from '../../../shared/components/ErrorState';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation,useQuery,useQueryClient } from '@tanstack/react-query';
import { Award,CheckCircle2,ClipboardCheck,Pencil,Save,Trash2,X } from 'lucide-react';
import { useMemo,useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthStore } from '../../../core/store/useAuthStore';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { useCourseParticipants } from '../../course-participants/api/useListQuery';
import { useExecutedCourses } from '../../courses/api/executedCourses';
import { usePerformanceEvaluationCategorys } from '../../performance-evaluation-categories/api/useListQuery';
import { usePerformanceEvaluationParticipantCategorys } from '../../performance-evaluation-participant-categories/api/useListQuery';
import { useParticipantTypes } from '../../participant-types/api/useListQuery';
import {
createPerformanceEvaluation,deletePerformanceEvaluation,getAvailableEvaluationItems,
getCourseEvaluationDetails,getCourseParticipantEvaluationDetails,updatePerformanceEvaluation,
type EvaluationRecordType,type PerformanceEvaluationRecord,
} from '../api';

const schema = z.object({
  course_id: z.coerce.number().min(1, 'اختر الدورة المنفذة'),
  category_id: z.coerce.number().min(1, 'اختر فئة التقييم'),
  target: z.enum(['course', 'participant']),
  course_participant_id: z.coerce.number().optional(),
  item_id: z.coerce.number().min(1, 'اختر بند التقييم'),
  score: z.coerce.number().min(0, 'الدرجة يجب ألا تقل عن صفر'),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;
type EditingRecord = { id: number; type: EvaluationRecordType } | null;

function currentUserId(token: string | null): number | undefined {
  try {
    if (!token) return undefined;
    const part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return Number(JSON.parse(atob(part)).user_id) || undefined;
  } catch { return undefined; }
}

function apiError(error: unknown) {
  const response = (error as { response?: { status?: number; data?: { error?: string; message?: string } } })?.response;
  if (response?.status === 403) return 'لا تملك صلاحية إضافة هذا التقييم لهذا الدور في الدورة المحددة.';
  return response?.data?.message || response?.data?.error || 'تعذر حفظ التقييم. راجع الدرجة والاختيارات ثم أعد المحاولة.';
}

export function PerformanceEvaluationWorkspace() {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const userId = currentUserId(token);
  const [editing, setEditing] = useState<EditingRecord>(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { target: 'course' } });
  const courseId = Number(watch('course_id')) || 0;
  const categoryId = Number(watch('category_id')) || 0;
  const itemId = Number(watch('item_id')) || 0;

  const { data: courses = [], isLoading: loadingCourses, isError: coursesError, refetch: retryCourses } = useExecutedCourses();
  const { data: categories = [], isLoading: loadingCategories, isError: categoriesError, refetch: retryCategories } = usePerformanceEvaluationCategorys();
  const { data: participantCategories = [] } = usePerformanceEvaluationParticipantCategorys();
  const { data: participantTypes = [] } = useParticipantTypes();
  const { data: participants = [], isLoading: loadingParticipants } = useCourseParticipants();
  const { data: availableItems = [], isLoading: loadingItems, isError: itemsError, refetch: retryItems } = useQuery({
    queryKey: ['available-performance-evaluation-items', courseId, categoryId],
    queryFn: () => getAvailableEvaluationItems({ course_id: courseId, performance_evaluation_category_id: categoryId }),
    enabled: courseId > 0 && categoryId > 0,
  });
  const { data: courseRows = [], isLoading: loadingCourseRows, isError: courseRowsError, refetch: retryCourseRows } = useQuery({ queryKey: ['performance-evaluation-course-details'], queryFn: getCourseEvaluationDetails });
  const { data: participantRows = [], isLoading: loadingParticipantRows, isError: participantRowsError, refetch: retryParticipantRows } = useQuery({ queryKey: ['performance-evaluation-course-participant-details'], queryFn: getCourseParticipantEvaluationDetails });

  const selectedItem = availableItems.find((entry) => Number(entry.id) === itemId);
  const item = selectedItem?.performance_evaluation_item || selectedItem;
  const minimumScore = item?.minimum_score == null ? undefined : Number(item.minimum_score);
  const maximumScore = item?.maximum_score == null ? undefined : Number(item.maximum_score);
  const selectedCategory = categories.find((category: any) => Number(category.id) === categoryId);
  const isExamEvaluation = /امتحان|اختبار/.test(selectedCategory?.name || '');
  const participantCategory = participantCategories.find(category => Number(category.id) === Number(selectedItem?.performance_evaluation_participant_category_id));
  const roleName = participantTypes.find(type => Number(type.id) === Number(participantCategory?.participant_type_id))?.name;
  const target = roleName === 'متدرب' || (roleName === 'منسق تدريب' && isExamEvaluation) ? 'participant' : 'course';
  const requiresParticipant = roleName === 'منسق تدريب' && isExamEvaluation;
  const selectedCourseParticipants = useMemo(() => participants.filter((entry: any) => Number(entry.course_id) === courseId), [participants, courseId]);
  const records = useMemo(() => [
    ...courseRows.map((row) => ({ ...row, __type: 'course' as const })),
    ...participantRows.map((row) => ({ ...row, __type: 'course-participant' as const })),
  ].sort((a, b) => String(b.entered_at || '').localeCompare(String(a.entered_at || ''))), [courseRows, participantRows]);

  const invalidateRecords = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['performance-evaluation-course-details'] }),
      queryClient.invalidateQueries({ queryKey: ['performance-evaluation-course-participant-details'] }),
    ]);
  };
  const saveMutation = useMutation({
    mutationFn: ({ values, editingRecord }: { values: FormValues; editingRecord: EditingRecord }) => {
      const participantId = values.target === 'participant' ? Number(values.course_participant_id) : undefined;
      const payload = {
        ...(participantId ? { course_participant_id: participantId } : { course_id: values.course_id }),
        performance_evaluation_participant_category_item_id: values.item_id,
        score: values.score,
        ...(values.notes ? { notes: values.notes } : {}),
      };
      return editingRecord
        ? updatePerformanceEvaluation(editingRecord.id, editingRecord.type, payload)
        : createPerformanceEvaluation(payload);
    },
    onSuccess: async () => { await invalidateRecords(); reset({ target: 'course' }); setEditing(null); setError(''); setMessage('تم حفظ التقييم.'); },
    onError: (cause) => { setMessage(''); setError(apiError(cause)); },
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id, type }: { id: number; type: EvaluationRecordType }) => deletePerformanceEvaluation(id, type),
    onSuccess: async () => { await invalidateRecords(); setError(''); setMessage('تم حذف التقييم.'); },
    onError: (cause) => { setMessage(''); setError(apiError(cause)); },
  });

  const onSubmit = (values: FormValues) => {
    if (!selectedItem || loadingItems) { setError('اختر بنداً متاحاً لدورك في الدورة والفئة المحددتين.'); return; }
    if (requiresParticipant && !selectedCourseParticipants.some(entry => Number(entry.id) === Number(values.course_participant_id))) {
      setError('اختر المتدرب المسجل بالدورة لتقييم الامتحان.'); setMessage(''); return;
    }
    const outOfRange = (minimumScore != null && values.score < minimumScore) || (maximumScore != null && values.score > maximumScore);
    if (outOfRange) { setError(`الدرجة يجب أن تكون ضمن حدود البند: الحد الأدنى ${minimumScore ?? 'غير محدد'} والحد الأقصى ${maximumScore ?? 'غير محدد'} لهذا البند.`); setMessage(''); return; }
    if (!roleName) { setError('تعذر تحديد دور بند التقييم. أعد اختيار البند بعد تحميل البيانات.'); return; }
    if (editing && editing.type !== (target === 'participant' ? 'course-participant' : 'course')) { setError('لا يمكن نقل التقييم بين نطاق الدورة والمتدرب.'); return; }
    setError(''); setMessage(''); saveMutation.mutate({ values: { ...values, target, course_participant_id: requiresParticipant ? values.course_participant_id : undefined }, editingRecord: editing });
  };

  const beginEdit = (record: PerformanceEvaluationRecord & { __type: EvaluationRecordType }) => {
    const itemIdValue = record.performance_evaluation_participant_category_item_id || record.performance_evaluation_participant_category_item?.id || 0;
    setEditing({ id: record.id, type: record.__type });
    setValue('course_id', record.course_id || record.course?.id || record.course_participant?.course_id || 0);
    const participantCategoryId = record.performance_evaluation_participant_category_item?.performance_evaluation_participant_category_id;
    setValue('category_id', Number(participantCategories.find(category => Number(category.id) === Number(participantCategoryId))?.performance_evaluation_category_id || 0));
    setValue('target', record.__type === 'course' ? 'course' : 'participant');
    setValue('course_participant_id', record.course_participant_id || 0);
    setValue('item_id', itemIdValue);
    setValue('score', record.score);
    setValue('notes', record.notes || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const cancelEdit = () => { setEditing(null); reset({ target: 'course' }); };
  const visibleRecords = records.filter(record => (!courseId || Number(record.course_id || record.course?.id || record.course_participant?.course_id) === courseId) && [record.course?.name,record.course_participant?.person?.name,record.performance_evaluation_participant_category_item?.performance_evaluation_item?.name,record.score].join(' ').toLocaleLowerCase('ar').includes(search.trim().toLocaleLowerCase('ar')));

  return (
    <div className="evaluation-workspace training-workspace">
      <nav className="people-breadcrumb"><a href="/">الرئيسية</a><span>‹</span><span>شئون المتدربين والتقييم</span><span>‹</span><strong>تقييم الأداء</strong></nav>
      <header className="people-header"><div><h1>تقييم الأداء التدريبي</h1><p>أدخل الدرجات ضمن البنود المتاحة لدورك في الدورة، وتابع التقييمات المسجلة.</p></div><span className="evaluation-access-note"><ClipboardCheck size={17} /> البنود المتاحة تتحدد حسب صلاحيتك</span></header>
      {message && <div className="user-feedback is-success" role="status">{message}</div>}{error && <div className="user-feedback is-error" role="alert">{error}</div>}

      <section className="evaluation-entry-card">
        <header><span><Award size={23} /></span><div><h2>{editing ? 'تعديل تقييم' : 'إضافة تقييم جديد'}</h2><p>اختر الدورة والفئة أولاً لعرض بنود التقييم المسموح بها.</p></div></header>
        <form onSubmit={handleSubmit(onSubmit)} aria-busy={saveMutation.isPending}><fieldset className="training-entry-fields" disabled={saveMutation.isPending}><legend className="visually-hidden">بيانات التقييم</legend>
          {(coursesError||categoriesError||itemsError)&&<div className="enterprise-form-error" role="alert">تعذر تحميل بعض قوائم التقييم. <Button type="button" variant="outline" onClick={()=>{if(coursesError)void retryCourses();if(categoriesError)void retryCategories();if(itemsError)void retryItems();}}>إعادة تحميل القوائم</Button></div>}
          <div className="evaluation-form-grid">
            <Select label="الدورة التدريبية المنفذة *" error={errors.course_id?.message} isLoading={loadingCourses} options={courses.map((course: any) => ({ value: course.id ?? "", label: course.name || `دورة #${course.id}` }))} {...register('course_id')} />
            <Select label="فئة التقييم *" error={errors.category_id?.message} isLoading={loadingCategories} options={categories.map((category: any) => ({ value: category.id ?? "", label: category.name || `فئة #${category.id}` }))} {...register('category_id')} />
            <p className="evaluation-hint">نطاق التقييم يتحدد تلقائياً حسب دورك والبند المحدد.</p>
            {requiresParticipant && <Select label="المتدرب محل التقييم *" error={errors.course_participant_id?.message} isLoading={loadingParticipants} options={selectedCourseParticipants.map((participant: any) => ({ value: participant.id ?? "", label: participant.person?.name || `مشارك #${participant.id}` }))} {...register('course_participant_id')} />}
            <Select label="بند التقييم المتاح *" error={errors.item_id?.message} isLoading={loadingItems} disabled={!courseId || !categoryId} options={availableItems.map((entry) => { const detail = entry.performance_evaluation_item || entry; return { value: entry.id ?? "", label: `${detail.name || entry.name || `بند #${entry.id}`} (${detail.minimum_score ?? '—'}–${detail.maximum_score ?? '—'})` }; })} {...register('item_id')} />
            <Input label="الدرجة *" type="number" min={minimumScore} max={maximumScore} step="any" error={errors.score?.message} {...register('score')} />
            <Input label="ملاحظات" placeholder="ملاحظات إضافية (اختياري)" {...register('notes')} />
          </div>
          {target === 'participant' && (isExamEvaluation ? <p className="evaluation-hint">هذا تقييم امتحان مرتبط بمتدرب. اختر المشارك المسجل في الدورة.</p> : <p className="evaluation-hint">سيحدد النظام تسجيلك بالدورة تلقائياً حسب حسابك.</p>)}
          {selectedItem && <p className="evaluation-hint">حدود الدرجة المسجلة: الحد الأدنى {minimumScore ?? 'غير محدد'}، والحد الأقصى {maximumScore ?? 'غير محدد'}.</p>}
          <div className="evaluation-form-actions"><Button type="submit" disabled={loadingCourses||loadingCategories||loadingItems||coursesError||categoriesError||itemsError||!selectedItem} isLoading={saveMutation.isPending || isSubmitting}><Save size={17} />{editing ? 'حفظ التعديلات' : 'حفظ التقييم'}</Button>{editing && <Button type="button" variant="ghost" onClick={cancelEdit}><X size={17} />إلغاء التعديل</Button>}</div>
        </fieldset></form>
      </section>

      <section className="evaluation-records-card">
        <header><div><h2>التقييمات المسجلة</h2><p>يمكن تعديل أو حذف السجلات التي أدخلتها أنت فقط.</p></div><span className="evaluation-count">{loadingCourseRows||loadingParticipantRows?'جارٍ التحميل…':courseRowsError||participantRowsError?'غير متاح':`${visibleRecords.length} سجل`}</span></header>
        <div className="training-record-search"><label className="training-search"><span>البحث في التقييمات</span><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="الدورة أو المتدرب أو بند التقييم"/></label></div>
        {courseRowsError || participantRowsError ? <ErrorState title="تعذر تحميل التقييمات" onRetry={()=>{void retryCourseRows();void retryParticipantRows();}}/> : <Table key={`${courseId}:${search}`} isLoading={loadingCourseRows||loadingParticipantRows} data={visibleRecords.map(record=>({...record,id:`${record.__type}-${record.id}`,recordId:record.id}))} compact showOverview={false} emptyTitle="لا توجد تقييمات مطابقة" columns={[
          {header:'الدورة',accessor:r=>r.course?.name||r.course_id||'—'},
          {header:'المتدرب',accessor:r=>r.course_participant?.person?.name||r.course_participant_id||(r.__type==='course'?'الدورة بالكامل':'—')},
          {header:'البند',accessor:r=>r.performance_evaluation_participant_category_item?.performance_evaluation_item?.name||r.performance_evaluation_participant_category_item_id||'—'},
          {header:'الدرجة',accessor:'score'},
          {header:'مسجل بواسطة',accessor:r=>r.entered_by??'—'},
          {header:'التاريخ',accessor:r=>r.entered_at&&Number.isFinite(Date.parse(r.entered_at))?new Date(r.entered_at).toLocaleDateString('ar-EG'):'—'},
          {header:'إجراءات',accessor:r=>userId!==undefined&&Number(r.entered_by)===userId?<div className="evaluation-row-actions"><Button size="sm" variant="outline" disabled={saveMutation.isPending} aria-label="تعديل التقييم" onClick={()=>beginEdit({...r,id:r.recordId})}><Pencil size={16}/></Button><Button size="sm" variant="danger" aria-label="حذف التقييم" isLoading={deleteMutation.isPending} onClick={()=>{if(window.confirm('هل تريد حذف هذا التقييم؟'))deleteMutation.mutate({id:r.recordId,type:r.__type});}}><Trash2 size={16}/></Button></div>:<span className="evaluation-readonly"><CheckCircle2 size={15}/>للعرض فقط</span>},
        ]}/>}

      </section>
    </div>
  );
}
