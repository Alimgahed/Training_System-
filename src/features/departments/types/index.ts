export interface Department {
  id?: number;
  code?: string | null;
  name?: string | null;
  organization_id?: number;
  client_id?: number;
  [key: string]: any;
}
