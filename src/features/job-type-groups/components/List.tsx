import { ReferenceActions } from '../../../shared/components/ReferenceActions';
import { Building,Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table } from '../../../shared/components/Table';
import { useJobTypeGroups } from '../api/useListQuery';

export function JobTypeGroupList() {
  const { data, isLoading, isError, refetch } = useJobTypeGroups();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const columns: import("../../../shared/components/Table").Column<NonNullable<typeof data>[number]>[] = [
    { header: 'الكود', accessor: (row) => <span style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{row.code || '—'}</span> },
    { header: 'اسم المجموعة', accessor: (row) => <span style={{ fontWeight: 600 }}>{row.name || '—'}</span> },
    { header: 'رقم مجموعة العمل', accessor: (row) => row.work_group_id ? <Badge variant="neutral"># {row.work_group_id}</Badge> : '—' },
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
        title="المجموعات الوظيفية النوعية"
        subtitle="تصنيف المجموعات التخصصية والوظيفية للمهن."
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'المجموعات الوظيفية النوعية' },
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
          onRowClick={(row) => navigate('/job-type-groups/' + row.id)}
          compact
          emptyTitle="لا توجد سجلات في المجموعات الوظيفية النوعية"
          emptyIcon={<Building size={28} />}
        />
      </Card>
    </div>
  );
}
