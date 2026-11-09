import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { ArrowDownUp,Award,Pencil,Plus,Save,Trash2,UserRound } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Select } from '../../../shared/components/Select';
import { useEvaluationTypes } from '../../evaluation-types/api/useListQuery';
import { useLearningTerms } from '../../learning-terms/api/useListQuery';
import { usePathGrades } from '../../path-grades/api/useListQuery';
import { usePersons } from '../../persons/api/useListQuery';
import { createPathGradeCandidate } from '../api/create';
import { updatePathGradeCandidate } from '../api/update';
import { useDeletePathGradeCandidateMutation } from '../api/useDeleteMutation';
import { usePathGradeCandidates } from '../api/useListQuery';
import type { PathGradeCandidate,PathGradeCandidateRequest } from '../types';

const schema = z.object({
  person_id: z.coerce.number().min(1, 'اختر الموظف المرشح'),
  path_grade_id: z.coerce.number().min(1, 'اختر المسار والدرجة'),
  term_id: z.coerce.number().min(1, 'اختر الفصل التدريبي'),
  final_evaluation_id: z.coerce.number().min(1, 'اختر التقييم النهائي'),
});
type Values = z.infer<typeof schema>;

export function PathGradeCandidateList() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const { data: candidates = [], isLoading, isError, refetch } = usePathGradeCandidates();
  const { data: persons = [], isLoading: loadingPersons } = usePersons();
  const { data: pathGrades = [], isLoading: loadingPathGrades } = usePathGrades();
  const { data: terms = [], isLoading: loadingTerms } = useLearningTerms();
  const { data: evaluations = [], isLoading: loadingEvaluations } = useEvaluationTypes();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema) });
  const deleteMutation = useDeletePathGradeCandidateMutation();
  const saveMutation = useMutation({
    mutationFn: ({ payload, id }: { payload: PathGradeCandidateRequest; id: number | null }) => id ? updatePathGradeCandidate(id, payload) : createPathGradeCandidate(payload),
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['path-grade-candidates'] }); setEditingId(null); reset(); },
  });

  const editCandidate = (candidate: PathGradeCandidate) => {
    if (!candidate.id) return;
    setEditingId(candidate.id);
    setValue('person_id', Number(candidate.person_id || candidate.person?.id || 0));
    setValue('path_grade_id', Number(candidate.path_grade_id || candidate.path_grade?.id || 0));
    setValue('term_id', Number(candidate.term_id || candidate.term?.id || 0));
    setValue('final_evaluation_id', Number(candidate.final_evaluation_id || candidate.final_evaluation?.id || 0));
  };

  const onSubmit = (values: Values) => saveMutation.mutate({ payload: values, id: editingId });
  const pathGradeLabel = (entry: any) => entry.learning_path?.name && entry.grade?.name ? `${entry.learning_path.name} · ${entry.grade.name}` : `درجة مسار #${entry.id}`;

  return (
    <div className="candidate-page">
      <nav className="people-breadcrumb"><a href="/">الرئيسية</a><span>‹</span><span>شئون المتدربين والتقييم</span><span>‹</span><strong>المرشحون للمسارات</strong></nav>
      <header className="people-header"><div><h1>المرشحون للمسارات التدريبية</h1><p>ربط الموظف بالمسار والدرجة والفصل والتقييم النهائي.</p></div></header>
      <section className="candidate-form-card">
        <header><span><Plus size={22} /></span><div><h2>{editingId ? 'تعديل ترشيح' : 'إضافة مرشح جديد'}</h2><p>تعتمد الحقول على بيانات الموظفين والمسارات المعرفة في النظام.</p></div></header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="candidate-form-grid">
            <Select label="الموظف *" error={errors.person_id?.message} isLoading={loadingPersons} options={persons.map((person: any) => ({ value: person.id ?? "", label: `${person.name || 'موظف'}${person.code ? ` · ${person.code}` : ''}` }))} {...register('person_id')} />
            <Select label="المسار والدرجة *" error={errors.path_grade_id?.message} isLoading={loadingPathGrades} options={pathGrades.map((entry: any) => ({ value: entry.id ?? "", label: pathGradeLabel(entry) }))} {...register('path_grade_id')} />
            <Select label="الفصل التدريبي *" error={errors.term_id?.message} isLoading={loadingTerms} options={terms.map((term: any) => ({ value: term.id ?? "", label: term.name || `فصل #${term.id}` }))} {...register('term_id')} />
            <Select label="التقييم النهائي *" error={errors.final_evaluation_id?.message} isLoading={loadingEvaluations} options={evaluations.map((evaluation: any) => ({ value: evaluation.id ?? "", label: evaluation.name || `تقييم #${evaluation.id}` }))} {...register('final_evaluation_id')} />
          </div>
          <div className="candidate-form-actions"><Button type="submit" isLoading={saveMutation.isPending}><Save size={17} />{editingId ? 'حفظ التعديل' : 'تسجيل الترشيح'}</Button>{editingId && <Button type="button" variant="ghost" onClick={() => { setEditingId(null); reset(); }}>إلغاء التعديل</Button>}</div>
        </form>
      </section>

      <section className="candidate-table-card">
        <header><div><h2>سجلات الترشيح</h2><p>{candidates.length} ترشيح</p></div><ArrowDownUp size={20} /></header>
        {isLoading ? <p className="candidate-state">جارٍ تحميل المرشحين...</p> : isError ? <div className="candidate-state"><span>تعذر تحميل الترشيحات.</span><Button variant="outline" onClick={() => refetch()}>إعادة المحاولة</Button></div> : (
          <div className="candidate-table-scroll"><table className="candidate-table"><thead><tr><th>الموظف</th><th>المسار والدرجة</th><th>الفصل</th><th>التقييم النهائي</th><th>الإجراءات</th></tr></thead><tbody>
            {candidates.map((candidate: PathGradeCandidate) => <tr key={candidate.id}>
              <td><span className="candidate-person"><UserRound size={18} /><strong>{candidate.person?.name || `موظف #${candidate.person_id || '—'}`}</strong></span></td>
              <td>{candidate.path_grade ? pathGradeLabel(candidate.path_grade) : `#${candidate.path_grade_id || '—'}`}</td>
              <td>{candidate.term?.name || `#${candidate.term_id || '—'}`}</td>
              <td>{candidate.final_evaluation?.name || `#${candidate.final_evaluation_id || '—'}`}</td>
              <td><div className="candidate-actions"><Button size="sm" variant="outline" onClick={() => editCandidate(candidate)} aria-label="تعديل الترشيح"><Pencil size={15} /></Button><Button size="sm" variant="danger" isLoading={deleteMutation.isPending} onClick={() => { if (candidate.id && window.confirm('حذف ترشيح الموظف من المسار؟')) deleteMutation.mutate(candidate.id); }} aria-label="حذف الترشيح"><Trash2 size={15} /></Button></div></td>
            </tr>)}
            {!candidates.length && <tr><td colSpan={5}><div className="candidate-state"><Award size={34} /><strong>لا توجد ترشيحات بعد</strong><span>أضف مرشحاً باستخدام النموذج أعلاه.</span></div></td></tr>}
          </tbody></table></div>
        )}
      </section>
    </div>
  );
}
