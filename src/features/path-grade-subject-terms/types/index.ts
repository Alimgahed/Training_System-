import type { Grade } from '../../grades/types';
import type { LearningPath } from '../../learning-paths/types';

export interface PathGradeSubjectTerm {
  id?: number;
  path_grade_subjects_id?: number;
  path_grade_subject?: {
    id?: number;
    name?: string | null;
    code?: string | number | null;
    path_grade_id?: number;
    path_grade?: {
      id?: number;
      learning_path_id?: number;
      learning_path?: LearningPath | null;
      grade_id?: number;
      grade?: Grade | null;
    } | null;
    learning_subject_id?: number;
    learning_subject?: { id?: number; name?: string | null } | null;
  } | null;
  term_id?: number;
  term?: { id?: number; name?: string | null } | null;
  code?: string | null;
  notes?: string | null;
  client_id?: number;
  client?: { id?: number; name?: string | null } | null;
  documentations?: unknown[] | null;
  [key: string]: any;
}
