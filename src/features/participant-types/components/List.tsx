import { ReferenceActions } from '../../../shared/components/ReferenceActions';
import { Database,Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table } from '../../../shared/components/Table';
import { useParticipantTypes } from '../api/useListQuery';

export function ParticipantTypeList() {
  const { data, isLoading, isError, refetch } = useParticipantTypes();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const columns: import("../../../shared/components/Table").Column<NonNullable<typeof data>[number]>[] = [
    { header: 'الاسم', accessor: (row) => <span style={{ fontWeight: 600 }}>{row.name || '—'}</span> },
  ];

  const filtered = data?.filter(item => {
    if (!search) return true;
    const s = search.toLowerCase();
    return Object.values(item).some(v => String(v || '').toLowerCase().includes(s));
  }) || [];

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="أنواع المشاركين"
        subtitle="التصنيفات المرجعية لأنواع المشاركين في التدريب."
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'أنواع المشاركين' },
        ]}
      />

      <Card>
        <div className="record-search-toolbar" style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
            <Search size={16} style={{ position: 'absolute', right: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
            <input
              type="text"
              placeholder="بحث..."
              aria-label="البحث في أنواع المشاركين"
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
          onRowClick={(row) => navigate('/participant-types/' + row.id)}
          compact
          emptyTitle="لا توجد أنواع المشاركين"
          emptyIcon={<Database size={28} />}
        />
      </Card>
    </div>
  );
}
