export interface Job {
  id?: number;
  code?: string | null;
  name?: string | null;
  client_id?: number;
  [key: string]: any;
}
