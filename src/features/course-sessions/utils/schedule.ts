import type { CourseSession } from '../types';
/** API calendar dates retain their written day, independent of the browser timezone. */
export function sessionDay(value?: string): string | null {
  const key=value?.slice(0,10);
  if(!key||!/^\d{4}-\d{2}-\d{2}$/.test(key))return null;
  const date=new Date(`${key}T12:00:00Z`);
  return !Number.isNaN(date.getTime())&&date.toISOString().slice(0,10)===key?key:null;
}
const dateFormatter=new Intl.DateTimeFormat('ar-EG',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
export function sessionDate(value?:string) { const key=sessionDay(value);return key?dateFormatter.format(new Date(`${key}T12:00:00Z`)):'تاريخ غير محدد'; }
export function localToday(now=new Date()) { return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; }
export function sessionSummary(sessions:CourseSession[],today:string) { return {total:sessions.length,today:sessions.filter(s=>sessionDay(s.session_date)===today).length,upcoming:sessions.filter(s=>{const date=sessionDay(s.session_date);return date!==null&&date>today;}).length}; }
export function sessionTime(value?:string) { return value&&/^\d{2}:\d{2}(:\d{2})?$/.test(value)?value.slice(0,5):'—'; }
