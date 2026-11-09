import { ArrowLeft,File,FileText,FolderOpen,Search } from 'lucide-react';
import { useDeferredValue,useMemo,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { useDocumentations } from '../api/useListQuery';

const extension = (path?: string | null) => path?.split('.').pop()?.toUpperCase() || 'FILE';

export function DocumentationList() {
  const { data, isLoading, isError, refetch } = useDocumentations();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const documents = data || [];
  const visible = useMemo(() => documents.filter((document: any) => !deferredQuery || `${document.name || ''} ${document.file_path || ''} ${document.course_id || ''}`.toLowerCase().includes(deferredQuery.toLowerCase())), [documents, deferredQuery]);
  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  return <div className="documents-page">
    <nav className="people-breadcrumb"><Link to="/">الرئيسية</Link><span>‹</span><span>الوثائق والأرشفة</span><span>‹</span><strong>الوثائق</strong></nav>
    <header className="people-header"><div><h1>الوثائق والمستندات</h1><p>أرشيف المواد التدريبية والشهادات والمرفقات المرتبطة بالنظام</p></div></header>
    <section className="documents-toolbar"><label className="people-search"><Search size={20} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="البحث باسم الملف أو رقم الدورة..." /></label><span aria-live="polite"><FolderOpen size={18} />{visible.length} ملف</span></section>
    <section className="documents-grid">{visible.map((document: any) => <article className="document-card" key={document.id} onClick={() => document.id && navigate(`/documentations/${document.id}`)}><div className="document-file-icon"><FileText size={28} /><span>{extension(document.file_path)}</span></div><div className="document-copy"><h2>{document.name || 'وثيقة بدون اسم'}</h2><p title={document.file_path || ''}>{document.file_path || 'لم يتم تحديد مسار الملف'}</p><div><span>نوع الوثيقة #{document.documentation_type_id || '—'}</span>{document.course_id && <span>دورة #{document.course_id}</span>}</div></div><ArrowLeft className="document-arrow" size={19} /></article>)}</section>
    {!visible.length && <section className="documents-empty"><File size={44} /><strong>لا توجد وثائق مطابقة</strong><span>ستظهر الوثائق المرتبطة بالدورات والجلسات هنا.</span></section>}
  </div>;
}
