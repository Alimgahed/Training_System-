export interface WorkSite {
  id?: number;
  code?: string | null;
  name?: string | null;
  work_center_id?: number;
  client_id?: number;
  [key: string]: any;
}
