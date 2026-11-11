import { Link } from 'react-router-dom';
import { TrainingDirectory } from '../../../shared/components/TrainingDirectory';
import { usePathGrades } from '../api/useListQuery';

export function PathGradeList() {
  const query = usePathGrades();
  return <TrainingDirectory title="درجات ومراحل المسارات" description="ربط كل مسار تدريبي بدرجاته الوظيفية ومراجعة المواد المقررة." resource="path-grades" data={query.data} isLoading={query.isLoading} isError={query.isError} retry={query.refetch} columns={[{header:'المسار التدريبي',accessor:row=>row.learning_path?.name||row.learning_path_id||'—'},{header:'الدرجة الوظيفية',accessor:row=>row.grade?.name||row.grade_id||'—'}]} links={ <><Link to="/learning-paths">المسارات التدريبية</Link><Link to="/path-grade-subjects">مواد درجة المسار</Link></> } />;
}
