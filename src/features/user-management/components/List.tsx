import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation,useQuery,useQueryClient } from '@tanstack/react-query';
import { CalendarDays,KeyRound,LockKeyhole,LogOut,RotateCcw,Search,ShieldCheck,UserPlus,UsersRound } from 'lucide-react';
import { useMemo,useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthStore } from '../../../core/store/useAuthStore';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { usePersons } from '../../persons/api/useListQuery';
import { changePassword,getAllowedGroups,getUsers,logoutUser,registerUser,resetUserPassword } from '../api';

const registerSchema = z.object({
  person_id: z.coerce.number().min(1, 'اختر الموظف'),
  username: z.string().min(3, 'اسم المستخدم يجب ألا يقل عن 3 أحرف'),
  password: z.string().min(8, 'كلمة المرور يجب ألا تقل عن 8 أحرف'),
  group_id: z.coerce.number().min(1, 'اختر مجموعة الصلاحيات'),
});
const passwordSchema = z.object({
  old_password: z.string().min(1, 'أدخل كلمة المرور الحالية'),
  new_password: z.string().min(8, 'كلمة المرور الجديدة يجب ألا تقل عن 8 أحرف'),
});
type RegisterValues = z.infer<typeof registerSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

function errorMessage(error: unknown) {
  const responseMessage = (error as { response?: { data?: { error?: string; message?: string } } })?.response?.data;
  return responseMessage?.message || responseMessage?.error || 'تعذر تنفيذ الطلب. راجع البيانات أو صلاحيتك ثم أعد المحاولة.';
}

