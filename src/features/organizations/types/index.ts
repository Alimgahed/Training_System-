export interface Organization {
  id?: number;
  name?: string | null;
  code?: string | null;
  address?: string | null;
  organization_type_id?: number;
  governorate_id?: number;
  client_id?: number;
  work_centers?: any[];
  departments?: any[];
  [key: string]: any;
}
