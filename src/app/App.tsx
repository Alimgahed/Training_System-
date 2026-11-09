import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { ArrowLeft,BarChart3,BookOpen,Eye,EyeOff,Globe2,LockKeyhole,ShieldCheck,UserRound,UsersRound } from 'lucide-react';
import { lazy,Suspense,useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { apiClient } from '../core/api/apiClient';
import { useAuthStore } from '../core/store/useAuthStore';
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

const platformFeatures = [
  { icon: UsersRound, title: 'إدارة المتدربين', description: 'تطوير رأس المال البشري' },
  { icon: BookOpen, title: 'التخطيط والتنفيذ', description: 'برامج تدريبية متكاملة' },
  { icon: BarChart3, title: 'التقييم والنتائج', description: 'قياس أثر التدريب' },
  { icon: ShieldCheck, title: 'الشهادات والوثائق', description: 'توثيق واعتماد' },
];

export function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await apiClient.post('/login', { username: data.username, password: data.password });
      login(response.data.token, data.username);
    } catch {
      setError('root', { message: 'فشل تسجيل الدخول. تأكد من صحة البيانات.' });
    }
  };

  if (isAuthenticated) {
    return <QueryClientProvider client={queryClient}><Suspense fallback={<main className="app-bootstrap" aria-label="جارٍ تحميل المنصة" aria-busy="true"><LoadingSkeleton variant="detail" /></main>}><AuthenticatedRoutes /></Suspense></QueryClientProvider>;
  }

  return (
    <main className="login-page" dir="rtl">
      <section className="login-form-panel" aria-labelledby="login-title">
        <span className="language-switcher" aria-label="لغة الواجهة: العربية"><Globe2 aria-hidden="true" size={18} /><span>العربية</span></span>
        <div className="login-form-content">
          <img src="/training/organization-logo.png" alt="شعار شركة مياه الشرب والصرف الصحي بالمنيا" className="login-form-logo" width="172" height="172" />
          <header className="login-form-heading">
            <h1 id="login-title">تسجيل الدخول إلى النظام</h1>
            <p>منصة إدارة التدريب والبرامج التدريبية</p>
          </header>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="login-field">
              <label htmlFor="login-username">اسم المستخدم</label>
              <div className={`login-input-shell ${errors.username ? 'has-error' : ''}`}>
                <UserRound aria-hidden="true" size={20} />
                <input id="login-username" type="text" autoComplete="username" placeholder="أدخل اسم المستخدم" aria-invalid={Boolean(errors.username)} aria-describedby={errors.username ? 'username-error' : undefined} {...register('username')} />
              </div>
              {errors.username && <p id="username-error" className="login-error" role="alert">{errors.username.message}</p>}
            </div>
            <div className="login-field">
              <label htmlFor="login-password">كلمة المرور</label>
              <div className={`login-input-shell ${errors.password ? 'has-error' : ''}`}>
                <LockKeyhole aria-hidden="true" size={20} />
                <input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="أدخل كلمة المرور" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined} {...register('password')} />
                <button type="button" className="password-toggle" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'} aria-pressed={showPassword}>
                  {showPassword ? <EyeOff aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
                </button>
              </div>
              {errors.password && <p id="password-error" className="login-error" role="alert">{errors.password.message}</p>}
            </div>
            <p className="login-session-note">لأمان حسابك، سجّل الدخول مجدداً بعد إغلاق الصفحة.</p>
            {errors.root && <p className="login-error login-root-error" role="alert">{errors.root.message}</p>}
            <button className="login-submit" disabled={isSubmitting} type="submit">
              <span>{isSubmitting ? 'جارٍ تسجيل الدخول...' : 'دخول'}</span>{!isSubmitting && <ArrowLeft aria-hidden="true" size={21} />}
            </button>
          </form>
          <aside className="login-security-note">
            <ShieldCheck aria-hidden="true" size={29} />
            <div><strong>ملاحظة أمان</strong><p>يرجى عدم مشاركة بيانات الدخول الخاصة بك مع أي شخص آخر</p></div>
          </aside>
        </div>
      </section>
      <section className="login-brand-panel" aria-label="منصة إدارة التدريب">
        <div className="login-brand-overlay" />
        <div className="login-brand-content">
          <img src="/training/organization-logo.png" alt="" aria-hidden="true" className="login-brand-logo" width="154" height="154" />
          <p className="brand-company">شركة مياه الشرب والصرف الصحي بالمنيا</p>
          <p className="brand-department">إدارة التدريب والتطوير</p><div className="brand-rule" />
          <h2>منصة إدارة التدريب</h2><p className="brand-tagline">بناء الكفاءات .. من أجل مستقبل أفضل</p>
          <div className="platform-features">
            {platformFeatures.map(({ icon: Icon, title, description }) => (
              <article className="platform-feature" key={title}>
                <span className="platform-feature-icon"><Icon aria-hidden="true" size={29} /></span><strong>{title}</strong><small>{description}</small>
              </article>
            ))}
          </div>
        </div>
        <div className="login-brand-waves" aria-hidden="true" />
      </section>
    </main>
  );
}
