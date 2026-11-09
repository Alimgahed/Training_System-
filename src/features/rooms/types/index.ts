export interface TrainingRoom {
  id?: number;
  name?: string | null;
  work_site_id?: number;
  client_id?: number;
  [key: string]: any;
}
export type Room = TrainingRoom;
