import '../../../shared/components/training-workspace.css';
import { Table } from '../../../shared/components/Table';
import { ErrorState } from '../../../shared/components/ErrorState';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { Pencil,Plus,Save,Trash2 } from 'lucide-react';
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
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const { data: candidates = [], isLoading, isError, refetch } = usePathGradeCandidates();
  const { data: persons = [], isLoading: loadingPersons, isError: errorPersons, refetch: retryPersons } = usePersons();
  const { data: pathGrades = [], isLoading: loadingPathGrades, isError: errorPathGrades, refetch: retryPathGrades } = usePathGrades();
  const { data: terms = [], isLoading: loadingTerms, isError: errorTerms, refetch: retryTerms } = useLearningTerms();
  const { data: evaluations = [], isLoading: loadingEvaluations, isError: errorEvaluations, refetch: retryEvaluations } = useEvaluationTypes();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema) });
  const deleteMutation = useDeletePathGradeCandidateMutation();
  const saveMutation = useMutation({
    mutationFn: ({ payload, id }: { payload: PathGradeCandidateRequest; id: number | null }) => id ? updatePathGradeCandidate(id, payload) : createPathGradeCandidate(payload),
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['path-grade-candidates'] }); setEditingId(null); reset(); },
  });

  const editCandidate = (candidate: PathGradeCandidate) => {
    if (!candidate.id) return;
    setEditingId(candidate.id);
    document.querySelector<HTMLSelectElement>('.candidate-form-card select')?.focus();
    setValue('person_id', Number(candidate.person_id || candidate.person?.id || 0));
    setValue('path_grade_id', Number(candidate.path_grade_id || candidate.path_grade?.id || 0));
    setValue('term_id', Number(candidate.term_id || candidate.term?.id || 0));
    setValue('final_evaluation_id', Number(candidate.final_evaluation_id || candidate.final_evaluation?.id || 0));
  };

  const onSubmit = (values: Values) => saveMutation.mutate({ payload: values, id: editingId });
  const pathGradeLabel = (entry: any) => entry.learning_path?.name && entry.grade?.name ? `${entry.learning_path.name} · ${entry.grade.name}` : `درجة مسار #${entry.id}`;

  return (
    <div className="candidate-page training-workspace">
      <nav className="people-breadcrumb"><a href="/">الرئيسية</a><span>‹</span><span>شئون المتدربين والتقييم</span><span>‹</span><strong>المرشحون للمسارات</strong></nav>
      <header className="people-header"><div><h1>المرشحون للمسارات التدريبية</h1><p>ربط الموظف بالمسار والدرجة والفصل والتقييم النهائي.</p></div></header>
      {(saveMutation.isError || deleteMutation.isError) && <div className="enterprise-form-error" role="alert">تعذر تنفيذ العملية. راجع الاتصال والصلاحيات وأعد المحاولة.</div>}
      <section className="candidate-form-card">
        <header><span><Plus size={22} /></span><div><h2>{editingId ? 'تعديل ترشيح' : 'إضافة مرشح جديد'}</h2><p>تعتمد الحقول على بيانات الموظفين والمسارات المعرفة في النظام.</p></div></header>
        <form onSubmit={handleSubmit(onSubmit)} aria-busy={saveMutation.isPending}><fieldset className="training-entry-fields" disabled={saveMutation.isPending}><legend className="visually-hidden">بيانات الترشيح</legend>
          {(errorPersons||errorPathGrades||errorTerms||errorEvaluations)&&<div className="enterprise-form-error" role="alert">تعذر تحميل بعض القوائم المطلوبة. <Button type="button" variant="outline" onClick={()=>{if(errorPersons)void retryPersons();if(errorPathGrades)void retryPathGrades();if(errorTerms)void retryTerms();if(errorEvaluations)void retryEvaluations();}}>إعادة تحميل القوائم</Button></div>}
          <div className="candidate-form-grid">
            <Select label="الموظف *" error={errors.person_id?.message} isLoading={loadingPersons} options={persons.map((person: any) => ({ value: person.id ?? "", label: `${person.name || 'موظف'}${person.code ? ` · ${person.code}` : ''}` }))} {...register('person_id')} />
            <Select label="المسار والدرجة *" error={errors.path_grade_id?.message} isLoading={loadingPathGrades} options={pathGrades.map((entry: any) => ({ value: entry.id ?? "", label: pathGradeLabel(entry) }))} {...register('path_grade_id')} />
            <Select label="الفصل التدريبي *" error={errors.term_id?.message} isLoading={loadingTerms} options={terms.map((term: any) => ({ value: term.id ?? "", label: term.name || `فصل #${term.id}` }))} {...register('term_id')} />
            <Select label="التقييم النهائي *" error={errors.final_evaluation_id?.message} isLoading={loadingEvaluations} options={evaluations.map((evaluation: any) => ({ value: evaluation.id ?? "", label: evaluation.name || `تقييم #${evaluation.id}` }))} {...register('final_evaluation_id')} />
          </div>
          <div className="candidate-form-actions"><Button type="submit" disabled={loadingPersons||loadingPathGrades||loadingTerms||loadingEvaluations||errorPersons||errorPathGrades||errorTerms||errorEvaluations||!persons.length||!pathGrades.length||!terms.length||!evaluations.length} isLoading={saveMutation.isPending}><Save size={17} />{editingId ? 'حفظ التعديل' : 'تسجيل الترشيح'}</Button>{editingId && <Button type="button" variant="ghost" onClick={() => { setEditingId(null); reset(); }}>إلغاء التعديل</Button>}</div>
        </fieldset></form>
      </section>

      <section className="candidate-table-card">
        <header><div><h2>سجلات الترشيح</h2><p>راجع المرشحين وعدّل سجلاتهم.</p></div><label className="training-search"><span>البحث في الترشيحات</span><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="اسم الموظف أو المسار أو الفصل"/></label></header>
        {isError ? <ErrorState onRetry={()=>refetch()}/> : <Table key={search} isLoading={isLoading} data={candidates.filter(candidate=>[candidate.person?.name,candidate.person_id,candidate.path_grade?.learning_path?.name,candidate.path_grade?.grade?.name,candidate.term?.name,candidate.final_evaluation?.name].join(' ').toLocaleLowerCase('ar').includes(search.trim().toLocaleLowerCase('ar')))} compact showOverview={false} emptyTitle={search?'لا توجد ترشيحات مطابقة':'لا توجد ترشيحات بعد'} columns={[
          {header:'الموظف',accessor:c=>c.person?.name||c.person_id||'—'},
          {header:'المسار والدرجة',accessor:c=>c.path_grade?pathGradeLabel(c.path_grade):c.path_grade_id||'—'},
          {header:'الفصل',accessor:c=>c.term?.name||c.term_id||'—'},
          {header:'التقييم النهائي',accessor:c=>c.final_evaluation?.name||c.final_evaluation_id||'—'},
          {header:'إجراءات',accessor:c=><div className="candidate-actions"><Button size="sm" variant="outline" disabled={saveMutation.isPending} onClick={()=>editCandidate(c)} aria-label="تعديل الترشيح"><Pencil size={16}/></Button><Button size="sm" variant="danger" isLoading={deleteMutation.isPending} onClick={()=>{if(c.id&&window.confirm('حذف ترشيح الموظف من المسار؟'))deleteMutation.mutate(c.id);}} aria-label="حذف الترشيح"><Trash2 size={16}/></Button></div>},
        ]}/>}
      </section>
    </div>
  );
}
