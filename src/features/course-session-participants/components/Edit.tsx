import { useParams } from 'react-router-dom';
import { AttendanceForm } from './AttendanceForm';
export function CourseSessionParticipantEdit() {
  const { id = '' } = useParams();
  return <AttendanceForm id={id}/>;
}
