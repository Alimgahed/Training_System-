import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight,Globe2,Save } from 'lucide-react';
import { useReferenceForm as useForm, useReferenceMutation } from '../../../shared/components/ReferenceEditor';
import { Link,useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { Input } from '../../../shared/components/Input';

const schema = z.object({ name: z.string().trim().min(1, 'اسم الدولة مطلوب') });
type FormInputs = z.infer<typeof schema>;

export function CountryCreate() {
  const navigate = useNavigate();
  const mutation = useReferenceMutation<FormInputs>();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({ resolver: zodResolver(schema) });
  return <div className="form-workspace">
    <nav className="people-breadcrumb"><Link to="/">الرئيسية</Link><span>‹</span><Link to="/countries">الدول</Link><span>‹</span><strong>إضافة دولة</strong></nav>
    <header className="form-workspace-header"><div><span className="form-workspace-icon"><Globe2 size={24} /></span><div><h1>إضافة دولة</h1><p>إضافة دولة جديدة لاستخدامها في بيانات النظام والمواقع.</p></div></div><Link to="/countries"><Button variant="outline"><ArrowRight size={17} />العودة للقائمة</Button></Link></header>
    {mutation.isError && <p role="alert" className="user-feedback is-error">تعذر الحفظ. راجع البيانات والصلاحيات ثم حاول مجدداً.</p>}
      <form onSubmit={handleSubmit(data => mutation.mutate(data, { onSuccess: () => navigate('/countries') }))} className="form-workspace-form">
      <Card title="بيانات الدولة"><div className="form-workspace-grid"><Input label="اسم الدولة *" placeholder="مثال: جمهورية مصر العربية" error={errors.name?.message} autoFocus {...register('name')} /></div></Card>
      <footer className="form-workspace-actions"><Link to="/countries"><Button type="button" variant="ghost">إلغاء</Button></Link><Button type="submit" isLoading={mutation.isPending}><Save size={18} />حفظ الدولة</Button></footer>
    </form>
  </div>;
}
