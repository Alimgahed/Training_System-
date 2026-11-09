import { Suspense,useCallback,useEffect,useState } from 'react';
import { Outlet,useLocation } from 'react-router-dom';
import { LoadingSkeleton } from '../../shared/components/LoadingSkeleton';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { moduleVisual } from '../../shared/trainingVisuals';
import { ReferenceActions } from '../../shared/components/ReferenceActions';

export function Layout() {
  const { pathname } = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [desktopNavOpen, setDesktopNavOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 820px)').matches);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 820px)');
    const update = () => { setIsMobile(media.matches); setMobileNavOpen(false); };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const closeNav = useCallback(() => setMobileNavOpen(false), []);
  return (
    <div className={`app-shell ${!desktopNavOpen ? 'is-sidebar-collapsed' : ''}`} data-visual={moduleVisual(pathname)}>
      <a className="skip-to-content" href="#main-content">تجاوز إلى المحتوى الرئيسي</a>
      <Sidebar isOpen={mobileNavOpen} onClose={closeNav} />
      <div className="app-main">
        <Header menuOpen={isMobile ? mobileNavOpen : desktopNavOpen} onMenuToggle={() => isMobile ? setMobileNavOpen((open) => !open) : setDesktopNavOpen((open) => !open)} />
        <main className="app-content" id="main-content" tabIndex={-1}>
          <ReferenceActions />
          <div className="app-content__inner"><Suspense fallback={<div className="route-loading" aria-live="polite" aria-busy="true"><LoadingSkeleton variant="detail" /></div>}><Outlet /></Suspense></div>
        </main>
      </div>
    </div>
  );
}
