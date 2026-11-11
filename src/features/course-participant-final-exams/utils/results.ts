import type { CourseParticipantFinalExam } from '../types';
export function examScore(value: unknown): number | null {
  if (value == null || String(value).trim() === '') return null;
  const score = Number(value);
  return Number.isFinite(score) ? score : null;
}
// A recorded score alone does not establish a backend grading policy.
export function examStatus(value: unknown) { const score = examScore(value); return score === null ? 'pending' : 'recorded'; }
const formatter = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' });
export function examDate(value?: string) { const date = value ? new Date(`${value.slice(0,10)}T12:00:00`) : null; return date && !Number.isNaN(date.getTime()) ? formatter.format(date) : 'غير محدد'; }
export function summarizeExams(exams: CourseParticipantFinalExam[]) {
  const scores = exams.map(exam => examScore(exam.exam_score)).filter((value): value is number => value !== null);
  return { total: exams.length, recorded: scores.length, pending: exams.length - scores.length, average: scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : null };
}
