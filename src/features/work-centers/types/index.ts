export interface WorkCenter {
  id?: number;
  name?: string | null;
  governorate_id?: number;
  organization_id?: number;
  client_id?: number;
  [key: string]: any;
}
