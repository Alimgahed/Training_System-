import { useQueryClient } from '@tanstack/react-query';
import { LogOut,Menu,RotateCw,Search,X } from 'lucide-react';
import { useMemo,useRef,useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../core/store/useAuthStore';
import { menuGroups } from './Sidebar';

const navItems = menuGroups.flatMap((section) => section.path
  ? [{ name: section.title, path: section.path }]
  : section.items || []);

interface HeaderProps { menuOpen?: boolean; onMenuToggle?: () => void; }

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const username = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const searchInput = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const activePage = navItems.find((item) => item.path === pathname || (item.path !== '/' && pathname.startsWith(`${item.path}/`)));
  const matches = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('ar');
    return query ? navItems.filter((item) => item.name.toLocaleLowerCase('ar').includes(query)).slice(0, 6) : [];
  }, [search]);
  const goToFirstMatch = () => {
    if (matches[0]) { navigate(matches[0].path); setSearch(''); setSearchOpen(false); }
  };

  return <header className="app-header">
    <div className="app-header__primary">
      <button className="app-header__menu" onClick={onMenuToggle} aria-label={menuOpen ? 'إغلاق القائمة الرئيسية' : 'فتح القائمة الرئيسية'} aria-controls="primary-navigation" aria-expanded={menuOpen}><Menu size={22} /></button>
      <div className="app-header__titles"><strong>نظام الموارد والتدريب</strong><span>{activePage?.name || 'لوحة التحكم'}</span></div>
    </div>
    <div className="app-header__tools">
      <div className={`global-search ${searchOpen ? 'is-open' : ''}`}>
        <button type="button" aria-label="فتح البحث" onClick={() => { setSearchOpen(true); searchInput.current?.focus(); }}><Search size={18} aria-hidden="true" /></button>
        <input ref={searchInput} aria-label="البحث في شاشات النظام" placeholder="ابحث عن شاشة..." value={search} onChange={(event) => setSearch(event.target.value)} onFocus={() => setSearchOpen(true)} onKeyDown={(event) => { if (event.key === 'Enter') goToFirstMatch(); if (event.key === 'Escape') { setSearch(''); setSearchOpen(false); } }} />
        {searchOpen && <button type="button" aria-label="إغلاق البحث" onClick={() => { setSearch(''); setSearchOpen(false); }}><X size={16} /></button>}
        {searchOpen && matches.length > 0 && <div className="global-search__results" aria-label="نتائج البحث">{matches.map((item) => <Link key={item.path} to={item.path} onClick={() => { setSearch(''); setSearchOpen(false); }}>{item.name}</Link>)}</div>}
        {searchOpen && search.trim() && matches.length === 0 && <div className="global-search__results" role="status">لا توجد شاشة مطابقة. جرّب اسماً آخر.</div>}
      </div>
      <button className="app-header__icon-button" aria-label="تحديث بيانات الشاشة" title="تحديث البيانات" onClick={() => queryClient.invalidateQueries()}><RotateCw size={19} /></button>
      <span className="app-header__divider" />
      <div className="app-user"><span className="app-user__avatar" aria-hidden="true">{username?.slice(0, 2).toUpperCase() || 'م'}</span><span className="app-user__copy"><strong>{username || 'المستخدم'}</strong><small>حساب النظام</small></span></div>
      <button className="app-header__icon-button app-header__logout" aria-label="تسجيل الخروج" title="تسجيل الخروج" onClick={logout}><LogOut size={18} /></button>
    </div>
  </header>;
}
