import { Link } from 'react-router-dom';
import { TrainingDirectory } from '../../../shared/components/TrainingDirectory';
import { usePathGradeSubjects } from '../api/useListQuery';

export function PathGradeSubjectList() {
  const query = usePathGradeSubjects();
  return <TrainingDirectory title="مواد درجة المسار" description="تنظيم المواد التدريبية وربطها بمراحل المسار والمواضيع العامة." resource="path-grade-subjects" data={query.data} isLoading={query.isLoading} isError={query.isError} retry={query.refetch} columns={[{header:'الكود',accessor:row=>row.code??'—'},{header:'اسم المادة',accessor:row=>row.name||row.learning_subject?.name||'—'},{header:'مرحلة المسار',accessor:row=>row.path_grade?.learning_path?.name||row.path_grade_id||'—'},{header:'الموضوع التدريبي',accessor:row=>row.learning_subject?.name||row.learning_subject_id||'—'}]} links={ <><Link to="/path-grades">درجات ومراحل المسار</Link><Link to="/path-grade-subject-terms">مواد الترم</Link></> } />;
}
