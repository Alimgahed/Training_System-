import { TrainingDirectory } from '../../../shared/components/TrainingDirectory';
import { useLearningSubjects } from '../api/useListQuery';

export function LearningSubjectList() {
  const query = useLearningSubjects();
  return <TrainingDirectory title="المواضيع التدريبية" description="المواضيع والمواد المتاحة للاستخدام في الدورات والمسارات." resource="learning-subjects" data={query.data} isLoading={query.isLoading} isError={query.isError} retry={query.refetch} columns={[{header:'اسم الموضوع التدريبي',accessor:row=>row.name||'—'}]} />;
}
