export interface TrainerSubject {
  id: number;
  name?: string;
  code?: string | number | null;
  client_id?: number;
  [key: string]: any;
}
