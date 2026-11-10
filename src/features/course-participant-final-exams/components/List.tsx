import { Award, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Table } from '../../../shared/components/Table';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCourseParticipantFinalExams } from '../api/useListQuery';
import type { CourseParticipantFinalExam } from '../types';
import { examDate, examScore, examStatus, summarizeExams } from '../utils/results';
import './results.css';
const emptyExams: CourseParticipantFinalExam[] = [];
export function CourseParticipantFinalExamList() {
  const { data, isLoading, isError, isFetching, refetch } = useCourseParticipantFinalExams();
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const status = params.get('status') || 'all';
  const query = useDeferredValue(search.trim().toLocaleLowerCase('ar'));
  const exams = data || emptyExams;
  const change = (key: string, value: string) => setParams(current => { const next = new URLSearchParams(current); if(value && value !== 'all') next.set(key,value); else next.delete(key); return next; }, {replace:true});
  const visible = useMemo(() => exams.filter(exam => (status === 'all' || examStatus(exam.exam_score) === status) && (!query || `${exam.course_participant_id ?? ''} ${exam.organized_by ?? ''} ${exam.exam_date ?? ''}`.toLocaleLowerCase('ar').includes(query))), [exams, query, status]);
  const summary = useMemo(() => summarizeExams(exams), [exams]);
  const metrics = [{label:'إجمالي الاختبارات',value:summary.total},{label:'نتائج مجتازة',value:summary.passed},{label:'درجات لم تُرصد',value:summary.pending},{label:'متوسط الدرجات المرصودة',value:summary.average}];
  const columns = [
    {header:'المشارك',accessor:(exam:CourseParticipantFinalExam) => exam.id != null ? <Link className="enterprise-record-link" to={`/course-participant-final-exams/${exam.id}`}>المشارك <bdi>#{exam.course_participant_id ?? '—'}</bdi></Link> : `المشارك #${exam.course_participant_id ?? '—'}`},
    {header:'الجهة المنظمة',accessor:(exam:CourseParticipantFinalExam) => exam.organized_by || 'غير محددة'},
    {header:'تاريخ الاختبار',accessor:(exam:CourseParticipantFinalExam) => examDate(exam.exam_date)},
    {header:'الدرجة',accessor:(exam:CourseParticipantFinalExam) => <bdi>{examScore(exam.exam_score)?.toLocaleString('ar-EG') ?? '—'}</bdi>},
    {header:'الحالة',accessor:(exam:CourseParticipantFinalExam) => <Badge variant={examStatus(exam.exam_score)==='pending'?'neutral':examStatus(exam.exam_score)==='passed'?'success':'danger'}>{examStatus(exam.exam_score)==='pending'?'لم تُرصد':examStatus(exam.exam_score)==='passed'?'مجتاز':'لم يجتز'}</Badge>},
  ];
  return <div className="enterprise-page exam-results-page">
    <header className="enterprise-heading"><div><span className="enterprise-kicker">شئون المتدربين / التقييم</span><h1>نتائج الاختبارات النهائية</h1><p>راجع درجات المشاركين، وحدد النتائج غير المرصودة، وافتح سجل الاختبار للاطلاع على تفاصيله.</p></div></header>
    <section className="exam-result-metrics" aria-label="ملخص جميع الاختبارات">{metrics.map(metric=><article key={metric.label}><h2>{metric.label}</h2>{isLoading ? <span className="exam-metric-skeleton" aria-label="جارٍ التحميل" role="status"/> : <strong>{isError && !data ? '—' : metric.value?.toLocaleString('ar-EG') ?? '—'}</strong>}</article>)}</section>
    <Card>
      <div className="enterprise-toolbar"><label className="enterprise-field enterprise-field--search">البحث في النتائج<input type="search" value={search} onChange={event=>change('q',event.target.value)} placeholder="رقم المشارك، الجهة المنظمة، أو التاريخ" /></label><label className="enterprise-field">حالة النتيجة<select value={status} onChange={event=>change('status',event.target.value)}><option value="all">كل النتائج</option><option value="pending">لم تُرصد</option><option value="passed">مجتاز</option><option value="failed">لم يجتز</option></select></label>{(search || status !== 'all') && <Button variant="outline" onClick={()=>setParams(current=>{const next=new URLSearchParams(current);next.delete('q');next.delete('status');return next;},{replace:true})}><X size={16} aria-hidden="true" />مسح التصفية</Button>}</div>
      <div className="enterprise-results" role="status"><span>{isLoading?'جارٍ تحميل النتائج':isError&&!data?'نتائج الاختبارات غير متاحة':`${visible.length.toLocaleString('ar-EG')} نتيجة من ${exams.length.toLocaleString('ar-EG')} اختبار`}</span>{isFetching&&!isLoading&&<span>جارٍ التحديث…</span>}</div>
      {isError&&<ErrorState title="تعذر تحميل نتائج الاختبارات" onRetry={()=>refetch()} />}
      {isLoading?<EnterpriseSkeleton columns={5}/>:(!isError||data)&&<Table key={`${query}:${status}`} data={visible} columns={columns} compact showOverview={false} emptyTitle={search||status!=='all'?'لا توجد نتائج مطابقة':'لا توجد اختبارات مسجلة'} emptyDescription={search||status!=='all'?'غيّر معايير البحث أو امسح التصفية.':'ستظهر النتائج هنا عند تسجيل اختبارات المشاركين.'} emptyIcon={<Award size={28} aria-hidden="true"/>}/>}
    </Card>
  </div>;
}
