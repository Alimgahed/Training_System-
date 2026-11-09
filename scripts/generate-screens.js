import fs from 'fs';
import path from 'path';

const features = [
  { name: 'organization-types', singular: 'organization-type', typeName: 'OrganizationType' },
  { name: 'organizations', singular: 'organization', typeName: 'Organization' },
  { name: 'countries', singular: 'country', typeName: 'Country' },
  { name: 'clients', singular: 'client', typeName: 'Client' },
  { name: 'governorates', singular: 'governorate', typeName: 'Governorate' },
  { name: 'job-type-groups', singular: 'job-type-group', typeName: 'JobTypeGroup' },
  { name: 'work-centers', singular: 'work-center', typeName: 'WorkCenter' },
  { name: 'work-sites', singular: 'work-site', typeName: 'WorkSite' },
  { name: 'work-groups', singular: 'work-group', typeName: 'WorkGroup' },
  { name: 'qualification-types', singular: 'qualification-type', typeName: 'QualificationType' },
  { name: 'qualifications', singular: 'qualification', typeName: 'Qualification' },
  { name: 'jobs', singular: 'job', typeName: 'Job' },
  { name: 'grades', singular: 'grade', typeName: 'Grade' },
  { name: 'learning-paths', singular: 'learning-path', typeName: 'LearningPath' },
  { name: 'learning-subjects', singular: 'learning-subject', typeName: 'LearningSubject' },
  { name: 'path-grade-subjects', singular: 'path-grade-subject', typeName: 'PathGradeSubject' },
  { name: 'path-grade-subject-terms', singular: 'path-grade-subject-term', typeName: 'PathGradeSubjectTerm' },
  { name: 'persons', singular: 'person', typeName: 'Person' },
  { name: 'departments', singular: 'department', typeName: 'Department' },
  { name: 'trainer-subjects', singular: 'trainer-subject', typeName: 'TrainerSubject' },
  { name: 'learning-terms', singular: 'learning-term', typeName: 'LearningTerm' },
  { name: 'rooms', singular: 'room', typeName: 'Room' },
  { name: 'courses', singular: 'course', typeName: 'Course' },
  { name: 'course-sessions', singular: 'course-session', typeName: 'CourseSession' },
  { name: 'documentation-types', singular: 'documentation-type', typeName: 'DocumentationType' },
  { name: 'documentations', singular: 'documentation', typeName: 'Documentation' },
  { name: 'evaluation-types', singular: 'evaluation-type', typeName: 'EvaluationType' },
  { name: 'course-participants', singular: 'course-participant', typeName: 'CourseParticipant' },
  { name: 'course-session-participants', singular: 'course-session-participant', typeName: 'CourseSessionParticipant' },
  { name: 'course-participant-final-exams', singular: 'course-participant-final-exam', typeName: 'CourseParticipantFinalExam' },
  { name: 'performance-evaluation-categories', singular: 'performance-evaluation-category', typeName: 'PerformanceEvaluationCategory' },
  { name: 'performance-evaluation-items', singular: 'performance-evaluation-item', typeName: 'PerformanceEvaluationItem' },
  { name: 'participant-types', singular: 'participant-type', typeName: 'ParticipantType' },
  { name: 'path-grades', singular: 'path-grade', typeName: 'PathGrade' },
  { name: 'performance-evaluation-participant-categories', singular: 'performance-evaluation-participant-category', typeName: 'PerformanceEvaluationParticipantCategory' },
  { name: 'performance-evaluation-participant-category-items', singular: 'performance-evaluation-participant-category-item', typeName: 'PerformanceEvaluationParticipantCategoryItem' }
];

const basePath = path.join(process.cwd(), 'src', 'features');
let routerImports = "import { createBrowserRouter } from 'react-router-dom';\n";
let routerRoutes = "";
let dashboardLinks = "";

features.forEach((feature) => {
  const featurePath = path.join(basePath, feature.name);
  const componentsPath = path.join(featurePath, 'components');

  fs.mkdirSync(componentsPath, { recursive: true });

  const listComponentContent = `import { Link } from 'react-router-dom';
import { use${feature.typeName}s } from '../api/useListQuery';
import { Button } from '../../../shared/components/Button';

export function ${feature.typeName}List() {
  const { data, isLoading, isError, error, refetch } = use${feature.typeName}s();

  if (isLoading) return <div style={{ padding: '20px' }}>جاري التحميل...</div>;
  if (isError) return (
    <div style={{ padding: '20px', color: 'red' }}>
      <p>حدث خطأ: {(error as Error)?.message}</p>
      <Button variant="danger" onClick={() => refetch()}>إعادة المحاولة</Button>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>قائمة ${feature.typeName}s</h2>
        <Link to="/"><Button>العودة للرئيسية</Button></Link>
      </div>
      
      {data?.length === 0 ? (
        <p>لا توجد بيانات.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'right' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الاسم / الكود</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name || item.code || '-'}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <Link to={'/${feature.name}/' + item.id}>
                    <Button variant="primary">التفاصيل</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
`;
  fs.writeFileSync(path.join(componentsPath, 'List.tsx'), listComponentContent);

  const detailComponentContent = `import { useParams, Link } from 'react-router-dom';
import { use${feature.typeName} } from '../api/useGetQuery';
import { Button } from '../../../shared/components/Button';

export function ${feature.typeName}Detail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error, refetch } = use${feature.typeName}(id || '');

  if (isLoading) return <div style={{ padding: '20px' }}>جاري التحميل...</div>;
  if (isError) return (
    <div style={{ padding: '20px', color: 'red' }}>
      <p>حدث خطأ: {(error as Error)?.message}</p>
      <Button variant="danger" onClick={() => refetch()}>إعادة المحاولة</Button>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>تفاصيل ${feature.typeName} (ID: {id})</h2>
        <Link to="/${feature.name}"><Button>العودة للقائمة</Button></Link>
      </div>

      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <pre dir="ltr" style={{ textAlign: 'left', overflowX: 'auto', margin: 0 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(componentsPath, 'Detail.tsx'), detailComponentContent);

  // Appending to Router config
  routerImports += `import { ${feature.typeName}List } from '../features/${feature.name}/components/List';\n`;
  routerImports += `import { ${feature.typeName}Detail } from '../features/${feature.name}/components/Detail';\n`;
  routerRoutes += `  { path: '/${feature.name}', element: <${feature.typeName}List /> },\n`;
  routerRoutes += `  { path: '/${feature.name}/:id', element: <${feature.typeName}Detail /> },\n`;
  
  // Appending to Dashboard
  dashboardLinks += `        <Link to="/${feature.name}" style={{ padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px', textDecoration: 'none', color: '#1a365d', fontWeight: 'bold', border: '1px solid #cbd5e1' }}>إدارة ${feature.typeName}s</Link>\n`;

  console.log("Generated UI for " + feature.name);
});

// Write Dashboard.tsx
const dashboardContent = `import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>لوحة التحكم الرئيسية (ERP Modules)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
${dashboardLinks}
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(process.cwd(), 'src', 'app', 'Dashboard.tsx'), dashboardContent);

// Write router.tsx
const routerContent = `${routerImports}
import { Dashboard } from './Dashboard';

export const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
${routerRoutes}
]);
`;
fs.writeFileSync(path.join(process.cwd(), 'src', 'app', 'router.tsx'), routerContent);

console.log("Router, Dashboard, and all screens generated successfully!");
