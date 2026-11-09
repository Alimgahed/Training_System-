/**
 * Enterprise UI/UX Transformation — Phase 5C
 * Redesign Hierarchical Learning Structure (Pattern C)
 * 
 * Hierarchy:
 * LearningPath → PathGrade → PathGradeSubject → PathGradeSubjectTerm
 * UX: Curriculum explorer style with level indicator badges and child links
 */

const fs = require('fs');
const path = require('path');

const entities = [
  {
    folder: 'learning-paths',
    typeName: 'LearningPath',
    componentName: 'LearningPath',
    hookName: 'useLearningPaths',
    detailHook: 'useLearningPath',
    arabicName: 'المسارات التدريبية',
    arabicSingular: 'مسار تدريبي',
    subtitle: 'المسارات المهنية والتدريبية التخصصية للعاملين.',
    hierarchyLevel: 'المستوى الأول: المسار الرئيسي',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'اسم المسار التدريبي', accessor: 'name', bold: true },
      { header: 'نوع المؤهل', accessor: 'qualification_type_id', badge: true },
    ],
    detailFields: [
      { label: 'كود المسار', field: 'code' },
      { label: 'اسم المسار التدريبي', field: 'name' },
      { label: 'معرف نوع المؤهل', field: 'qualification_type_id' },
    ],
    childLink: {
      folder: 'path-grades',
      label: 'عرض مراحل ودرجات المسار (Path Grades)',
    }
  },
  {
    folder: 'path-grades',
    typeName: 'PathGrade',
    componentName: 'PathGrade',
    hookName: 'usePathGrades',
    detailHook: 'usePathGrade',
    arabicName: 'درجات ومراحل المسارات',
    arabicSingular: 'مرحلة مسار',
    subtitle: 'ربط المسار التدريبي بالدرجات الوظيفية المحددة.',
    hierarchyLevel: 'المستوى الثاني: مرحلة المسار بالدرجة',
    columns: [
      { header: 'رقم المسار التدريبي', accessor: 'learning_path_id', badge: true },
      { header: 'رقم الدرجة الوظيفية', accessor: 'grade_id', badge: true },
    ],
    detailFields: [
      { label: 'معرف المسار التدريبي', field: 'learning_path_id' },
      { label: 'معرف الدرجة الوظيفية', field: 'grade_id' },
    ],
    nestedArrays: [
      {
        key: 'path_grade_subjects',
        label: 'المواد التدريبية المقررة لهذه الدرجة',
        columns: [
          { header: 'الكود', accessor: 'code' },
          { header: 'اسم المادة', accessor: 'name' },
          { header: 'معرف المادة العامة', accessor: 'learning_subject_id' },
        ]
      }
    ],
    childLink: {
      folder: 'path-grade-subjects',
      label: 'عرض مواد مراحل المسار (Path Grade Subjects)',
    }
  },
  {
    folder: 'path-grade-subjects',
    typeName: 'PathGradeSubject',
    componentName: 'PathGradeSubject',
    hookName: 'usePathGradeSubjects',
    detailHook: 'usePathGradeSubject',
    arabicName: 'مواد مراحل المسارات',
    arabicSingular: 'مادة مسار',
    subtitle: 'المناهج والمواد المخصصة لكل مرحلة بالمسار التدريبي.',
    hierarchyLevel: 'المستوى الثالث: المادة التدريبية',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'اسم المادة', accessor: 'name', bold: true },
      { header: 'رقم مرحلة المسار', accessor: 'path_grade_id', badge: true },
      { header: 'المادة العامة', accessor: 'learning_subject_id' },
    ],
    detailFields: [
      { label: 'كود المادة', field: 'code' },
      { label: 'اسم المادة التدريبية', field: 'name' },
      { label: 'معرف مرحلة المسار', field: 'path_grade_id' },
      { label: 'معرف المادة التدريبية العامة', field: 'learning_subject_id' },
    ],
    childLink: {
      folder: 'path-grade-subject-terms',
      label: 'عرض فصول المواد (Subject Terms)',
    }
  },
  {
    folder: 'path-grade-subject-terms',
    typeName: 'PathGradeSubjectTerm',
    componentName: 'PathGradeSubjectTerm',
    hookName: 'usePathGradeSubjectTerms',
    detailHook: 'usePathGradeSubjectTerm',
    arabicName: 'مواد الفصول التدريبية',
    arabicSingular: 'مادة فصل',
    subtitle: 'توزيع المواد التدريبية على الفصول (الترمات) المحددة.',
    hierarchyLevel: 'المستوى الرابع: ترم المادة',
    columns: [
      { header: 'الكود', accessor: 'code', mono: true },
      { header: 'رقم مادة مرحلة المسار', accessor: 'path_grade_subjects_id', badge: true },
      { header: 'رقم الترم', accessor: 'term_id', badge: true },
      { header: 'ملاحظات', accessor: 'notes' },
    ],
    detailFields: [
      { label: 'الكود', field: 'code' },
      { label: 'معرف مادة مرحلة المسار', field: 'path_grade_subjects_id' },
      { label: 'معرف الفصل التدريبي (الترم)', field: 'term_id' },
      { label: 'ملاحظات', field: 'notes' },
    ],
  },
];

function generateList(entity) {
  const columnsDef = entity.columns.map(col => {
    let accessor;
    if (col.badge) {
      accessor = `(row: any) => row.${col.accessor} ? <Badge variant="info"># {row.${col.accessor}}</Badge> : '—'`;
    } else if (col.bold) {
      accessor = `(row: any) => <span style={{ fontWeight: 600 }}>{row.${col.accessor} || '—'}</span>`;
    } else if (col.mono) {
      accessor = `(row: any) => <span style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{row.${col.accessor} || '—'}</span>`;
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
import { Search, GraduationCap, ArrowLeft } from 'lucide-react';
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
          { label: 'الهيكل الأكاديمي' },
          { label: '${entity.arabicName}' },
        ]}
        badge={<Badge variant="neutral">${entity.hierarchyLevel}</Badge>}
        actions={
          ${entity.childLink ? `<Link to="/${entity.childLink.folder}">
            <Button variant="outline" size="sm">${entity.childLink.label} <ArrowLeft size={16} /></Button>
          </Link>` : 'undefined'}
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
          onRowClick={(row) => navigate('/${entity.folder}/' + row.id)}
          compact
          emptyTitle="لا توجد بيانات مسجلة"
          emptyIcon={<GraduationCap size={28} />}
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
import { Badge } from '../../../shared/components/Badge';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';
import { ErrorState } from '../../../shared/components/ErrorState';
import { Button } from '../../../shared/components/Button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
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
          { label: 'الهيكل الأكاديمي' },
          { label: '${entity.arabicName}', href: '/${entity.folder}' },
          { label: data?.name || '#' + id },
        ]}
        badge={<Badge variant="neutral">${entity.hierarchyLevel}</Badge>}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            ${entity.childLink ? `<Link to="/${entity.childLink.folder}">
              <Button size="sm">${entity.childLink.label} <ArrowLeft size={16} /></Button>
            </Link>` : ''}
            <Link to="/${entity.folder}">
              <Button variant="outline" size="sm"><ArrowRight size={16} /> العودة للقائمة</Button>
            </Link>
          </div>
        }
      />

      <Card title="بيانات المسار والمناهج">
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

console.log(`\n🎉 Pattern C complete: ${generated} files regenerated for ${entities.length} entities`);
