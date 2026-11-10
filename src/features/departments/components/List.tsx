import { Building, Plus, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Table } from '../../../shared/components/Table';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useOrganizations } from '../../organizations/api/useListQuery';
import { useDepartments } from '../api/useListQuery';
import type { Department } from '../types';
import './departments.css';
const empty:Department[]=[];
export function DepartmentList() {
  const {data,isLoading,isError,refetch}=useDepartments();const organizations=useOrganizations();
  const rows=data||empty;const [params,setParams]=useSearchParams();const search=params.get('q')||'';const organization=params.get('organization')||'';const query=useDeferredValue(search.trim().toLocaleLowerCase('ar'));
  const names=useMemo(()=>new Map(organizations.data?.map(o=>[o.id,o.name||o.code])),[organizations.data]);
  const ids=useMemo(()=>[...new Set(rows.flatMap(r=>r.organization_id==null?[]:[r.organization_id]))].sort((a,b)=>a-b),[rows]);
  const filtered=useMemo(()=>rows.filter(r=>(!organization||String(r.organization_id)===organization)&&(!query||`${r.code??''} ${r.name??''} ${r.organization_id??''} ${names.get(r.organization_id)??''}`.toLocaleLowerCase('ar').includes(query))),[rows,organization,query,names]);
  const change=(key:string,value:string)=>setParams(current=>{const next=new URLSearchParams(current);if(value)next.set(key,value);else next.delete(key);return next;},{replace:true});
  const columns=[{header:'الإدارة والكود',accessor:(row:Department)=><div className="department-identity">{row.id!=null?<Link className="enterprise-record-link" to={`/departments/${row.id}`}>{row.name||`إدارة #${row.id}`}</Link>:row.name||'غير محددة'}<small><bdi className="department-code">{row.code||'كود غير محدد'}</bdi></small></div>},{header:'الجهة التابعة لها',accessor:(row:Department)=>row.organization_id!=null?<Link className="enterprise-record-link" to={`/organizations/${row.organization_id}`}>{names.get(row.organization_id)||`جهة #${row.organization_id}`}</Link>:'غير محددة'}];
  return <div className="enterprise-page department-directory"><header className="enterprise-heading"><div><span className="enterprise-kicker">الهيكل التنظيمي / دليل الإدارات</span><h1>الإدارات</h1><p>ابحث عن الإدارة بكودها أو اسمها، وراجع الجهة التابعة لها قبل تحديث بياناتها.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/departments/new"><Plus size={18} aria-hidden="true"/>إضافة إدارة</Link></header>
    <Card><div className="enterprise-toolbar"><label className="enterprise-field enterprise-field--search">البحث في الإدارات<input type="search" value={search} onChange={e=>change('q',e.target.value)} placeholder="اسم الإدارة، الكود، أو الجهة"/></label><label className="enterprise-field">الجهة<select value={organization} onChange={e=>change('organization',e.target.value)}><option value="">كل الجهات</option>{ids.map(id=><option key={id} value={id}>{names.get(id)||`جهة #${id}`}</option>)}</select></label>{(search||organization)&&<Button variant="outline" onClick={()=>setParams({}, {replace:true})}><X size={16} aria-hidden="true"/>مسح التصفية</Button>}</div>
      {organizations.isError&&<div className="enterprise-results" role="status"><span>تعذر تحميل أسماء الجهات؛ تظهر أرقامها مؤقتاً.</span><Button variant="outline" onClick={()=>organizations.refetch()}>إعادة تحميل الجهات</Button></div>}
      <div className="enterprise-results" role="status">{isLoading?'جارٍ تحميل الإدارات':isError&&!data?'الإدارات غير متاحة':`${filtered.length.toLocaleString('ar-EG')} إدارة من ${rows.length.toLocaleString('ar-EG')}`}</div>
      {isError&&<ErrorState title="تعذر تحميل الإدارات" onRetry={()=>refetch()}/>}
      {isLoading?<EnterpriseSkeleton columns={2}/>:(!isError||data)&&<Table key={`${query}:${organization}`} data={filtered} columns={columns} compact showOverview={false} emptyTitle={search||organization?'لا توجد إدارات مطابقة':'لم تُضف إدارات بعد'} emptyDescription={search||organization?'عدّل البحث أو الجهة، أو امسح التصفية.':'أضف إدارة واربطها بجهتها لإكمال الهيكل التنظيمي.'} emptyIcon={<Building size={28} aria-hidden="true"/>}/>}
    </Card>
  </div>;
}
