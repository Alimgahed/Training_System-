export interface PathGradeCandidate {
  id?: number;
  person_id?: number;
  person?: { id?: number; name?: string; code?: string };
  path_grade_id?: number;
  path_grade?: { id?: number; learning_path?: { name?: string }; grade?: { name?: string } };
  term_id?: number;
  term?: { id?: number; name?: string };
  final_evaluation_id?: number;
  final_evaluation?: { id?: number; name?: string };
  client_id?: number;
}

export type PathGradeCandidateRequest = Required<Pick<PathGradeCandidate, 'person_id' | 'path_grade_id' | 'term_id' | 'final_evaluation_id'>>;
