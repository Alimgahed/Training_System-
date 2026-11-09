import { Clock,FileText,Info,Users } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '../../../shared/components/Badge';
import { Card } from '../../../shared/components/Card';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table } from '../../../shared/components/Table';
import { Tabs } from '../../../shared/components/Tabs';
import { useCourse } from '../api/useGetQuery';

const InfoField = ({ label, value }: { label: string, value: any }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value || '—'}</span>
  </div>
);

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading, isError, error } = useCourse(id || '');
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState error={error as Error} />;
  if (!course) return <ErrorState error={new Error("Course not found")} />;

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: <Info size={16} /> },
    { id: 'sessions', label: 'الجلسات', icon: <Clock size={16} /> },
    { id: 'participants', label: 'المشاركون', icon: <Users size={16} /> },
    { id: 'documents', label: 'الوثائق', icon: <FileText size={16} /> }
  ];

  const actions = (
    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
      {course.is_planned && <Badge variant="warning">مخططة</Badge>}
      {course.is_executed && <Badge variant="success">منفذة</Badge>}
    </div>
  );

  const overviewTab = (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
      <Card title="معلومات الدورة">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <InfoField label="الاسم" value={course.name} />
          <InfoField label="مسار التدريب" value={course.path_grade_subject_id} />
          <InfoField label="فصل المسار" value={course.path_grade_subject_term_id} />
          <InfoField label="مادة التعلم" value={course.learning_subject_id} />
        </div>
      </Card>
      <Card title="التواريخ والمدة">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <InfoField label="المدة (أيام)" value={course.duration_in_days} />
          <InfoField label="تاريخ البدء" value={course.starting_date} />
          <InfoField label="تاريخ الانتهاء" value={course.end_date} />
        </div>
      </Card>
      <Card title="الطاقم التدريبي">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <InfoField label="المدرب" value={course.trainer_id} />
          <InfoField label="المدرب الاحتياطي" value={course.backup_trainer_id} />
          <InfoField label="المنسق" value={course.coordinator_id} />
        </div>
      </Card>
      <Card title="التكلفة والتمويل">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <InfoField label="التكلفة" value={course.cost} />
          <InfoField label="جهة التمويل" value={course.funding_organization_id} />
          <InfoField label="عدد المشاركين الداخليين" value={course.number_of_internal_participants} />
          <InfoField label="عدد المشاركين الخارجيين" value={course.number_of_external_participants} />
        </div>
      </Card>
    </div>
  );

  const renderTabContent = (activeTabId: string) => {
    switch (activeTabId) {
      case 'overview': return overviewTab;
      case 'sessions': return (
        <Card>
          <Table 
            data={course.sessions || []}
            columns={[
              { header: 'تاريخ', accessor: 'session_date' },
              { header: 'وقت البدء', accessor: 'start_time' },
              { header: 'وقت الانتهاء', accessor: 'end_time' }
            ]}
          />
        </Card>
      );
      case 'participants': return (
        <Card>
          <Table 
            data={course.participants || []}
            columns={[
              { header: 'المشارك', accessor: 'participant_name' }
            ]}
          />
        </Card>
      );
      case 'documents': return (
        <Card>
          <Table 
            data={course.documentations || []}
            columns={[
              { header: 'الاسم', accessor: 'name' },
              { header: 'المسار', accessor: 'path' }
            ]}
          />
        </Card>
      );
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader 
        title={course.name || 'تفاصيل الدورة'} 
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' }, 
          { label: 'الدورات التدريبية', href: '/courses' }, 
          { label: course.name || 'تفاصيل الدورة' }
        ]} 
        actions={actions}
      />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
        {renderTabContent(activeTab)}
      </Tabs>
    </div>
  );
}
