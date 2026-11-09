import { ReferenceActions } from '../../../shared/components/ReferenceActions';
import { ClipboardList,Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table } from '../../../shared/components/Table';
import { usePerformanceEvaluationParticipantCategorys } from '../api/useListQuery';

export function PerformanceEvaluationParticipantCategoryList() {
  const { data, isLoading, isError, refetch } = usePerformanceEvaluationParticipantCategorys();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const columns: import("../../../shared/components/Table").Column<NonNullable<typeof data>[number]>[] = [
    { header: 'رقم نوع المشارك', accessor: (row: any) => row.participant_type_id !== undefined ? <Badge variant="neutral"># {row.participant_type_id}</Badge> : '—' },
    { header: 'رقم فئة تقييم الأداء', accessor: (row: any) => row.performance_evaluation_category_id !== undefined ? <Badge variant="neutral"># {row.performance_evaluation_category_id}</Badge> : '—' },
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
        title="ربط فئات المشاركين بتقييم الأداء"
        subtitle="تخصيص نماذج وفئات التقييم لأنواع معينة من المشاركين."
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'ربط الفئات' },
          { label: 'ربط فئات المشاركين بتقييم الأداء' },
        ]}
      />

      <Card>
        <div className="record-search-toolbar" style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
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
          <ReferenceActions placement="toolbar" />
        </div>
        <Table
          data={filtered}
          columns={columns}
          isLoading={isLoading}
          onRowClick={(row) => navigate('/performance-evaluation-participant-categories/' + row.id)}
          compact
          emptyTitle="لا توجد بيانات مسجلة"
          emptyIcon={<ClipboardList size={28} />}
        />
      </Card>
    </div>
  );
}
