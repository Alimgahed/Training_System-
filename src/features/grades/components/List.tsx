import { BadgeCheck,Database,Layers3,Search,Timer } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { PageHeader } from '../../../shared/components/PageHeader';
import { RecordKpis } from '../../../shared/components/RecordKpis';
import { Table } from '../../../shared/components/Table';
import { useGrades } from '../api/useListQuery';

export function GradeList() {
  const { data, isLoading, isError, refetch } = useGrades();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const columns: import("../../../shared/components/Table").Column<NonNullable<typeof data>[number]>[] = [
    { header: 'الكود', accessor: (row) => <span style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{row.code || '—'}</span> },
    { header: 'الاسم', accessor: (row) => <span style={{ fontWeight: 600 }}>{row.name || '—'}</span> },
    { header: 'المدة البينية', accessor: (row) => row.grade_interval || '—' },
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
        title="الدرجات الوظيفية"
        subtitle="الدرجات الوظيفية والمدد البينية."
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'الدرجات الوظيفية' },
        ]}
      />

      <RecordKpis isLoading={isLoading} items={[
        { label: 'إجمالي الدرجات', value: data?.length || 0, note: 'درجة وظيفية مسجلة', icon: Layers3, tone: 'blue' },
        { label: 'لها كود وظيفي', value: data?.filter(item => String(item.code ?? '').trim().length > 0).length || 0, note: 'درجة لها كود معرّف', icon: BadgeCheck, tone: 'green' },
        { label: 'مدة بينية محددة', value: data?.filter(item => String(item.grade_interval ?? '').trim().length > 0).length || 0, note: 'درجة لها مدة بينية', icon: Timer, tone: 'purple' },
      ]} />

      <Card className="catalog-list-card">
        <div className="catalog-list-toolbar" style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
            <Search size={16} style={{ position: 'absolute', right: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
            <input
              type="text"
              placeholder="بحث..."
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
          showOverview={false}
          onRowClick={(row) => navigate('/grades/' + row.id)}
          compact
          emptyTitle="لا توجد الدرجات الوظيفية"
          emptyIcon={<Database size={28} />}
        />
      </Card>
    </div>
  );
}
