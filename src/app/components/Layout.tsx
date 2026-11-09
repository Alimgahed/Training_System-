import { Suspense,useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingSkeleton } from '../../shared/components/LoadingSkeleton';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ReferenceActions } from '../../shared/components/ReferenceActions';

export function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className="app-shell">
      <a className="skip-to-content" href="#main-content">تجاوز إلى المحتوى الرئيسي</a>
      <Sidebar isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="app-main">
        <Header onMenuToggle={() => setMobileNavOpen((open) => !open)} />
        <main className="app-content" id="main-content" tabIndex={-1}>
          <ReferenceActions />
          <div className="app-content__inner"><Suspense fallback={<div className="route-loading" aria-live="polite" aria-busy="true"><LoadingSkeleton variant="detail" /></div>}><Outlet /></Suspense></div>
        </main>
      </div>
    </div>
  );
}
