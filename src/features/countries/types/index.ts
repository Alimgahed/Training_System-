export interface Country {
  id?: number;
  name?: string | null;
  client_id?: number;
  governorates?: any[];
  [key: string]: any;
}
