import { ArrowLeft,BookOpenCheck,ChevronLeft,GraduationCap,Layers3,Search } from 'lucide-react';
import { useDeferredValue,useMemo,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { useLearningPaths } from '../api/useListQuery';

export function LearningPathList() {
  const { data, isLoading, isError, refetch } = useLearningPaths();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const paths = data || [];
  const visible = useMemo(() => paths.filter((path: any) => !deferredQuery || `${path.name || ''} ${path.code || ''}`.toLowerCase().includes(deferredQuery.toLowerCase())), [paths, deferredQuery]);
  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  return <div className="paths-page">
    <nav className="people-breadcrumb"><Link to="/">الرئيسية</Link><span>‹</span><span>إدارة التدريب</span><span>‹</span><strong>المسارات التدريبية</strong></nav>
    <header className="people-header"><div><h1>المسارات التدريبية</h1><p>استعراض الهيكل العلمي والمهني من المسار إلى المراحل والمواد والفصول</p></div></header>
    <section className="path-journey" aria-label="تسلسل المحتوى التدريبي"><span><GraduationCap size={21} />المسار</span><ChevronLeft /><span><Layers3 size={21} />المراحل والدرجات</span><ChevronLeft /><span><BookOpenCheck size={21} />المواد والفصول</span></section>
    <section className="paths-toolbar"><label className="people-search"><Search size={20} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="ابحث باسم المسار أو كوده..." /></label><span aria-live="polite">{visible.length} مسار</span></section>
    <section className="paths-grid">{visible.map((path: any) => <article className="path-card" key={path.id} onClick={() => path.id && navigate(`/learning-paths/${path.id}`)}><div className="path-card-icon"><GraduationCap size={28} /></div><span className="path-code">{path.code || `PATH-${path.id || '—'}`}</span><h2>{path.name || 'مسار بدون اسم'}</h2><p>نوع المؤهل: {path.qualification_type_id ? `#${path.qualification_type_id}` : 'غير محدد'}</p><footer><span>استعرض مراحل المسار ومواده</span><ArrowLeft size={18} /></footer></article>)}</section>
    {!visible.length && <section className="paths-empty"><GraduationCap size={43} /><strong>لا توجد مسارات تدريبية</strong><span>ستظهر هنا المسارات المعرفة في النظام.</span></section>}
  </div>;
}
