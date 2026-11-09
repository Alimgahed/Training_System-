/** Editorial artwork illustrates a subject; it is never a claim about a course's venue or staff. */
export function trainingVisual(subject = ''): string {
  if (/حاسب|رقمي|برمج|بيانات|computer|digital|excel|software/i.test(subject)) return 'digital';
  if (/قياد|إدار|ادار|management|leadership/i.test(subject)) return 'leadership';
  if (/فريق|تعاون|team|collaborat/i.test(subject)) return 'teamwork';
  if (/شهاد|اعتماد|certific/i.test(subject)) return 'certification';
  if (/عن بعد|إلكترون|الكترون|online|e-learning/i.test(subject)) return 'online';
  if (/تشغيل|صيان|مياه|فني|تقني|سلام|pump|technical|water/i.test(subject)) return 'technical';
  return 'workshop';
}

export function moduleVisual(pathname: string): string {
  if (/performance|evaluation|exam|documentation/.test(pathname)) return 'certification';
  if (/person|participant|user|trainer/.test(pathname)) return 'teamwork';
  if (/organization|department|work-|job|grade/.test(pathname)) return 'leadership';
  if (/session|room|term/.test(pathname)) return 'workshop';
  if (/course|learning|path-/.test(pathname)) return 'technical';
  return 'digital';
}
