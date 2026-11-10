import type { Course } from '../../features/courses/types';
import type { Person } from '../../features/persons/types';
import type { CourseSession } from '../../features/course-sessions/types';

const dateFormatter = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' });
const timeFormatter = new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit' });
export const dayKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export function dateLabel(value?: string) {
  if (!value) return 'موعد غير محدد';
  const date = new Date(`${value.slice(0, 10)}T12:00:00`);
  return Number.isNaN(date.getTime()) ? 'موعد غير محدد' : dateFormatter.format(date);
}
export function timeLabel(value?: string) {
  if (!value) return 'وقت غير محدد';
  const date = new Date(`2000-01-01T${value}`);
  return Number.isNaN(date.getTime()) ? 'وقت غير محدد' : timeFormatter.format(date);
}
export function dashboardSummary(persons: Person[], courses: Course[], planned: Course[], sessions: CourseSession[], today: string) {
  return {
    coursesById: new Map(courses.map(course => [Number(course.id), course])),
    todaysSessions: sessions.filter(session => String(session.session_date || '').slice(0, 10) === today)
      .sort((a, b) => String(a.start_time || '99').localeCompare(String(b.start_time || '99'))),
    upcomingCourses: planned.filter(course => !course.is_executed && (!course.starting_date || course.starting_date.slice(0, 10) >= today))
      .sort((a, b) => (a.starting_date || '9999').localeCompare(b.starting_date || '9999')).slice(0, 5),
    latestCourses: [...courses].sort((a, b) => Number(b.id || 0) - Number(a.id || 0)).slice(0, 6),
    latestPersons: [...persons].sort((a, b) => Number(b.id || 0) - Number(a.id || 0)).slice(0, 6),
    activePersons: persons.filter(person => person.is_active).length,
    trainers: persons.filter(person => person.is_trainer).length,
  };
}
