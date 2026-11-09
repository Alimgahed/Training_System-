import { ClipboardList,Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table } from '../../../shared/components/Table';
import { usePerformanceEvaluationItems } from '../api/useListQuery';

export function PerformanceEvaluationItemList() {
  const { data, isLoading, isError, refetch } = usePerformanceEvaluationItems();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const columns: import("../../../shared/components/Table").Column<NonNullable<typeof data>[number]>[] = [
    { header: 'اسم المعيار / البند', accessor: (row: any) => <span style={{ fontWeight: 600 }}>{row.name || '—'}</span> },
    { header: 'الحد الأدنى للدرجة', accessor: (row: any) => row.minimum_score !== undefined ? <Badge variant="neutral"># {row.minimum_score}</Badge> : '—' },
    { header: 'الحد الأقصى للدرجة', accessor: (row: any) => row.maximum_score !== undefined ? <Badge variant="success">{row.maximum_score} درجة</Badge> : '—' },
  ];

  const filtered = data?.filter((item: any) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return Object.values(item).some(v => String(v || '').toLowerCase().includes(s));
  }) || [];

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="عناصر ومعايير تقييم الأداء"
        subtitle="بنود التقييم المحددة مع الحدود الدنيا والقصوى للدرجات."
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'معايير التقييم' },
          { label: 'عناصر ومعايير تقييم الأداء' },
        ]}
      />

      <Card>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
            <Search size={16} style={{ position: 'absolute', right: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
            <input
              type="text"
              placeholder="بحث في السجلات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '8px 36px 8px 12px',
                border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-family)',
                outline: 'none', backgroundColor: 'var(--color-surface)',
              }}
            />
          </div>
          {!isLoading && <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{filtered.length} سجل</span>}
        </div>
        <Table
          data={filtered}
          columns={columns}
          isLoading={isLoading}
          onRowClick={(row) => navigate('/performance-evaluation-items/' + row.id)}
          compact
          emptyTitle="لا توجد بيانات مسجلة"
          emptyIcon={<ClipboardList size={28} />}
        />
      </Card>
    </div>
  );
}
