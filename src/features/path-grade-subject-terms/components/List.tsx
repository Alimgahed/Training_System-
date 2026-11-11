import { Link } from 'react-router-dom';
import { TrainingDirectory } from '../../../shared/components/TrainingDirectory';
import { usePathGradeSubjectTerms } from '../api/useListQuery';

export function PathGradeSubjectTermList() {
  const query = usePathGradeSubjectTerms();
  return <TrainingDirectory title="مواد الترم" description="توزيع مواد المسارات على الفصول التدريبية ومراجعة ملاحظاتها." resource="path-grade-subject-terms" data={query.data} isLoading={query.isLoading} isError={query.isError} retry={query.refetch} columns={[{header:'الكود',accessor:row=>row.code??'—'},{header:'المسار التدريبي',accessor:row=>row.path_grade_subject?.path_grade?.learning_path?.name||'—'},{header:'الدرجة الوظيفية',accessor:row=>row.path_grade_subject?.path_grade?.grade?.name||'—'},{header:'المادة التدريبية',accessor:row=>row.path_grade_subject?.learning_subject?.name||row.path_grade_subject?.name||'—'},{header:'الترم',accessor:row=>row.term?.name||row.term_id||'—'},{header:'ملاحظات',accessor:row=>row.notes||'—'}]} links={ <><Link to="/path-grade-subjects">مواد درجة المسار</Link><Link to="/learning-terms">الفصول التدريبية</Link></> } />;
}
