import { ReferenceActions } from '../../../shared/components/ReferenceActions';
import { BookOpenCheck,ChevronLeft,GraduationCap,Layers3,Search } from 'lucide-react';
import { useDeferredValue,useMemo,useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { Table } from '../../../shared/components/Table';
import type { LearningPath } from '../types';
const emptyPaths: LearningPath[] = [];
import { useLearningPaths } from '../api/useListQuery';

export function LearningPathList() {
  const { data, isLoading, isError, refetch } = useLearningPaths();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const paths = data || emptyPaths;
  const visible = useMemo(() => paths.filter((path) => !deferredQuery || `${path.name || ''} ${path.code || ''}`.toLowerCase().includes(deferredQuery.toLowerCase())), [paths, deferredQuery]);
  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  return <div className="paths-page">
    <nav className="people-breadcrumb"><Link to="/">الرئيسية</Link><span>‹</span><span>إدارة التدريب</span><span>‹</span><strong>المسارات التدريبية</strong></nav>
    <header className="people-header"><div><h1>المسارات التدريبية</h1><p>استعراض الهيكل العلمي والمهني من المسار إلى المراحل والمواد والفصول</p></div></header>
    <section className="path-journey" aria-label="تسلسل المحتوى التدريبي"><span><GraduationCap size={21} />المسار</span><ChevronLeft /><span><Layers3 size={21} />المراحل والدرجات</span><ChevronLeft /><span><BookOpenCheck size={21} />المواد والفصول</span></section>
    <section className="paths-toolbar"><label className="people-search"><Search size={20} /><input aria-label="البحث في المسارات" value={query} onChange={event => setQuery(event.target.value)} placeholder="ابحث باسم المسار أو كوده..." /></label><span aria-live="polite">{visible.length} مسار</span><ReferenceActions placement="toolbar" /></section>
    <section className="sheet-panel"><Table key={deferredQuery} data={visible} compact showOverview={false} emptyTitle="لا توجد مسارات تدريبية" columns={[
      {header:'رقم المسار',accessor:'id'},
      {header:'كود المسار',accessor:row=>row.code||'—'},
      {header:'اسم المسار',accessor:row=>row.id!=null?<Link to={`/learning-paths/${row.id}`}>{row.name||'—'}</Link>:row.name||'—'},
      {header:'نوع المؤهل',accessor:row=>row.qualification_type_id??'—'},
    ]} /></section>
  </div>;
}
