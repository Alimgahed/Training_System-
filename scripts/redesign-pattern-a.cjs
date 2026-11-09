/**
 * Enterprise UI/UX Transformation — Phase 5A
 * Redesign Compact Reference Data List & Detail screens
 * 
 * Pattern A: Simple entities (1-3 fields), read-only, used as dropdown pickers
 * UX: Compact DataTable in Card, no create button, inline search
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════
// ENTITY DEFINITIONS
// ═══════════════════════════════════════════

const entities = [
  // Pattern A: Compact Reference Data
  {
    folder: 'countries',
    typeName: 'Country',
    hookName: 'useCountrys',
    detailHook: 'useCountry',
    arabicName: 'الدول',
    arabicSingular: 'دولة',
    subtitle: 'إدارة بيانات الدول المرجعية في النظام.',
    columns: [
      { header: 'الاسم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الاسم', field: 'name' },
    ],
    nestedArray: { key: 'governorates', label: 'المحافظات', columns: [{ header: 'الاسم', accessor: 'name' }] },
  },
  {
    folder: 'governorates',
    typeName: 'Governorate',
    hookName: 'useGovernorates',
    detailHook: 'useGovernorate',
    arabicName: 'المحافظات',
    arabicSingular: 'محافظة',
    subtitle: 'المحافظات المسجلة في النظام.',
    columns: [
      { header: 'الاسم', accessor: 'name', bold: true },
      { header: 'رقم الدولة', accessor: 'country_id' },
    ],
    detailFields: [
      { label: 'الاسم', field: 'name' },
      { label: 'رقم الدولة', field: 'country_id' },
    ],
  },
  {
    folder: 'clients',
    typeName: 'Client',
    hookName: 'useClients',
    detailHook: 'useClient',
    arabicName: 'العملاء',
    arabicSingular: 'عميل',
    subtitle: 'بيانات العملاء المسجلة في النظام.',
    columns: [
      { header: 'الاسم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الاسم', field: 'name' },
    ],
  },
  {
    folder: 'qualification-types',
    typeName: 'QualificationType',
    hookName: 'useQualificationTypes',
    detailHook: 'useQualificationType',
    arabicName: 'أنواع المؤهلات',
    arabicSingular: 'نوع مؤهل',
    subtitle: 'التصنيفات المرجعية لأنواع المؤهلات العلمية.',
    columns: [
      { header: 'الاسم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الاسم', field: 'name' },
    ],
  },
  {
    folder: 'evaluation-types',
    typeName: 'EvaluationType',
    hookName: 'useEvaluationTypes',
    detailHook: 'useEvaluationType',
    arabicName: 'أنواع التقييم',
    arabicSingular: 'نوع تقييم',
    subtitle: 'التصنيفات المرجعية لأنواع التقييم.',
    columns: [
      { header: 'الاسم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الاسم', field: 'name' },
    ],
  },
  {
    folder: 'participant-types',
    typeName: 'ParticipantType',
    hookName: 'useParticipantTypes',
    detailHook: 'useParticipantType',
    arabicName: 'أنواع المشاركين',
    arabicSingular: 'نوع مشارك',
    subtitle: 'التصنيفات المرجعية لأنواع المشاركين في التدريب.',
    columns: [
      { header: 'الاسم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الاسم', field: 'name' },
    ],
  },
  {
    folder: 'documentation-types',
    typeName: 'DocumentationType',
    hookName: 'useDocumentationTypes',
    detailHook: 'useDocumentationType',
    arabicName: 'أنواع الوثائق',
    arabicSingular: 'نوع وثيقة',
    subtitle: 'التصنيفات المرجعية لأنواع الوثائق والمستندات.',
    columns: [
      { header: 'الاسم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الاسم', field: 'name' },
    ],
  },
  {
    folder: 'learning-terms',
    typeName: 'LearningTerm',
    hookName: 'useLearningTerms',
    detailHook: 'useLearningTerm',
    arabicName: 'الفصول التدريبية',
    arabicSingular: 'فصل تدريبي',
    subtitle: 'الفصول والتراكيب الزمنية للبرامج التدريبية.',
    columns: [
      { header: 'الاسم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الاسم', field: 'name' },
    ],
  },
  {
    folder: 'learning-subjects',
    typeName: 'LearningSubject',
    hookName: 'useLearningSubjects',
    detailHook: 'useLearningSubject',
    arabicName: 'المواضيع التدريبية',
    arabicSingular: 'موضوع تدريبي',
    subtitle: 'المواضيع والمواد المتاحة للتدريب.',
    columns: [
      { header: 'الاسم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الاسم', field: 'name' },
    ],
  },
  {
    folder: 'work-groups',
    typeName: 'WorkGroup',
    hookName: 'useWorkGroups',
    detailHook: 'useWorkGroup',
    arabicName: 'مجموعات العمل',
    arabicSingular: 'مجموعة عمل',
    subtitle: 'مجموعات العمل التنظيمية.',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'الاسم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الكود', field: 'code' },
      { label: 'الاسم', field: 'name' },
    ],
  },
  {
    folder: 'jobs',
    typeName: 'Job',
    hookName: 'useJobs',
    detailHook: 'useJob',
    arabicName: 'الوظائف',
    arabicSingular: 'وظيفة',
    subtitle: 'قائمة المسميات الوظيفية المعتمدة.',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'الاسم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الكود', field: 'code' },
      { label: 'الاسم', field: 'name' },
    ],
  },
  {
    folder: 'grades',
    typeName: 'Grade',
    hookName: 'useGrades',
    detailHook: 'useGrade',
    arabicName: 'الدرجات الوظيفية',
    arabicSingular: 'درجة وظيفية',
    subtitle: 'الدرجات الوظيفية والمدد البينية.',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'الاسم', accessor: 'name', bold: true },
      { header: 'المدة البينية', accessor: 'grade_interval' },
    ],
    detailFields: [
      { label: 'الكود', field: 'code' },
      { label: 'الاسم', field: 'name' },
      { label: 'المدة البينية', field: 'grade_interval' },
    ],
  },
];

// ═══════════════════════════════════════════
// GENERATORS
// ═══════════════════════════════════════════

function generateList(entity) {
  const columnsDef = entity.columns.map(col => {
    let accessor;
    if (col.bold) {
      accessor = `(row) => <span style={{ fontWeight: 600 }}>{row.${col.accessor} || '—'}</span>`;
    } else if (col.mono) {
      accessor = `(row) => <span style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{row.${col.accessor} || '—'}</span>`;
    } else {
      accessor = `(row) => row.${col.accessor} || '—'`;
    }
    return `    { header: '${col.header}', accessor: ${accessor} }`;
  }).join(',\n');

  return `import { useNavigate } from 'react-router-dom';
import { ${entity.hookName} } from '../api/useListQuery';
import { Card } from '../../../shared/components/Card';
import { Table } from '../../../shared/components/Table';
import { PageHeader } from '../../../shared/components/PageHeader';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Search, Database } from 'lucide-react';
import { useState } from 'react';

export function ${entity.typeName}List() {
  const { data, isLoading, isError, refetch } = ${entity.hookName}();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const columns = [
${columnsDef},
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
        title="${entity.arabicName}"
        subtitle="${entity.subtitle}"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: '${entity.arabicName}' },
        ]}
      />

      <Card>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
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
          onRowClick={(row) => navigate('/${entity.folder}/' + row.id)}
          compact
          emptyTitle="لا توجد ${entity.arabicName}"
          emptyIcon={<Database size={28} />}
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

  let nestedSection = '';
  if (entity.nestedArray) {
    const na = entity.nestedArray;
    const nestedCols = na.columns.map(col => 
      `              { header: '${col.header}', accessor: '${col.accessor}' as keyof any }`
    ).join(',\n');
    nestedSection = `
      {data?.${na.key} && data.${na.key}.length > 0 && (
        <Card title="${na.label}">
          <Table
            data={data.${na.key}}
            columns={[
${nestedCols},
            ]}
            compact
          />
        </Card>
      )}`;
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

export function ${entity.typeName}Detail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = ${entity.detailHook}(id || '');

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title={data?.name || '${entity.arabicSingular}'}
        subtitle={'تفاصيل ${entity.arabicSingular} — معرّف #' + id}
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: '${entity.arabicName}', href: '/${entity.folder}' },
          { label: data?.name || '#' + id },
        ]}
        actions={
          <Link to="/${entity.folder}">
            <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
          </Link>
        }
      />

      <Card title="البيانات الأساسية">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-5)' }}>
          <InfoField label="المعرّف (ID)" value={data?.id} />
${fieldItems}
        </div>
      </Card>
${nestedSection}
    </div>
  );
}
`;
}

// ═══════════════════════════════════════════
// EXECUTE
// ═══════════════════════════════════════════

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

console.log(`\n🎉 Pattern A complete: ${generated} files regenerated for ${entities.length} entities`);
