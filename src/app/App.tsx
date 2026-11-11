import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { ArrowLeft,BarChart3,CalendarDays,Eye,EyeOff,Globe2,GraduationCap,LockKeyhole,ShieldCheck,UserRound,UsersRound } from 'lucide-react';
import { lazy,Suspense,useEffect,useRef,useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { apiClient } from '../core/api/apiClient';
import { useAuthStore } from '../core/store/useAuthStore';
import { loginErrorMessage } from '../features/auth/loginFeedback';
import { LoadingSkeleton } from '../shared/components/LoadingSkeleton';
const AuthenticatedRoutes = lazy(() => import('./AuthenticatedRoutes'));

const queryClient = new QueryClient({ defaultOptions: { queries: {
  staleTime: 30_000,
  retry: (count, error) => {
    const status = (error as { response?: { status?: number } }).response?.status;
    return count < 1 && (!status || status >= 500);
  },
} } });
useAuthStore.subscribe((state, previous) => {
  if (state.token !== previous.token) queryClient.clear();
});
const loginSchema = z.object({
  username: z.string().min(1, 'اسم المستخدم مطلوب'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
});
type LoginFormInputs = z.infer<typeof loginSchema>;

export function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (errors.root) errorSummaryRef.current?.focus();
  }, [errors.root]);

  const onSubmit = async (data: LoginFormInputs) => {
    clearErrors('root');
    try {
      const response = await apiClient.post('/login', { username: data.username, password: data.password });
      if (typeof response.data?.token !== 'string' || !response.data.token.trim()) {
        setError('root', { message: 'استجابة تسجيل الدخول غير مكتملة. أعد المحاولة أو تواصل مع مسؤول النظام.' });
        return;
      }
      login(response.data.token, data.username);
    } catch (error) {
      setError('root', { message: loginErrorMessage(error) });
    }
  };

  if (isAuthenticated) {
    return <QueryClientProvider client={queryClient}><Suspense fallback={<main className="app-bootstrap" aria-label="جارٍ تحميل المنصة" aria-busy="true"><LoadingSkeleton variant="detail" /></main>}><AuthenticatedRoutes /></Suspense></QueryClientProvider>;
  }

  return (
    <main className="login-page" dir="rtl">
      <svg className="login-shape-defs" aria-hidden="true"><defs><clipPath id="login-brand-curve" clipPathUnits="objectBoundingBox"><path d="M0 0 H1 C.94 .16 .92 .27 .95 .43 C1 .67 1 .82 .87 1 H0 Z" /></clipPath></defs></svg>
      <span className="login-language"><Globe2 size={22} aria-hidden="true" />العربية</span>
      <section className="login-form-panel" aria-labelledby="login-title">
        <div className="login-form-content">
          <img src="/training/organization-logo.png" alt="شعار شركة مياه الشرب والصرف الصحي بالمنيا" className="login-form-logo" width="172" height="172" />
          <header className="login-form-heading">
            <h1 id="login-title">تسجيل الدخول إلى النظام</h1>
            <p>منصة إدارة التدريب والتطوير</p>
          </header>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)} aria-busy={isSubmitting} noValidate>
            {errors.root && <div ref={errorSummaryRef} tabIndex={-1} className="login-error login-root-error" role="alert"><strong>لم يتم تسجيل الدخول</strong><p>{errors.root.message}</p></div>}
            <div className="login-field">
              <label htmlFor="login-username">اسم المستخدم <span className="login-required" aria-hidden="true">*</span></label>
              <div className={`login-input-shell ${errors.username ? 'has-error' : ''}`}>
                <UserRound aria-hidden="true" size={20} />
                <input id="login-username" type="text" required autoComplete="username" autoCapitalize="none" spellCheck={false} readOnly={isSubmitting} placeholder="أدخل اسم المستخدم" aria-invalid={Boolean(errors.username)} aria-describedby={errors.username ? 'username-error' : undefined} {...register('username')} />
              </div>
              {errors.username && <p id="username-error" className="login-error" role="alert">{errors.username.message}</p>}
            </div>
            <div className="login-field">
              <label htmlFor="login-password">كلمة المرور <span className="login-required" aria-hidden="true">*</span></label>
              <div className={`login-input-shell ${errors.password ? 'has-error' : ''}`}>
                <LockKeyhole aria-hidden="true" size={20} />
                <input id="login-password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password" readOnly={isSubmitting} placeholder="أدخل كلمة المرور" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined} {...register('password')} />
                <button type="button" className="password-toggle" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'} aria-pressed={showPassword}>
                  {showPassword ? <EyeOff aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
                </button>
              </div>
              {errors.password && <p id="password-error" className="login-error" role="alert">{errors.password.message}</p>}
            </div>
            <button className="login-submit" disabled={isSubmitting} type="submit">
              <span>{isSubmitting ? 'جارٍ تسجيل الدخول...' : 'دخول'}</span>{!isSubmitting && <ArrowLeft aria-hidden="true" size={21} />}
            </button>
            <span className="visually-hidden" role="status">{isSubmitting ? 'جارٍ تسجيل الدخول' : ''}</span>

          </form>
          <aside className="login-security-note">
            <div className="login-team-label"><UsersRound aria-hidden="true" size={26} /><strong>دخول مخصص لفريق العمل</strong></div>
            <p>إذا لم يكن لديك حساب أو تواجه مشكلة في الدخول، تواصل مع مسؤول النظام.</p>
          </aside>
        </div>
      </section>
      <section className="login-brand-panel" aria-label="منصة إدارة التدريب">
        <img className="login-training-image" src="/training/development.jpg" alt="تدريب عملي لفريق العمل على معدات المياه" width="1440" height="737" />
        <header className="login-brand-content">
          <div className="login-platform-label"><GraduationCap size={28} aria-hidden="true" />منصة إدارة التدريب والتطوير</div>
          <h2>شركة مياه الشرب<br />والصرف الصحي بالمنيا</h2>
          <p className="brand-department">إدارة التدريب والتطوير</p>
          <p className="brand-tagline">بناء الكفاءات .. من أجل مستقبل أفضل</p>
          <div className="login-capabilities" aria-label="مجالات المنصة">
            <div><CalendarDays aria-hidden="true" /><span>التخطيط<br />والتنفيذ</span></div>
            <div><UsersRound aria-hidden="true" /><span>إدارة<br />المتدربين</span></div>
            <div><BarChart3 aria-hidden="true" /><span>التقييم<br />والنتائج</span></div>
            <div><ShieldCheck aria-hidden="true" /><span>الشهادات<br />والوثائق</span></div>
          </div>
        </header>
        <svg className="login-waves" viewBox="0 0 850 210" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#5bd6ff" fillOpacity=".6" d="M0 28 C220 -55 410 235 850 70 V210 H0Z" />
          <path fill="#def6ff" fillOpacity=".85" d="M0 58 C250 -24 440 238 850 90 V210 H0Z" />
          <path fill="#008bce" d="M0 68 C260 -10 450 250 850 100 V210 H0Z" />
          <path fill="#005fa7" d="M0 96 C270 -5 440 285 850 118 V210 H0Z" />
          <path fill="#12a5df" fillOpacity=".8" d="M0 186 C270 25 480 260 850 155 V210 H0Z" />
        </svg>
      </section>
    </main>
  );
}
