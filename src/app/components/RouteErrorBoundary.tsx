import { AlertTriangle,Home,RefreshCw } from 'lucide-react';
import { isRouteErrorResponse,useNavigate,useRouteError } from 'react-router-dom';

export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText || ''}`.trim()
    : error instanceof Error
      ? error.message
      : 'حدث خطأ غير متوقع أثناء تحميل هذه الشاشة.';

  return (
    <main className="route-error" dir="rtl" role="alert">
      <div className="route-error__icon" aria-hidden="true"><AlertTriangle size={28} /></div>
      <p className="route-error__eyebrow">تعذّر تحميل الصفحة</p>
      <h1>حدثت مشكلة مؤقتة</h1>
      <p className="route-error__description">حاول إعادة تحميل الشاشة. إذا استمرت المشكلة، ارجع للرئيسية وتابع من هناك.</p>
      {import.meta.env.DEV && <pre className="route-error__details">{message}</pre>}
      <div className="route-error__actions">
        <button className="ui-button ui-button--primary" onClick={() => window.location.reload()}>
          <RefreshCw size={17} /> إعادة تحميل الشاشة
        </button>
        <button className="ui-button ui-button--outline" onClick={() => navigate('/')}>
          <Home size={17} /> العودة للرئيسية
        </button>
      </div>
    </main>
  );
}
