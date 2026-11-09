/**
 * Enterprise UI/UX Transformation — Phase 5E & 5F
 * Redesign Assessment/Evaluation Matrix (Pattern E) & Document Management (Pattern F)
 */

const fs = require('fs');
const path = require('path');

const entities = [
  // ─── Pattern E: Evaluation Matrix ───
  {
    folder: 'performance-evaluation-categories',
    typeName: 'PerformanceEvaluationCategory',
    componentName: 'PerformanceEvaluationCategory',
    hookName: 'usePerformanceEvaluationCategorys',
    detailHook: 'usePerformanceEvaluationCategory',
    arabicName: 'فئات تقييم الأداء',
    arabicSingular: 'فئة تقييم أداء',
    subtitle: 'المحاور والفئات الرئيسية لتقييم أداء المشاركين والبرامج التدريبية.',
    categoryBadge: 'تقييم الأداء',
    columns: [
      { header: 'اسم فئة التقييم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'اسم فئة التقييم', field: 'name' },
    ],
  },
  {
    folder: 'performance-evaluation-items',
    typeName: 'PerformanceEvaluationItem',
    componentName: 'PerformanceEvaluationItem',
    hookName: 'usePerformanceEvaluationItems',
    detailHook: 'usePerformanceEvaluationItem',
    arabicName: 'عناصر ومعايير تقييم الأداء',
    arabicSingular: 'عنصر تقييم',
    subtitle: 'بنود التقييم المحددة مع الحدود الدنيا والقصوى للدرجات.',
    categoryBadge: 'معايير التقييم',
    columns: [
      { header: 'اسم المعيار / البند', accessor: 'name', bold: true },
      { header: 'الحد الأدنى للدرجة', accessor: 'minimum_score', badge: true },
      { header: 'الحد الأقصى للدرجة', accessor: 'maximum_score', scoreBadge: true },
    ],
    detailFields: [
      { label: 'اسم معيار التقييم', field: 'name' },
      { label: 'الحد الأدنى للدرجة', field: 'minimum_score' },
      { label: 'الحد الأقصى للدرجة', field: 'maximum_score' },
    ],
  },
  {
    folder: 'performance-evaluation-participant-categories',
    typeName: 'PerformanceEvaluationParticipantCategory',
    componentName: 'PerformanceEvaluationParticipantCategory',
    hookName: 'usePerformanceEvaluationParticipantCategorys',
    detailHook: 'usePerformanceEvaluationParticipantCategory',
    arabicName: 'ربط فئات المشاركين بتقييم الأداء',
    arabicSingular: 'فئة مشارك التقييم',
    subtitle: 'تخصيص نماذج وفئات التقييم لأنواع معينة من المشاركين.',
    categoryBadge: 'ربط الفئات',
    columns: [
      { header: 'رقم نوع المشارك', accessor: 'participant_type_id', badge: true },
      { header: 'رقم فئة تقييم الأداء', accessor: 'performance_evaluation_category_id', badge: true },
    ],
    detailFields: [
      { label: 'معرف نوع المشارك', field: 'participant_type_id' },
      { label: 'معرف فئة تقييم الأداء', field: 'performance_evaluation_category_id' },
    ],
    nestedArrays: [
      {
        key: 'items',
        label: 'عناصر التقييم المرتبطة بهذه الفئة',
        columns: [
          { header: 'معرف عنصر التقييم', accessor: 'performance_evaluation_item_id' },
        ]
      }
    ]
  },
  {
    folder: 'performance-evaluation-participant-category-items',
    typeName: 'PerformanceEvaluationParticipantCategoryItem',
    componentName: 'PerformanceEvaluationParticipantCategoryItem',
    hookName: 'usePerformanceEvaluationParticipantCategoryItems',
    detailHook: 'usePerformanceEvaluationParticipantCategoryItem',
    arabicName: 'بنود فئات تقييم المشاركين',
    arabicSingular: 'بند فئة التقييم',
    subtitle: 'عناصر التقييم التفصيلية التابعة لكل فئة مشاركين.',
    categoryBadge: 'بنود التقييم',
    columns: [
      { header: 'رقم فئة مشارك التقييم', accessor: 'performance_evaluation_participant_category_id', badge: true },
      { header: 'رقم عنصر تقييم الأداء', accessor: 'performance_evaluation_item_id', badge: true },
    ],
    detailFields: [
      { label: 'معرف فئة مشارك التقييم', field: 'performance_evaluation_participant_category_id' },
      { label: 'معرف عنصر تقييم الأداء', field: 'performance_evaluation_item_id' },
    ],
  },

  // ─── Pattern F: Document Management ───
  {
    folder: 'documentations',
    typeName: 'Documentation',
    componentName: 'Documentation',
    hookName: 'useDocumentations',
    detailHook: 'useDocumentation',
    arabicName: 'الوثائق والمستندات',
    arabicSingular: 'وثيقة',
    subtitle: 'الأرشيف الإلكتروني للوثائق التدريبية والشهادات والمواد العلمية.',
    categoryBadge: 'الأرشيف والملفات',
    columns: [
      { header: 'اسم الوثيقة / الملف', accessor: 'name', bold: true },
      { header: 'مسار الملف', accessor: 'file_path', fileLink: true },
      { header: 'نوع الوثيقة', accessor: 'documentation_type_id', badge: true },
      { header: 'رقم الدورة', accessor: 'course_id', badge: true },
    ],
    detailFields: [
      { label: 'اسم الوثيقة', field: 'name' },
      { label: 'مسار الملف', field: 'file_path' },
      { label: 'معرف نوع الوثيقة', field: 'documentation_type_id' },
      { label: 'معرف الدورة التدريبية', field: 'course_id' },
      { label: 'معرف الجلسة التدريبية', field: 'course_session_id' },
      { label: 'معرف المادة التدريبية', field: 'learning_subject_id' },
    ],
  },
];

function generateList(entity) {
  const columnsDef = entity.columns.map(col => {
    let accessor;
    if (col.fileLink) {
      accessor = `(row: any) => row.${col.accessor} ? <span style={{ fontFamily: 'monospace', color: 'var(--color-primary)', fontSize: 'var(--font-size-xs)' }}>{row.${col.accessor}}</span> : '—'`;
    } else if (col.scoreBadge) {
      accessor = `(row: any) => row.${col.accessor} !== undefined ? <Badge variant="success">{row.${col.accessor}} درجة</Badge> : '—'`;
    } else if (col.badge) {
      accessor = `(row: any) => row.${col.accessor} !== undefined ? <Badge variant="neutral"># {row.${col.accessor}}</Badge> : '—'`;
    } else if (col.bold) {
      accessor = `(row: any) => <span style={{ fontWeight: 600 }}>{row.${col.accessor} || '—'}</span>`;
    } else {
      accessor = `(row: any) => row.${col.accessor} || '—'`;
    }
    return `    { header: '${col.header}', accessor: ${accessor} }`;
  }).join(',\n');

  return `import { useNavigate } from 'react-router-dom';
import { ${entity.hookName} } from '../api/useListQuery';
import { Card } from '../../../shared/components/Card';
import { Table } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { PageHeader } from '../../../shared/components/PageHeader';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Search, ClipboardList } from 'lucide-react';
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
          { label: '${entity.categoryBadge}' },
          { label: '${entity.arabicName}' },
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
          onRowClick={(row) => navigate('/${entity.folder}/' + row.id)}
          compact
          emptyTitle="لا توجد بيانات مسجلة"
          emptyIcon={<ClipboardList size={28} />}
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
        title={data?.name || '${entity.arabicSingular} #' + id}
        subtitle="سجل تفاصيل ومتابعة ${entity.arabicSingular}"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: '${entity.categoryBadge}' },
          { label: '${entity.arabicName}', href: '/${entity.folder}' },
          { label: data?.name || '#' + id },
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

console.log(`\n🎉 Pattern E & F complete: ${generated} files regenerated for ${entities.length} entities`);
