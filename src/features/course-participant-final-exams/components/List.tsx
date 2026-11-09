import { Award,CalendarDays,CheckCircle2,Search,Trophy,XCircle } from 'lucide-react';
import { useDeferredValue,useMemo,useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { useCourseParticipantFinalExams } from '../api/useListQuery';

export function CourseParticipantFinalExamList() {
  const { data, isLoading, isError, refetch } = useCourseParticipantFinalExams();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const exams = data || [];
  const visible = useMemo(() => exams.filter((exam: any) => !deferredQuery || `${exam.course_participant_id || ''} ${exam.organized_by || ''} ${exam.exam_date || ''}`.toLowerCase().includes(deferredQuery.toLowerCase())), [exams, deferredQuery]);
  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  const scored = exams.filter((item: any) => item.exam_score !== null && item.exam_score !== undefined);
  const passed = scored.filter((item: any) => Number(item.exam_score) >= 50).length;
  const average = scored.length ? Math.round(scored.reduce((sum: number, item: any) => sum + Number(item.exam_score), 0) / scored.length) : 0;
  return <div className="exams-page">
    <nav className="people-breadcrumb"><Link to="/">الرئيسية</Link><span>‹</span><span>شئون المتدربين والتقييم</span><span>‹</span><strong>الاختبارات النهائية</strong></nav>
    <header className="people-header"><div><h1>نتائج الاختبارات النهائية</h1><p>مراجعة النتائج والدرجات النهائية للمشاركين في الدورات</p></div></header>
    <section className="exams-summary"><article><Award /><div><strong>{exams.length}</strong><span>إجمالي الاختبارات</span></div></article><article><CheckCircle2 /><div><strong>{passed}</strong><span>نتائج مجتازة</span></div></article><article><Trophy /><div><strong>{average}</strong><span>متوسط الدرجات</span></div></article></section>
    <section className="exams-toolbar"><label className="people-search"><Search size={20} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="البحث برقم المشارك أو الجهة المنظمة..." /></label><span aria-live="polite">{visible.length} نتيجة</span></section>
    <section className="exams-list">{visible.map((exam: any) => { const hasScore = exam.exam_score !== null && exam.exam_score !== undefined; const pass = Number(exam.exam_score) >= 50; return <article className="exam-row" key={exam.id}><span className={`exam-status ${hasScore ? pass ? 'is-pass' : 'is-fail' : ''}`}>{hasScore ? pass ? <CheckCircle2 size={21} /> : <XCircle size={21} /> : <CalendarDays size={21} />}</span><div className="exam-main"><h2>المشارك #{exam.course_participant_id || '—'}</h2><p>{exam.organized_by || 'جهة تنظيم غير محددة'} · {exam.exam_date ? new Date(exam.exam_date).toLocaleDateString('ar-EG') : 'تاريخ غير محدد'}</p></div><div className="exam-score"><strong>{hasScore ? exam.exam_score : '—'}</strong><span>{hasScore ? (pass ? 'مجتاز' : 'لم يجتز') : 'لم ترصد'}</span></div></article>; })}</section>
    {!visible.length && <section className="exams-empty"><Award size={43} /><strong>لا توجد نتائج مطابقة</strong><span>ستظهر نتائج الاختبارات هنا عند تسجيلها.</span></section>}
  </div>;
}
