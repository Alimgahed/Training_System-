/**
 * Enterprise UI/UX Transformation — Phase 5D
 * Redesign Operational Training Screens (Pattern D)
 * 
 * Entities:
 * CourseSession (Full CRUD - has create button), CourseParticipant, CourseSessionParticipant, CourseParticipantFinalExam
 */

const fs = require('fs');
const path = require('path');

const entities = [
  {
    folder: 'course-sessions',
    typeName: 'CourseSession',
    componentName: 'CourseSession',
    hookName: 'useCourseSessions',
    detailHook: 'useCourseSession',
    arabicName: 'الجلسات التدريبية',
    arabicSingular: 'جلسة تدريبية',
    subtitle: 'جدول المواعيد الزمني للجلسات والمحاضرات التدريبية المنفذة.',
    hasCreate: true,
    createPath: '/course-sessions/new',
    createLabel: 'جدولة جلسة جديدة',
    columns: [
      { header: 'تاريخ الجلسة', accessor: 'session_date', bold: true },
      { header: 'وقت البدء', accessor: 'start_time' },
      { header: 'وقت الانتهاء', accessor: 'end_time' },
      { header: 'رقم الدورة', accessor: 'course_id', badge: true },
    ],
    detailFields: [
      { label: 'تاريخ انعقاد الجلسة', field: 'session_date' },
      { label: 'وقت البدء', field: 'start_time' },
      { label: 'وقت الانتهاء', field: 'end_time' },
      { label: 'معرف الدورة التدريبية', field: 'course_id' },
    ],
  },
  {
    folder: 'course-participants',
    typeName: 'CourseParticipant',
    componentName: 'CourseParticipant',
    hookName: 'useCourseParticipants',
    detailHook: 'useCourseParticipant',
    arabicName: 'مشاركو الدورات التدريبية',
    arabicSingular: 'مشارك دورة',
    subtitle: 'قوائم المتدربين المسجلين في البرامج والدورات التدريبية.',
    columns: [
      { header: 'رقم المتدرب / الموظف', accessor: 'person_id', badge: true },
      { header: 'رقم الدورة التدريبية', accessor: 'course_id', badge: true },
    ],
    detailFields: [
      { label: 'معرف المتدرب / الشخص', field: 'person_id' },
      { label: 'معرف الدورة التدريبية', field: 'course_id' },
    ],
    nestedArrays: [
      {
        key: 'final_exams',
        label: 'الاختبارات النهائية للمتدرب',
        columns: [
          { header: 'تاريخ الاختبار', accessor: 'exam_date' },
          { header: 'الجهة المنظمة', accessor: 'organized_by' },
          { header: 'الدرجة', accessor: 'exam_score' },
        ]
      },
      {
        key: 'performance_evaluation_details',
        label: 'تفاصيل تقييم أداء المتدرب',
        columns: [
          { header: 'الدرجة المستحقة', accessor: 'score' },
          { header: 'ملاحظات التقييم', accessor: 'notes' },
          { header: 'تاريخ الإدخال', accessor: 'entered_at' },
        ]
      }
    ]
  },
  {
    folder: 'course-session-participants',
    typeName: 'CourseSessionParticipant',
    componentName: 'CourseSessionParticipant',
    hookName: 'useCourseSessionParticipants',
    detailHook: 'useCourseSessionParticipant',
    arabicName: 'حضور جلسات التدريب',
    arabicSingular: 'حضور جلسة',
    subtitle: 'سجلات الحضور والتواجد الفعلي للمتدربين في الجلسات التدريبية.',
    columns: [
      { header: 'رقم الجلسة التدريبية', accessor: 'course_session_id', badge: true },
      { header: 'رقم المتدرب', accessor: 'person_id', badge: true },
    ],
    detailFields: [
      { label: 'معرف الجلسة التدريبية', field: 'course_session_id' },
      { label: 'معرف المتدرب / الشخص', field: 'person_id' },
    ],
  },
  {
    folder: 'course-participant-final-exams',
    typeName: 'CourseParticipantFinalExam',
    componentName: 'CourseParticipantFinalExam',
    hookName: 'useCourseParticipantFinalExams',
    detailHook: 'useCourseParticipantFinalExam',
    arabicName: 'نتائج الاختبارات النهائية',
    arabicSingular: 'اختبار نهائي',
    subtitle: 'سجلات نتائج ودرجات الاختبارات النهائية للمشاركين في الدورات.',
    columns: [
      { header: 'تاريخ الاختبار', accessor: 'exam_date', bold: true },
      { header: 'الجهة المنظمة', accessor: 'organized_by' },
      { header: 'الدرجة المحققة', accessor: 'exam_score', score: true },
      { header: 'رقم المشارك', accessor: 'course_participant_id', badge: true },
    ],
    detailFields: [
      { label: 'تاريخ الاختبار', field: 'exam_date' },
      { label: 'الجهة المنظمة', field: 'organized_by' },
      { label: 'الدرجة المحققة', field: 'exam_score' },
      { label: 'معرف ملف الوثيقة المرفقة', field: 'documentation_id' },
      { label: 'معرف مشارك الدورة', field: 'course_participant_id' },
    ],
  },
];

