export interface Qualification {
  id?: number;
  code?: string | null;
  name?: string | null;
  qualification_type_id?: number;
  client_id?: number;
  [key: string]: any;
}
