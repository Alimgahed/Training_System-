import { Link, useParams } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { usePerson } from '../api/useGetQuery';

const InfoField = ({ label, value }: { label: string, value: any }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value || '—'}</span>
  </div>
);

const relationName = (relation?: { name?: string | null } | null, fallback?: any) => relation?.name || fallback || '—';
const displayDate = (value?: string | null) => value ? value.slice(0, 10) : '—';

export function PersonDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: person, isLoading, isError, error } = usePerson(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState error={error as Error} />;
  if (!person) return <ErrorState error={new Error("Person not found")} />;

  const actions = (
    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
      <Link to={`/persons/${id}/edit`}>تعديل بيانات الموظف</Link>
      {person.is_active ? <Badge variant="success">نشط</Badge> : <Badge variant="danger">غير نشط</Badge>}
      {person.is_trainer && <Badge variant="info">مدرب</Badge>}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader 
        title={person.name || 'تفاصيل الموظف'} 
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' }, 
          { label: 'الموظفين', href: '/persons' }, 
          { label: person.name || 'تفاصيل الموظف' }
        ]} 
        actions={actions}
      />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
        <Card title="البيانات الشخصية">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <InfoField label="الكود" value={person.code} />
            <InfoField label="الاسم" value={person.name} />
            <InfoField label="الهاتف" value={person.telephone_whatsapp} />
            <InfoField label="العنوان" value={person.address} />
            <InfoField label="المحافظة" value={relationName(person.governorate, person.governorate_id)} />
          </div>
        </Card>

        <Card title="بيانات العمل">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <InfoField label="جهة العمل" value={relationName(person.organization, person.organization_id)} />
            <InfoField label="الإدارة" value={relationName(person.department, person.department_id)} />
            <InfoField label="الوظيفة" value={relationName(person.job, person.job_id)} />
            <InfoField label="المجموعة الوظيفية" value={relationName(person.job_type_group_data, person.job_type_group_id || person.job_type_group)} />
            <InfoField label="موقع العمل" value={relationName(person.work_site, person.work_site_id)} />
            <InfoField label="تاريخ التعاقد" value={displayDate(person.contract_date)} />
          </div>
        </Card>

        <div style={{ gridColumn: '1 / -1' }}>
          <Card title="المسار التدريبي">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
              <InfoField label="المسار التدريبي الحالي" value={relationName(person.current_learning_path, person.current_learning_path_id)} />
              <InfoField label="الدرجة الحالية" value={relationName(person.current_grade_data, person.current_grade_id || person.current_grade)} />
              <InfoField label="تاريخ الدرجة الحالية" value={displayDate(person.date_of_current_grade)} />
              <InfoField label="المؤهل" value={relationName(person.qualification, person.qualification_id)} />
            </div>
          </Card>
        </div>

        {person.is_trainer && (
          <div style={{ gridColumn: '1 / -1' }}>
            <Card title="بيانات المدرب">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
                <InfoField label="الجهة المانحة لشهادة المدرب" value={relationName(person.trainer_certifying_organization, person.trainer_certifying_organization_id)} />
              </div>
            </Card>
          </div>
        )}

        <div style={{ gridColumn: '1 / -1' }}>
          <Card title="حساب النظام">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
              <InfoField label="اسم المستخدم" value={person.user_name} />
              <InfoField label="مجموعة الصلاحيات" value={person.group_id} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
