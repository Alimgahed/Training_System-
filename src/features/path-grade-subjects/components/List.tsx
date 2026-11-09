import { ArrowLeft,GraduationCap,Search } from 'lucide-react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table } from '../../../shared/components/Table';
import { usePathGradeSubjects } from '../api/useListQuery';

export function PathGradeSubjectList() {
  const { data, isLoading, isError, refetch } = usePathGradeSubjects();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const columns: import("../../../shared/components/Table").Column<NonNullable<typeof data>[number]>[] = [
    { header: 'الكود', accessor: (row: any) => <span style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{row.code || '—'}</span> },
    { header: 'اسم المادة', accessor: (row: any) => <span style={{ fontWeight: 600 }}>{row.name || '—'}</span> },
    { header: 'رقم مرحلة المسار', accessor: (row: any) => row.path_grade_id ? <Badge variant="info"># {row.path_grade_id}</Badge> : '—' },
    { header: 'المادة العامة', accessor: (row: any) => row.learning_subject_id || '—' },
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
        title="مواد مراحل المسارات"
        subtitle="المناهج والمواد المخصصة لكل مرحلة بالمسار التدريبي."
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'الهيكل الأكاديمي' },
          { label: 'مواد مراحل المسارات' },
        ]}
        badge={<Badge variant="neutral">المستوى الثالث: المادة التدريبية</Badge>}
        actions={
          <Link to="/path-grade-subject-terms">
            <Button variant="outline" size="sm">عرض فصول المواد (Subject Terms) <ArrowLeft size={16} /></Button>
          </Link>
        }
      />

      <Card>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
            <Search size={16} style={{ position: 'absolute', right: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
            <input
              type="text"
              placeholder="بحث في المناهج والمسارات..."
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
          onRowClick={(row) => navigate('/path-grade-subjects/' + row.id)}
          compact
          emptyTitle="لا توجد بيانات مسجلة"
          emptyIcon={<GraduationCap size={28} />}
        />
      </Card>
    </div>
  );
}
