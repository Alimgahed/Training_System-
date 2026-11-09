import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table } from '../../../shared/components/Table';
import { useOrganization } from '../api/useGetQuery';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function OrganizationDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useOrganization(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={data?.name || 'جهة'}
        subtitle={'تفاصيل جهة — معرّف #' + id}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'الجهات والمؤسسات', href: '/organizations' },
          { label: data?.name || '#' + id },
        ]}
        actions={
          <Link to="/organizations">
            <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
          </Link>
        }
      />

      <Card title="البيانات التنظيمية">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
            <InfoField label="الكود" value={data?.code} />
            <InfoField label="الاسم" value={data?.name} />
            <InfoField label="العنوان" value={data?.address} />
            <InfoField label="معرف نوع الجهة" value={data?.organization_type_id} />
            <InfoField label="معرف المحافظة" value={data?.governorate_id} />
        </div>
      </Card>

      {data?.departments && data.departments.length > 0 && (
        <Card title="الإدارات التابعة">
          <Table
            data={data.departments}
            columns={[
              { header: 'الكود', accessor: (r: any) => r.code || '—' },
              { header: 'اسم الإدارة', accessor: (r: any) => r.name || '—' }
            ]}
            compact
          />
        </Card>
      )}

      {data?.work_centers && data.work_centers.length > 0 && (
        <Card title="مراكز العمل التابعة">
          <Table
            data={data.work_centers}
            columns={[
              { header: 'اسم مركز العمل', accessor: (r: any) => r.name || '—' }
            ]}
            compact
          />
        </Card>
      )}
    </div>
  );
}
