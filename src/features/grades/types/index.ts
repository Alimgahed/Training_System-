export interface Grade {
  id?: number;
  code?: string | number | null;
  name?: string | null;
  grade_interval?: string | number | null;
  client_id?: number;
  [key: string]: any;
}
