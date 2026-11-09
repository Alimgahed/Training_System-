export interface PerformanceEvaluationItem {
  id?: number;
  name?: string | null;
  minimum_score?: number;
  maximum_score?: number;
  client_id?: number;
  [key: string]: any;
}