function generateList(entity) {
  const columnsDef = entity.columns.map(col => {
    let accessor;
    if (col.badge) {
      accessor = `(row: any) => row.${col.accessor} ? <Badge variant="info"># {row.${col.accessor}}</Badge> : '—'`;
    } else if (col.score) {
      accessor = `(row: any) => row.${col.accessor} !== undefined ? <Badge variant={Number(row.${col.accessor}) >= 50 ? 'success' : 'danger'}>{row.${col.accessor}} درجة</Badge> : '—'`;
    } else if (col.bold) {
      accessor = `(row: any) => <span style={{ fontWeight: 600 }}>{row.${col.accessor} || '—'}</span>`;
    } else {
      accessor = `(row: any) => row.${col.accessor} || '—'`;
    }
    return `    { header: '${col.header}', accessor: ${accessor} }`;
  }).join(',\n');

  return `import { useNavigate, Link } from 'react-router-dom';
import { ${entity.hookName} } from '../api/useListQuery';
import { Card } from '../../../shared/components/Card';
import { Table } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { PageHeader } from '../../../shared/components/PageHeader';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Search, Calendar, Plus } from 'lucide-react';
import { useState } from 'react';

export function ${entity.componentName}List() {
  const { data, isLoading, isError, refetch } = ${entity.hookName}();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const columns = [
${columnsDef},
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
        title="${entity.arabicName}"
        subtitle="${entity.subtitle}"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'شئون التدريب والعمليات' },
          { label: '${entity.arabicName}' },
        ]}
        actions={
          ${entity.hasCreate ? `<Link to="${entity.createPath}">
            <Button><Plus size={16} /> ${entity.createLabel}</Button>
          </Link>` : 'undefined'}
        }
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
          onRowClick={(row) => navigate('/${entity.folder}/' + row.id)}
          compact
          emptyTitle="لا توجد بيانات مسجلة"
          emptyIcon={<Calendar size={28} />}
        />
      </Card>
    </div>
  );
}
`;
}

function generateDetail(entity) {
  const fieldItems = entity.detailFields.map(f => 
    `            <InfoField label="${f.label}" value={data?.${f.field}} />`
  ).join('\n');

  let nestedSections = '';
  if (entity.nestedArrays && entity.nestedArrays.length > 0) {
    nestedSections = entity.nestedArrays.map(na => {
      const cols = na.columns.map(c => `              { header: '${c.header}', accessor: (r: any) => r.${c.accessor} !== undefined ? String(r.${c.accessor}) : '—' }`).join(',\n');
      return `
      {data?.${na.key} && data.${na.key}.length > 0 && (
        <Card title="${na.label}">
          <Table
            data={data.${na.key}}
            columns={[
${cols}
            ]}
            compact
          />
        </Card>
      )}`;
    }).join('\n');
  }

  return `import { useParams, Link } from 'react-router-dom';
import { ${entity.detailHook} } from '../api/useGetQuery';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Card } from '../../../shared/components/Card';
import { Table } from '../../../shared/components/Table';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Button } from '../../../shared/components/Button';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const InfoField: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{value ?? '—'}</span>
  </div>
);

export function ${entity.componentName}Detail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = ${entity.detailHook}(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={'تفاصيل ${entity.arabicSingular} #' + id}
        subtitle="سجل تفاصيل ومتابعة ${entity.arabicSingular}"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'شئون التدريب والعمليات' },
          { label: '${entity.arabicName}', href: '/${entity.folder}' },
          { label: '#' + id },
        ]}
        actions={
          <Link to="/${entity.folder}">
            <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
          </Link>
        }
      />

      <Card title="بيانات السجل">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
${fieldItems}
        </div>
      </Card>
${nestedSections}
    </div>
  );
}
`;
}

const basePath = path.join(process.cwd(), 'src', 'features');
let generated = 0;

entities.forEach(entity => {
  const listPath = path.join(basePath, entity.folder, 'components', 'List.tsx');
  const detailPath = path.join(basePath, entity.folder, 'components', 'Detail.tsx');

  if (fs.existsSync(path.dirname(listPath))) {
    fs.writeFileSync(listPath, generateList(entity));
    fs.writeFileSync(detailPath, generateDetail(entity));
    generated += 2;
    console.log(`✅ ${entity.typeName}: List + Detail redesigned`);
  } else {
    console.log(`⚠️ ${entity.typeName}: directory not found at ${path.dirname(listPath)}`);
  }
});

console.log(`\n🎉 Pattern D complete: ${generated} files regenerated for ${entities.length} entities`);
