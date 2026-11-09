import { ChevronDown,Eye,Plus,Search,UserCheck,UserRound,Users,UsersRound } from 'lucide-react';
import { useMemo,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { useDepartments } from '../../departments/api/useListQuery';
import { usePersons } from '../api/useListQuery';
import type { Person } from '../types';

const initials = (name?: string | null) => name?.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('') || 'م';
const relationName = (relation?: { name?: string | null } | null, fallback?: string | null) => relation?.name || fallback || '—';

export function PersonList() {
  const { data, isLoading, isError, refetch } = usePersons();
  const { data: departments = [] } = useDepartments();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [trainer, setTrainer] = useState('all');
  const [department, setDepartment] = useState('all');
  const people = data || [];
  const visiblePeople = useMemo(() => people.filter((person: Person) => {
    const text = `${person.name || ''} ${person.code || ''} ${person.telephone_whatsapp || ''} ${person.department?.name || ''} ${person.job?.name || ''} ${person.current_learning_path?.name || ''}`.toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (status === 'all' || (status === 'active' ? person.is_active : !person.is_active)) && (trainer === 'all' || (trainer === 'yes' ? person.is_trainer : !person.is_trainer)) && (department === 'all' || String(person.department_id || '') === department);
  }), [people, query, status, trainer, department]);

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <div className="people-error"><strong>تعذر تحميل بيانات الموظفين</strong><Button onClick={() => refetch()}>إعادة المحاولة</Button></div>;

  const statCards = [
    { label: 'المدربين', value: people.filter((p: Person) => p.is_trainer).length, note: 'من العاملين', icon: UserRound, tone: 'green' },
    { label: 'إجمالي الموظفين', value: people.length, note: 'في النظام', icon: UsersRound, tone: 'blue' },
    { label: 'نشط', value: people.filter((p: Person) => p.is_active).length, note: 'يعمل حالياً', icon: UserCheck, tone: 'gold' },
    { label: 'غير نشط', value: people.filter((p: Person) => !p.is_active).length, note: 'من إجمالي الموظفين', icon: Users, tone: 'sky' },
  ];

  return <div className="people-page">
    <nav className="people-breadcrumb"><Link to="/">الرئيسية</Link><span>‹</span><span>الموارد البشرية</span><span>‹</span><strong>الموظفين</strong></nav>
    <header className="people-header"><div><h1>إدارة الموظفين</h1><p>عرض وتحديث بيانات الموظفين والمدربين داخل النظام</p></div><Link to="/persons/new"><Button size="lg"><Plus size={20} />إضافة موظف جديد</Button></Link></header>
    <section className="people-stats">{statCards.map(({ label, value, note, icon: Icon, tone }) => <article className={`people-stat people-stat--${tone}`} key={label}><div className="people-stat-copy"><h2>{label}</h2><strong>{value}</strong><p>{note}</p></div><span className="people-stat-icon"><Icon size={25} /></span></article>)}</section>
    <section className="people-filterbar" aria-label="بحث وفلاتر الموظفين">
      <label className="people-search"><Search size={20} aria-hidden="true" /><input aria-label="البحث عن موظف" value={query} onChange={event => setQuery(event.target.value)} placeholder="الاسم أو الكود أو الهاتف..." /></label>
      <label className="people-select"><span>حالة الموظف</span><select value={status} onChange={event => setStatus(event.target.value)}><option value="all">الكل</option><option value="active">نشط</option><option value="inactive">غير نشط</option></select><ChevronDown size={16} /></label>
      <label className="people-select"><span>مدرب؟</span><select value={trainer} onChange={event => setTrainer(event.target.value)}><option value="all">الكل</option><option value="yes">نعم</option><option value="no">لا</option></select><ChevronDown size={16} /></label>
      <label className="people-select"><span>الإدارة</span><select value={department} onChange={event => setDepartment(event.target.value)}><option value="all">كل الإدارات</option>{departments.map((item: any) => <option key={item.id} value={item.id}>{item.name || `إدارة #${item.id}`}</option>)}</select><ChevronDown size={16} /></label>
    </section>
    <section className="people-table-card">
      <div className="people-table-top"><span>تم العثور على <strong>{visiblePeople.length}</strong> موظف</span><span className="people-table-total">إجمالي الموظفين: {people.length}</span></div>
      <div className="people-table-scroll"><table className="people-table"><thead><tr><th>#</th><th>اسم الموظف</th><th>الكود</th><th>الإدارة</th><th>الوظيفة</th><th>المسار الحالي</th><th>رقم الهاتف</th><th>تاريخ التعاقد</th><th>الحالة</th><th>مدرب؟</th><th>التفاصيل</th></tr></thead><tbody>
        {visiblePeople.map((person: Person, index: number) => {
          const departmentName = relationName(person.department, departments.find((item: any) => Number(item.id) === Number(person.department_id))?.name);
          return <tr key={person.id ?? `${person.code}-${index}`} tabIndex={person.id ? 0 : undefined} aria-label={person.id ? `عرض تفاصيل الموظف ${person.name || ''}` : undefined} onKeyDown={event => { if (person.id && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); navigate(`/persons/${person.id}`); } }} onClick={() => person.id && navigate(`/persons/${person.id}`)}><td>{index + 1}</td><td><div className="people-name"><span className="people-avatar">{initials(person.name)}</span><strong>{person.name || 'بدون اسم'}</strong></div></td><td className="people-code">{person.code || '—'}</td><td>{departmentName}</td><td>{relationName(person.job)}</td><td>{relationName(person.current_learning_path)}</td><td>{person.telephone_whatsapp || '—'}</td><td dir="ltr">{person.contract_date ? person.contract_date.slice(0, 10) : '—'}</td><td>{person.is_active ? <Badge variant="success">نشط</Badge> : <Badge variant="danger">غير نشط</Badge>}</td><td><span className={`people-trainer ${person.is_trainer ? 'people-trainer--yes' : ''}`}>{person.is_trainer ? 'نعم' : 'لا'}</span></td><td><div className="people-row-actions" onClick={event => event.stopPropagation()}><button aria-label={`عرض الموظف ${person.name || person.code || ''}`} onClick={() => person.id && navigate(`/persons/${person.id}`)}><Eye size={17} /></button></div></td></tr>;
        })}
        {!visiblePeople.length && <tr><td colSpan={11}><div className="people-empty"><Users size={36} /><strong>لا توجد نتائج مطابقة</strong><span>جرّب تعديل كلمات البحث أو الفلاتر.</span></div></td></tr>}
      </tbody></table></div>
      <footer className="people-pagination"><span>عرض {visiblePeople.length} من {people.length} موظف</span><span>استخدم البحث والفلاتر لتضييق النتائج</span></footer>
    </section>
  </div>;
}
