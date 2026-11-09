import {
Building2,
ChevronDown,
ClipboardCheck,Files,
GraduationCap,
MapPinned,
PieChart,
Settings,
Users,
X,
} from 'lucide-react';
import { useEffect,useRef,useState } from 'react';
import { Link,useLocation } from 'react-router-dom';

export const menuGroups = [
  { title: 'لوحة التحكم', icon: <PieChart size={18} />, path: '/' },
  { title: 'الموارد البشرية', icon: <Users size={18} />, items: [
    { name: 'الموظفون', path: '/persons' }, { name: 'إدارة حسابات المستخدمين', path: '/user-management' },
    { name: 'الوظائف', path: '/jobs' }, { name: 'الدرجات الوظيفية', path: '/grades' },
    { name: 'المؤهلات', path: '/qualifications' }, { name: 'أنواع المؤهلات', path: '/qualification-types' },
    { name: 'مجموعات العمل', path: '/work-groups' }, { name: 'المجموعات الوظيفية', path: '/job-type-groups' },
  ] },
  { title: 'الهيكل التنظيمي', icon: <Building2 size={18} />, items: [
    { name: 'الجهات', path: '/organizations' }, { name: 'أنواع الجهات', path: '/organization-types' },
    { name: 'الإدارات', path: '/departments' }, { name: 'مراكز العمل', path: '/work-centers' },
    { name: 'مواقع العمل', path: '/work-sites' },
  ] },
  { title: 'إدارة التدريب', icon: <GraduationCap size={18} />, items: [
    { name: 'الدورات التدريبية', path: '/courses' }, { name: 'الجلسات التدريبية', path: '/course-sessions' },
    { name: 'قاعات التدريب', path: '/rooms' }, { name: 'المسارات', path: '/learning-paths' },
    { name: 'المواضيع التدريبية', path: '/learning-subjects' }, { name: 'الفصول التدريبية', path: '/learning-terms' },
    { name: 'درجات المسار', path: '/path-grades' }, { name: 'مواد درجة المسار', path: '/path-grade-subjects' },
    { name: 'مواد الترم', path: '/path-grade-subject-terms' },
    { name: 'تخصصات المدربين', path: '/trainer-subjects' },
  ] },
  { title: 'شئون المتدربين والتقييم', icon: <ClipboardCheck size={18} />, items: [
    { name: 'المرشحون للمسارات', path: '/path-grade-candidates' }, { name: 'تقييم الأداء التدريبي', path: '/performance-evaluations' },
    { name: 'مشاركو الدورات', path: '/course-participants' }, { name: 'مشاركو الجلسات', path: '/course-session-participants' },
    { name: 'الاختبارات النهائية', path: '/course-participant-final-exams' }, { name: 'أنواع التقييم', path: '/evaluation-types' },
    { name: 'أنواع المشاركين', path: '/participant-types' }, { name: 'فئات التقييم', path: '/performance-evaluation-categories' },
    { name: 'عناصر التقييم', path: '/performance-evaluation-items' }, { name: 'فئات تقييم المشاركين', path: '/performance-evaluation-participant-categories' },
    { name: 'عناصر فئات المشاركين', path: '/performance-evaluation-participant-category-items' },
    { name: 'تقرير تقييم الدورات', path: '/performance-evaluation-course-details' },
    { name: 'تقرير تقييم المشاركين', path: '/performance-evaluation-course-participant-details' },
  ] },
  { title: 'الوثائق والأرشفة', icon: <Files size={18} />, items: [
    { name: 'الوثائق', path: '/documentations' }, { name: 'أنواع الوثائق', path: '/documentation-types' },
  ] },
  { title: 'الإعدادات العامة', icon: <Settings size={18} />, items: [
    { name: 'الدول', path: '/countries' }, { name: 'المحافظات', path: '/governorates' }, { name: 'العملاء', path: '/clients' },
  ] },
];

interface SidebarProps { isOpen?: boolean; onClose?: () => void; }

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isOpen || !window.matchMedia('(max-width: 820px)').matches) return;
    const previous = document.activeElement as HTMLElement | null;
    const node = sidebarRef.current;
    const focusable = () => Array.from(node?.querySelectorAll<HTMLElement>('a[href], button') ?? []).filter(el => el.getClientRects().length);
    focusable()[0]?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose?.(); }
      if (event.key !== 'Tab') return;
      const elements = focusable();
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    node?.addEventListener('keydown', handleKey);
    return () => { node?.removeEventListener('keydown', handleKey); previous?.focus(); };
  }, [isOpen, onClose]);
  const { pathname } = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ 'إدارة التدريب': true });
  const isActive = (path: string) => path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);
  const isGroupActive = (items?: { path: string }[]) => items?.some(({ path }) => isActive(path)) ?? false;

  return <>
    <button className={`sidebar-scrim ${isOpen ? 'is-visible' : ''}`} aria-label="إغلاق القائمة" tabIndex={isOpen ? 0 : -1} onClick={onClose} />
    <aside ref={sidebarRef} className={`app-sidebar ${isOpen ? 'is-open' : ''}`} id="primary-navigation" aria-label="التنقل الرئيسي">
      <div className="sidebar-brand">
        <img src="/training/organization-logo.png" alt="" width="60" height="60" />
        <div><strong>منصة إدارة التدريب</strong><span>شركة مياه الشرب والصرف الصحي بالمنيا</span></div>
        <button className="sidebar-close" aria-label="إغلاق القائمة" onClick={onClose}><X size={20} /></button>
      </div>
      <nav className="sidebar-nav">
        {menuGroups.map((group) => {
          if (group.path) return <Link key={group.title} to={group.path} onClick={onClose} className={`sidebar-link ${isActive(group.path) ? 'is-active' : ''}`} aria-current={isActive(group.path) ? 'page' : undefined}>{group.icon}<span>{group.title}</span></Link>;
          const expanded = openGroups[group.title] ?? isGroupActive(group.items);
          return <section className={`sidebar-group ${expanded ? 'is-expanded' : ''}`} key={group.title}>
            <button className="sidebar-group__trigger" aria-expanded={expanded} onClick={() => setOpenGroups((state) => ({ ...state, [group.title]: !expanded }))}>
              <span className="sidebar-group__label">{group.icon}<span>{group.title}</span></span><ChevronDown size={16} aria-hidden="true" />
            </button>
            <div className="sidebar-group__items" hidden={!expanded}>
              {group.items?.map((item) => <Link key={item.path} to={item.path} onClick={onClose} className={`sidebar-sub-link ${isActive(item.path) ? 'is-active' : ''}`} aria-current={isActive(item.path) ? 'page' : undefined}>{item.name}</Link>)}
            </div>
          </section>;
        })}
      </nav>
      <footer className="sidebar-footer"><span className="sidebar-footer__mark"><MapPinned size={15} /></span><span>إدارة التدريب والتطوير</span><span className="sidebar-footer__version">ERP</span></footer>
    </aside>
  </>;
}
