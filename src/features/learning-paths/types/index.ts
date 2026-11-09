export interface LearningPath {
  id?: number;
  code?: string | number | null;
  name?: string | null;
  qualification_type_id?: number;
  qualification_type?: { id?: number; name?: string | null; client_id?: number } | null;
  client_id?: number;
  [key: string]: any;
}
