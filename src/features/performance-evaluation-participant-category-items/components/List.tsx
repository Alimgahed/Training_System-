import { ClipboardList,Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Select } from '../../../shared/components/Select';
import { Table } from '../../../shared/components/Table';
import { useParticipantTypes } from '../../participant-types/api/useListQuery';
import { usePerformanceEvaluationCategorys } from '../../performance-evaluation-categories/api/useListQuery';
import { usePerformanceEvaluationParticipantCategoryItems } from '../api/useListQuery';

export function PerformanceEvaluationParticipantCategoryItemList() {
  const [participantType, setParticipantType] = useState('');
  const [evaluationCategory, setEvaluationCategory] = useState('');
  const { data, isLoading, isError, refetch } = usePerformanceEvaluationParticipantCategoryItems({
    participant_type_id: participantType ? Number(participantType) : undefined,
    performance_evaluation_category_id: evaluationCategory ? Number(evaluationCategory) : undefined,
  });
  const { data: participantTypes = [], isLoading: loadingTypes } = useParticipantTypes();
  const { data: evaluationCategories = [], isLoading: loadingCategories } = usePerformanceEvaluationCategorys();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const columns: import("../../../shared/components/Table").Column<NonNullable<typeof data>[number]>[] = [
    { header: 'فئة التقييم', accessor: (row: any) => row.performance_evaluation_participant_category?.performance_evaluation_category?.name || (row.performance_evaluation_participant_category_id !== undefined ? `فئة #${row.performance_evaluation_participant_category_id}` : '—') },
    { header: 'نوع المشارك', accessor: (row: any) => row.performance_evaluation_participant_category?.participant_type?.name || '—' },
    { header: 'بند التقييم', accessor: (row: any) => row.performance_evaluation_item?.name || (row.performance_evaluation_item_id !== undefined ? `بند #${row.performance_evaluation_item_id}` : '—') },
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
        title="بنود فئات تقييم المشاركين"
        subtitle="عناصر التقييم التفصيلية التابعة لكل فئة مشاركين."
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'بنود التقييم' },
          { label: 'بنود فئات تقييم المشاركين' },
        ]}
      />

      <Card>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', alignItems: 'end', gap: 'var(--space-3)' }}>
          <Select label="نوع المشارك" value={participantType} onChange={(event) => setParticipantType(event.target.value)} isLoading={loadingTypes} options={[{ value: '', label: 'كل الأنواع' }, ...participantTypes.map((type: any) => ({ value: type.id ?? "", label: type.name || `نوع #${type.id}` }))]} />
          <Select label="فئة التقييم" value={evaluationCategory} onChange={(event) => setEvaluationCategory(event.target.value)} isLoading={loadingCategories} options={[{ value: '', label: 'كل الفئات' }, ...evaluationCategories.map((category: any) => ({ value: category.id ?? "", label: category.name || `فئة #${category.id}` }))]} />
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
          onRowClick={(row) => navigate('/performance-evaluation-participant-category-items/' + row.id)}
          compact
          emptyTitle="لا توجد بيانات مسجلة"
          emptyIcon={<ClipboardList size={28} />}
        />
      </Card>
    </div>
  );
}
