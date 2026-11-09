import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../../core/api/apiClient';
import { Table } from '../../../shared/components/Table';
import { PageHeader } from '../../../shared/components/PageHeader';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Card } from '../../../shared/components/Card';
import type { PerformanceEvaluationRecord } from '../api';

export function EvaluationReport({ participant = false }: { participant?: boolean }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const resource = participant ? 'performance-evaluation-course-participant-details' : 'performance-evaluation-course-details';
  const endpoint = id ? `/${resource.slice(0, -1)}/${id}` : `/${resource}`;
  const query = useQuery({ queryKey: [resource, id], queryFn: async ({ signal }) => {
    const { data } = await apiClient.get<PerformanceEvaluationRecord | PerformanceEvaluationRecord[]>(endpoint, { signal });
    return Array.isArray(data) ? data : [data];
  } });
  if (query.isError) return <ErrorState onRetry={() => query.refetch()} />;
  return <div className="evaluation-workspace"><PageHeader title={participant ? 'تقرير تقييم المشاركين' : 'تقرير تقييم الدورات'} breadcrumbs={[{ label: 'لوحة التحكم', href: '/' }, { label: 'تقييم الأداء', href: '/performance-evaluations' }]} />
    <Card><Table data={query.data || []} isLoading={query.isPending} onRowClick={id ? undefined : row => navigate(`/${resource}/${row.id}`)} columns={[
      { header: 'الدورة', accessor: row => row.course?.name || `#${row.course_id || row.course_participant?.course_id || '—'}` },
      { header: 'المشارك', accessor: row => row.course_participant?.person?.name || '—' },
      { header: 'البند', accessor: row => row.performance_evaluation_participant_category_item?.performance_evaluation_item?.name || `#${row.performance_evaluation_participant_category_item_id || '—'}` },
      { header: 'الدرجة', accessor: 'score' }, { header: 'ملاحظات', accessor: 'notes' },
      { header: 'تاريخ التسجيل', accessor: row => row.entered_at ? new Date(row.entered_at).toLocaleDateString('ar-EG') : '—' },
    ]} /></Card></div>;
}
