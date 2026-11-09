export interface JobTypeGroup {
  id?: number;
  code?: string | null;
  name?: string | null;
  work_group_id?: number;
  client_id?: number;
  [key: string]: any;
}
