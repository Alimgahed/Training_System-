export interface EvaluationType {
  id?: number;
  name?: string | null;
  should_repeat?: boolean | null;
  client_id?: number;
  [key: string]: any;
}
