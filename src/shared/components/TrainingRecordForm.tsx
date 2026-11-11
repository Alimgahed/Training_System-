import { ArrowRight, FilePenLine, Info, Save } from 'lucide-react';
import type { FormEventHandler, ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from './Button';
import { Card } from './Card';
import './training-workspace.css';

export function TrainingRecordForm({ title, backPath, onSubmit, pending, error, children }: { title: string; backPath: string; onSubmit: FormEventHandler<HTMLFormElement>; pending: boolean; error?: boolean; children: ReactNode }) {
  const {id} = useParams();
  return <div className="enterprise-page training-workspace training-editor">
    <nav className="enterprise-breadcrumbs" aria-label="مسار التنقل"><Link to="/">الرئيسية</Link><span>‹</span><Link to={backPath}>العودة للقائمة</Link><span>‹</span><span aria-current="page">{id?'تعديل':'إضافة'} {title}</span></nav>
    <header className="enterprise-heading"><div className="training-page-title"><span className="training-page-icon"><FilePenLine size={28} aria-hidden="true"/></span><div><h1>{id?'تعديل':'إضافة'} {title}</h1><p>أكمل البيانات والارتباطات المطلوبة، ثم احفظ السجل.</p></div></div><Link className="enterprise-link-button" to={backPath}><ArrowRight size={18} aria-hidden="true"/>العودة للقائمة</Link></header>
    <form onSubmit={onSubmit} noValidate aria-busy={pending}>
      {error && <div role="alert" className="enterprise-form-error">تعذر حفظ السجل. بياناتك محفوظة في النموذج؛ راجع الاتصال والصلاحيات وأعد المحاولة.</div>}
      <Card title={`بيانات ${title}`} action={<Info size={21} aria-hidden="true"/>}><fieldset className="training-form-fields" disabled={pending}><legend className="visually-hidden">بيانات {title}</legend>{children}</fieldset></Card>
      <footer className="enterprise-form-footer"><div><Button type="submit" isLoading={pending}><Save size={18} aria-hidden="true"/>حفظ البيانات</Button><Link className="enterprise-link-button" to={backPath} aria-disabled={pending} onClick={e=>{if(pending)e.preventDefault();}}>إلغاء</Link></div><span role="status">{pending?'جارٍ حفظ البيانات…':'الحقول المحددة بعلامة النجمة مطلوبة'}</span></footer>
    </form>
  </div>;
}
