import { apiClient } from '../../core/api/apiClient';

export type EvaluationRecordType = 'course' | 'course-participant';

export interface PerformanceEvaluationRequest {
  course_id?: number;
  course_participant_id?: number;
  performance_evaluation_participant_category_item_id: number;
  score: number;
  notes?: string;
}

export interface AvailableEvaluationItem {
  id: number;
  performance_evaluation_participant_category_id?: number;
  performance_evaluation_item_id?: number;
  performance_evaluation_item?: { id?: number; name?: string; minimum_score?: number; maximum_score?: number };
  minimum_score?: number;
  maximum_score?: number;
  name?: string;
}

export interface PerformanceEvaluationRecord {
  id: number;
  course_id?: number;
  course_participant_id?: number;
  score: number;
  notes?: string | null;
  entered_by?: number;
  entered_at?: string;
  performance_evaluation_participant_category_item_id?: number;
  performance_evaluation_participant_category_item?: AvailableEvaluationItem;
  course?: { id?: number; name?: string };
  course_participant?: { id?: number; course_id?: number; person?: { id?: number; name?: string } };
}

export interface AvailableEvaluationFilters {
  course_id: number;
  performance_evaluation_category_id: number;
}

export const getAvailableEvaluationItems = async (filters: AvailableEvaluationFilters): Promise<AvailableEvaluationItem[]> =>
  (await apiClient.get<AvailableEvaluationItem[]>('/available-performance-evaluation-items', { params: filters })).data;

export const getCourseEvaluationDetails = async (): Promise<PerformanceEvaluationRecord[]> =>
  (await apiClient.get<PerformanceEvaluationRecord[]>('/performance-evaluation-course-details')).data;

export const getCourseEvaluationDetail = async (id: number): Promise<PerformanceEvaluationRecord> =>
  (await apiClient.get<PerformanceEvaluationRecord>(`/performance-evaluation-course-detail/${id}`)).data;

export const getCourseParticipantEvaluationDetails = async (): Promise<PerformanceEvaluationRecord[]> =>
  (await apiClient.get<PerformanceEvaluationRecord[]>('/performance-evaluation-course-participant-details')).data;

export const getCourseParticipantEvaluationDetail = async (id: number): Promise<PerformanceEvaluationRecord> =>
  (await apiClient.get<PerformanceEvaluationRecord>(`/performance-evaluation-course-participant-detail/${id}`)).data;

export const createPerformanceEvaluation = async (payload: PerformanceEvaluationRequest): Promise<void> => {
  await apiClient.post('/new-performance-evaluation', payload);
};

export const updatePerformanceEvaluation = async (id: number, type: EvaluationRecordType, payload: PerformanceEvaluationRequest): Promise<void> => {
  await apiClient.put(`/performance-evaluation/${id}`, payload, { params: { type } });
};

export const deletePerformanceEvaluation = async (id: number, type: EvaluationRecordType): Promise<void> => {
  await apiClient.delete(`/performance-evaluation/${id}`, { params: { type } });
};
