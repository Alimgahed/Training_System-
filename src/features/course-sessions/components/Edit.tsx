import { useParams } from 'react-router-dom';
import { SessionForm } from './SessionForm';
export function CourseSessionEdit() {
  const { id = '' } = useParams();
  return <SessionForm id={id}/>;
}
