import { Link } from 'react-router-dom';
import { TrainingDirectory } from '../../../shared/components/TrainingDirectory';
import { useLearningPaths } from '../api/useListQuery';

export function LearningPathList() {
  const query = useLearningPaths();
  return <TrainingDirectory title="المسارات التدريبية" description="إدارة المسارات التدريبية ومؤهلاتها، والانتقال إلى مراحل المسار ومواده." resource="learning-paths" data={query.data} isLoading={query.isLoading} isError={query.isError} retry={query.refetch} columns={[{header:'كود المسار',accessor:row=>row.code??'—'},{header:'اسم المسار',accessor:row=>row.name||'—'},{header:'نوع المؤهل',accessor:row=>row.qualification_type?.name||row.qualification_type_id||'—'}]} links={ <><Link to="/path-grades">درجات ومراحل المسار</Link><Link to="/path-grade-subjects">مواد درجة المسار</Link></> } />;
}
