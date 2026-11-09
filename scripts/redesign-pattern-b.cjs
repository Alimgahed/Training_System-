/**
 * Enterprise UI/UX Transformation — Phase 5B
 * Redesign Relational Reference Data List & Detail screens
 * 
 * Pattern B: Relational entities (code, name, foreign keys, nested collections)
 * UX: DataTable with structured layout, Detail with parent context & sub-tables
 */

const fs = require('fs');
const path = require('path');

const entities = [
  {
    folder: 'organization-types',
    typeName: 'OrganizationType',
    componentName: 'OrganizationType',
    hookName: 'useOrganizationTypes',
    detailHook: 'useOrganizationType',
    arabicName: 'أنواع الجهات',
    arabicSingular: 'نوع جهة',
    subtitle: 'التصنيفات المعتمدة للجهات والمؤسسات.',
    columns: [
      { header: 'الاسم', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الاسم', field: 'name' },
    ],
  },
  {
    folder: 'organizations',
    typeName: 'Organization',
    componentName: 'Organization',
    hookName: 'useOrganizations',
    detailHook: 'useOrganization',
    arabicName: 'الجهات والمؤسسات',
    arabicSingular: 'جهة',
    subtitle: 'الهيكل الرئيسي للجهات والشركات التابعة والشريكة.',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'الاسم', accessor: 'name', bold: true },
      { header: 'العنوان', accessor: 'address' },
      { header: 'نوع الجهة', accessor: 'organization_type_id', badge: true },
    ],
    detailFields: [
      { label: 'الكود', field: 'code' },
      { label: 'الاسم', field: 'name' },
      { label: 'العنوان', field: 'address' },
      { label: 'معرف نوع الجهة', field: 'organization_type_id' },
      { label: 'معرف المحافظة', field: 'governorate_id' },
    ],
    nestedArrays: [
      {
        key: 'departments',
        label: 'الإدارات التابعة',
        columns: [
          { header: 'الكود', accessor: 'code' },
          { header: 'اسم الإدارة', accessor: 'name' },
        ]
      },
      {
        key: 'work_centers',
        label: 'مراكز العمل التابعة',
        columns: [
          { header: 'اسم مركز العمل', accessor: 'name' },
        ]
      }
    ]
  },
  {
    folder: 'departments',
    typeName: 'Department',
    componentName: 'Department',
    hookName: 'useDepartments',
    detailHook: 'useDepartment',
    arabicName: 'الإدارات',
    arabicSingular: 'إدارة',
    subtitle: 'الإدارات والأقسام التابعة للجهات.',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'اسم الإدارة', accessor: 'name', bold: true },
      { header: 'رقم الجهة', accessor: 'organization_id', badge: true },
    ],
    detailFields: [
      { label: 'الكود', field: 'code' },
      { label: 'اسم الإدارة', field: 'name' },
      { label: 'معرف الجهة التابعة لها', field: 'organization_id' },
    ],
  },
  {
    folder: 'work-centers',
    typeName: 'WorkCenter',
    componentName: 'WorkCenter',
    hookName: 'useWorkCenters',
    detailHook: 'useWorkCenter',
    arabicName: 'مراكز العمل',
    arabicSingular: 'مركز عمل',
    subtitle: 'المراكز الرئيسية لتوزيع ومواقع العمل.',
    columns: [
      { header: 'اسم المركز', accessor: 'name', bold: true },
      { header: 'رقم المحافظة', accessor: 'governorate_id' },
      { header: 'رقم الجهة', accessor: 'organization_id', badge: true },
    ],
    detailFields: [
      { label: 'اسم مركز العمل', field: 'name' },
      { label: 'معرف المحافظة', field: 'governorate_id' },
      { label: 'معرف الجهة', field: 'organization_id' },
    ],
  },
  {
    folder: 'work-sites',
    typeName: 'WorkSite',
    componentName: 'WorkSite',
    hookName: 'useWorkSites',
    detailHook: 'useWorkSite',
    arabicName: 'مواقع العمل',
    arabicSingular: 'موقع عمل',
    subtitle: 'المحطات والمواقع التشغيلية والمكاتب الفرعية.',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'اسم الموقع', accessor: 'name', bold: true },
      { header: 'رقم مركز العمل', accessor: 'work_center_id', badge: true },
    ],
    detailFields: [
      { label: 'الكود', field: 'code' },
      { label: 'اسم موقع العمل', field: 'name' },
      { label: 'معرف مركز العمل', field: 'work_center_id' },
    ],
  },
  {
    folder: 'job-type-groups',
    typeName: 'JobTypeGroup',
    componentName: 'JobTypeGroup',
    hookName: 'useJobTypeGroups',
    detailHook: 'useJobTypeGroup',
    arabicName: 'المجموعات الوظيفية النوعية',
    arabicSingular: 'مجموعة وظيفية',
    subtitle: 'تصنيف المجموعات التخصصية والوظيفية للمهن.',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'اسم المجموعة', accessor: 'name', bold: true },
      { header: 'رقم مجموعة العمل', accessor: 'work_group_id', badge: true },
    ],
    detailFields: [
      { label: 'الكود', field: 'code' },
      { label: 'اسم المجموعة الوظيفية', field: 'name' },
      { label: 'معرف مجموعة العمل', field: 'work_group_id' },
    ],
  },
  {
    folder: 'qualifications',
    typeName: 'Qualification',
    componentName: 'Qualification',
    hookName: 'useQualifications',
    detailHook: 'useQualification',
    arabicName: 'المؤهلات العلمية',
    arabicSingular: 'مؤهل علمي',
    subtitle: 'المؤهلات الدراسية والشهادات المعتمدة.',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'المؤهل', accessor: 'name', bold: true },
      { header: 'نوع المؤهل', accessor: 'qualification_type_id', badge: true },
    ],
    detailFields: [
      { label: 'الكود', field: 'code' },
      { label: 'اسم المؤهل', field: 'name' },
      { label: 'معرف نوع المؤهل', field: 'qualification_type_id' },
    ],
  },
  {
    folder: 'rooms',
    typeName: 'TrainingRoom',
    componentName: 'Room',
    hookName: 'useRooms',
    detailHook: 'useRoom',
    arabicName: 'قاعات التدريب',
    arabicSingular: 'قاعة تدريب',
    subtitle: 'القاعات ومراكز التدريب والمختبرات المتاحة.',
    columns: [
      { header: 'اسم القاعة', accessor: 'name', bold: true },
      { header: 'رقم موقع العمل', accessor: 'work_site_id', badge: true },
    ],
    detailFields: [
      { label: 'اسم قاعة التدريب', field: 'name' },
      { label: 'معرف موقع العمل', field: 'work_site_id' },
    ],
  },
  {
    folder: 'trainer-subjects',
    typeName: 'TrainerSubject',
    componentName: 'TrainerSubject',
    hookName: 'useTrainerSubjects',
    detailHook: 'useTrainerSubject',
    arabicName: 'المواد التدريبية للمدربين',
    arabicSingular: 'مادة تدريبية',
    subtitle: 'تخصصات ومواد المدربين المعتمدين.',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'اسم المادة', accessor: 'name', bold: true },
    ],
    detailFields: [
      { label: 'الكود', field: 'code' },
      { label: 'اسم المادة التدريبية', field: 'name' },
    ],
  },
];

function generateList(entity) {
  const columnsDef = entity.columns.map(col => {
    let accessor;
    if (col.badge) {
      accessor = `(row) => row.${col.accessor} ? <Badge variant="neutral"># {row.${col.accessor}}</Badge> : '—'`;
    } else if (col.bold) {
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
import { Badge } from '../../../shared/components/Badge';
import { PageHeader } from '../../../shared/components/PageHeader';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Search, Building } from 'lucide-react';
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
          emptyTitle="لا توجد سجلات في ${entity.arabicName}"
          emptyIcon={<Building size={28} />}
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
      const cols = na.columns.map(c => `              { header: '${c.header}', accessor: (r: any) => r.${c.accessor} || '—' }`).join(',\n');
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

      <Card title="البيانات التنظيمية">
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

console.log(`\n🎉 Pattern B complete: ${generated} files regenerated for ${entities.length} entities`);
