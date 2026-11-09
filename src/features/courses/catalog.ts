import type { Course } from './types';

export interface CatalogFilters { query: string; status: string; subject: string; sort: string; }

export function filterCourses(courses: readonly Course[], { query, status, subject, sort }: CatalogFilters): Course[] {
  return courses.filter(course => {
    const matchesQuery = `${course.name ?? ''} ${course.id ?? ''} ${course.trainer_id ?? ''}`.toLocaleLowerCase('ar').includes(query.trim().toLocaleLowerCase('ar'));
    const matchesStatus = status === 'all' || (status === 'planned' ? course.is_planned && !course.is_executed : status === 'executed' ? course.is_executed : !course.is_planned && !course.is_executed);
    return matchesQuery && matchesStatus && (subject === 'all' || String(course.learning_subject_id) === subject);
  }).sort((a, b) => sort === 'name' ? (a.name ?? '').localeCompare(b.name ?? '', 'ar') : sort === 'date' ? (a.starting_date || '9999').localeCompare(b.starting_date || '9999') : (b.id ?? 0) - (a.id ?? 0));
}
