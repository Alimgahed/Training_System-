import { MapPin, Plus, X } from 'lucide-react';
import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Table } from '../../../shared/components/Table';
import { EnterpriseSkeleton } from '../../../shared/enterprise/Skeleton';
import { useCountrys } from '../../countries/api/useListQuery';
import { useGovernorates } from '../api/useListQuery';
import type { Governorate } from '../types';
import './governorates.css';
const empty:Governorate[]=[];
export function GovernorateList() {
  const {data,isLoading,isError,refetch}=useGovernorates();const countries=useCountrys();
  const rows=data||empty;const [params,setParams]=useSearchParams();const search=params.get('q')||'';const country=params.get('country')||'';const query=useDeferredValue(search.trim().toLocaleLowerCase('ar'));
  const names=useMemo(()=>new Map(countries.data?.map(o=>[o.id,o.name])),[countries.data]);
  const ids=useMemo(()=>[...new Set(rows.flatMap(r=>r.country_id==null?[]:[r.country_id]))].sort((a,b)=>a-b),[rows]);
  const filtered=useMemo(()=>rows.filter(r=>(!country||String(r.country_id)===country)&&(!query||`${r.id??''} ${r.name??''} ${r.country_id??''} ${names.get(r.country_id)??''}`.toLocaleLowerCase('ar').includes(query))),[rows,country,query,names]);
  const change=(key:string,value:string)=>setParams(current=>{const next=new URLSearchParams(current);if(value)next.set(key,value);else next.delete(key);return next;},{replace:true});
  const columns=[{header:'المحافظة',accessor:(row:Governorate)=><div className="governorate-identity">{row.id!=null?<Link className="enterprise-record-link" to={`/governorates/${row.id}`}>{row.name||`محافظة #${row.id}`}</Link>:row.name||'غير محددة'}</div>},{header:'الدولة',accessor:(row:Governorate)=>row.country_id!=null?<Link className="enterprise-record-link" to={`/countries/${row.country_id}`}>{names.get(row.country_id)||`دولة #${row.country_id}`}</Link>:'غير محددة'}];
  return <div className="enterprise-page governorate-directory"><header className="enterprise-heading"><div><span className="enterprise-kicker">الإعدادات العامة / البيانات الجغرافية</span><h1>المحافظات</h1><p>ابحث عن المحافظة وراجع الدولة التابعة لها قبل تحديث بيانات المواقع.</p></div><Link className="enterprise-link-button enterprise-link-button--primary" to="/governorates/new"><Plus size={18} aria-hidden="true"/>إضافة محافظة</Link></header>
    <Card><div className="enterprise-toolbar"><label className="enterprise-field enterprise-field--search">البحث في المحافظات<input type="search" value={search} onChange={e=>change('q',e.target.value)} placeholder="اسم المحافظة أو الدولة أو رقم السجل"/></label><label className="enterprise-field">الدولة<select value={country} onChange={e=>change('country',e.target.value)}><option value="">كل الدول</option>{ids.map(id=><option key={id} value={id}>{names.get(id)||`دولة #${id}`}</option>)}</select></label>{(search||country)&&<Button variant="outline" onClick={()=>setParams({}, {replace:true})}><X size={16} aria-hidden="true"/>مسح التصفية</Button>}</div>
      {countries.isError&&<div className="enterprise-results" role="status"><span>تعذر تحميل أسماء الدول؛ تظهر أرقامها مؤقتاً.</span><Button variant="outline" onClick={()=>countries.refetch()}>إعادة تحميل الدول</Button></div>}
      <div className="enterprise-results" role="status">{isLoading?'جارٍ تحميل المحافظات':isError&&!data?'المحافظات غير متاحة':`${filtered.length.toLocaleString('ar-EG')} محافظة من ${rows.length.toLocaleString('ar-EG')}`}</div>
      {isError&&<ErrorState title="تعذر تحميل المحافظات" onRetry={()=>refetch()}/>}
      {isLoading?<EnterpriseSkeleton columns={2}/>:(!isError||data)&&<Table key={`${query}:${country}`} data={filtered} columns={columns} compact showOverview={false} emptyTitle={search||country?'لا توجد محافظات مطابقة':'لم تُضف محافظات بعد'} emptyDescription={search||country?'عدّل البحث أو الدولة، أو امسح التصفية.':'أضف محافظة واربطها بدولتها لإكمال الدليل الجغرافي.'} emptyIcon={<MapPin size={28} aria-hidden="true"/>}/>}
    </Card>
  </div>;
}