export function UserManagement() {
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((state) => state.logout);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [resetTarget, setResetTarget] = useState<number | null>(null);
  const [resetPassword, setResetPassword] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { data: users = [], isLoading: loadingUsers } = useQuery({ queryKey: ['users'], queryFn: getUsers });
  const { data: groups = [], isLoading: loadingGroups } = useQuery({ queryKey: ['allowed-groups'], queryFn: getAllowedGroups });
  const { data: persons = [], isLoading: loadingPersons } = usePersons();

  const availablePeople = useMemo(
    () => persons.filter((person: any) => !person.user_name && !users.some((user) => user.id === person.id)),
    [persons, users],
  );
  const groupNames = useMemo(() => new Map(groups.map((group) => [group.id, group.name])), [groups]);
  const visibleUsers = useMemo(() => {
    const normalizedSearch = userSearch.trim().toLocaleLowerCase('ar');
    return users.filter((user) => {
      const matchesSearch = !normalizedSearch || `${user.name || ''} ${user.username} ${user.code || ''}`.toLocaleLowerCase('ar').includes(normalizedSearch);
      const matchesGroup = groupFilter === 'all' || String(user.group_id ?? '') === groupFilter;
      const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? user.is_active : !user.is_active);
      return matchesSearch && matchesGroup && matchesStatus;
    });
  }, [groupFilter, statusFilter, userSearch, users]);

  const registerForm = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });
  const changeForm = useForm<PasswordValues>({ resolver: zodResolver(passwordSchema) });
  const createMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['users'] }); registerForm.reset(); setError(''); setFeedback('تم إنشاء حساب المستخدم وربطه بالموظف.'); },
    onError: (cause) => { setFeedback(''); setError(errorMessage(cause)); },
  });
  const changeMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => { changeForm.reset(); setError(''); setFeedback('تم تغيير كلمة المرور بنجاح.'); },
    onError: (cause) => { setFeedback(''); setError(errorMessage(cause)); },
  });
  const resetMutation = useMutation({
    mutationFn: ({ personId, password }: { personId: number; password: string }) => resetUserPassword(personId, { new_password: password }),
    onSuccess: () => { setResetTarget(null); setResetPassword(''); setError(''); setFeedback('تم تعيين كلمة المرور الجديدة.'); },
    onError: (cause) => { setFeedback(''); setError(errorMessage(cause)); },
  });
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSettled: () => { clearSession(); window.location.assign('/'); },
  });

  const onRegister = (values: RegisterValues) => { setFeedback(''); setError(''); createMutation.mutate(values); };
  const onChangePassword = (values: PasswordValues) => { setFeedback(''); setError(''); changeMutation.mutate(values); };
  const displayedDate = new Intl.DateTimeFormat('ar-EG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  const displayedTime = new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit' }).format(new Date());

  return (
    <div className="user-admin-page">
      <nav className="people-breadcrumb"><a href="/">الرئيسية</a><span>‹</span><span>الموارد البشرية</span><span>‹</span><strong>إدارة الحسابات</strong></nav>
      <header className="user-admin-hero">
        <div className="user-admin-hero__copy"><p>إدارة الحسابات</p><h1>إدارة حسابات المستخدمين</h1><span>إنشاء حسابات الموظفين وإدارة الصلاحيات وكلمات المرور.</span></div>
        <div className="user-admin-hero__tools">
          <div className="user-admin-date"><CalendarDays size={20} /><span><strong>{displayedDate}</strong><small>{displayedTime}</small></span></div>
          <Button variant="outline" onClick={() => logoutMutation.mutate()} isLoading={logoutMutation.isPending}><LogOut size={17} />إنهاء الجلسة</Button>
        </div>
      </header>
      {(feedback || error) && <div className={`user-feedback ${error ? 'is-error' : 'is-success'}`} role={error ? 'alert' : 'status'}>{error || feedback}</div>}

      <div className="user-admin-grid">
        <section className="user-admin-card user-create-card">
          <header><span><UserPlus size={22} /></span><div><h2>تسجيل مستخدم جديد</h2><p>اختر موظفاً ليس لديه حساب، ثم حدّد المجموعة المناسبة.</p></div></header>
          <form className="user-register-form" onSubmit={registerForm.handleSubmit(onRegister)}>
            <Select label="الموظف *" error={registerForm.formState.errors.person_id?.message} isLoading={loadingPersons || loadingUsers}
              options={availablePeople.map((person: any) => ({ value: person.id ?? "", label: `${person.name || 'موظف'}${person.code ? ` · ${person.code}` : ''}` }))}
              {...registerForm.register('person_id')} />
            <Input label="اسم المستخدم *" autoComplete="username" error={registerForm.formState.errors.username?.message} {...registerForm.register('username')} />
            <Input label="كلمة المرور المؤقتة *" type="password" autoComplete="new-password" error={registerForm.formState.errors.password?.message} {...registerForm.register('password')} />
            <Select label="مجموعة الصلاحيات *" error={registerForm.formState.errors.group_id?.message} isLoading={loadingGroups}
              options={groups.map((group) => ({ value: group.id ?? "", label: group.name }))} {...registerForm.register('group_id')} />
            <Button type="submit" isLoading={createMutation.isPending}><UserPlus size={18} />إنشاء الحساب</Button>
          </form>
          {!loadingPersons && !loadingUsers && availablePeople.length === 0 && <p className="user-form-hint">كل الموظفين الموجودين لديهم حسابات مسجلة بالفعل.</p>}
        </section>

        <section className="user-admin-card user-password-card">
          <header><span><LockKeyhole size={22} /></span><div><h2>تغيير كلمة مروري</h2><p>تحديث كلمة مرور الحساب الحالي.</p></div></header>
          <form className="user-password-form" onSubmit={changeForm.handleSubmit(onChangePassword)}>
            <Input label="كلمة المرور الحالية *" type="password" autoComplete="current-password" error={changeForm.formState.errors.old_password?.message} {...changeForm.register('old_password')} />
            <Input label="كلمة المرور الجديدة *" type="password" autoComplete="new-password" error={changeForm.formState.errors.new_password?.message} {...changeForm.register('new_password')} />
            <Button type="submit" variant="outline" isLoading={changeMutation.isPending}><KeyRound size={18} />حفظ كلمة المرور</Button>
          </form>
        </section>

        <section className="user-admin-card user-list-card">
          <header className="user-list-heading"><span><UsersRound size={22} /></span><div><h2>المستخدمون المسجلون</h2><p>جميع حسابات المستخدمين في النظام</p></div><strong className="user-count">{visibleUsers.length} <small>من {users.length}</small></strong></header>
          <div className="user-list-toolbar">
            <label className="user-list-search"><span className="visually-hidden">البحث في المستخدمين</span><Search size={18} aria-hidden="true" /><input value={userSearch} onChange={(event) => setUserSearch(event.target.value)} placeholder="البحث عن مستخدم، رقم موظف..." /></label>
            <label className="user-list-filter"><span className="visually-hidden">تصفية حسب مجموعة الصلاحيات</span><ShieldCheck size={16} aria-hidden="true" /><select value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)}><option value="all">جميع المجموعات</option>{groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}</select></label>
            <label className="user-list-filter"><span className="visually-hidden">تصفية حسب حالة الحساب</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">جميع الحالات</option><option value="active">نشط</option><option value="inactive">غير نشط</option></select></label>
          </div>
          {loadingUsers ? <p className="user-form-hint">جارٍ تحميل الحسابات...</p> : visibleUsers.length ? (
            <div className="users-table-wrap"><table className="users-table"><thead><tr><th>المستخدم</th><th>اسم الدخول</th><th>المجموعة</th><th>الحالة</th><th>إجراء</th></tr></thead><tbody>
              {visibleUsers.map((user, index) => <tr key={user.id}>
                <td><span className="user-row-person"><span className="user-row-avatar" aria-hidden="true">{(user.name || user.username).trim().slice(0, 1)}</span><span><strong>{user.name || 'بدون اسم'}</strong><small>{user.code || `#${user.id}`}</small></span></span></td>
                <td dir="ltr">{user.username}</td><td><span className="user-group-name">{groupNames.get(user.group_id ?? -1) || 'بدون مجموعة'}</span></td>
                <td><span className={`user-status ${user.is_active ? 'active' : 'inactive'}`}>{user.is_active ? 'نشط' : 'غير نشط'}</span></td>
                <td><span className="visually-hidden">{index + 1}. </span>{resetTarget === user.id ? <div className="reset-user-inline"><input aria-label={`كلمة المرور الجديدة للمستخدم ${user.username}`} type="password" autoComplete="new-password" minLength={8} value={resetPassword} onChange={(event) => setResetPassword(event.target.value)} placeholder="8 أحرف على الأقل" /><Button size="sm" disabled={resetPassword.length < 8} isLoading={resetMutation.isPending} onClick={() => resetMutation.mutate({ personId: user.id, password: resetPassword })}>حفظ</Button><Button size="sm" variant="ghost" onClick={() => setResetTarget(null)}>إلغاء</Button></div> : <Button size="sm" variant="outline" onClick={() => { setResetTarget(user.id); setResetPassword(''); }}><RotateCcw size={15} />إعادة تعيين</Button>}</td>
              </tr>)}
            </tbody></table></div>
          ) : <p className="user-form-hint user-no-match">{users.length ? 'لا توجد حسابات مطابقة للبحث أو عوامل التصفية.' : 'لا توجد حسابات مستخدمين متاحة للعرض.'}</p>}
        </section>
      </div>
    </div>
  );
}
