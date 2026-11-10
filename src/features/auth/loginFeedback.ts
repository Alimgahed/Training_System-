/** Keep transport failures distinct from credential rejection without exposing server details. */
export function loginErrorMessage(error: unknown): string {
  const failure = error as { response?: { status?: number }; code?: string } | null;
  if (failure?.response?.status === 401 || failure?.response?.status === 403) {
    return 'تعذر تسجيل الدخول. تحقق من اسم المستخدم وكلمة المرور ثم أعد المحاولة.';
  }
  if (failure?.response?.status === 429) return 'محاولات كثيرة خلال وقت قصير. انتظر قليلاً ثم أعد المحاولة.';
  if (failure?.code === 'ECONNABORTED' || !failure?.response) {
    return 'تعذر الاتصال بالخادم. تحقق من اتصال الشبكة ثم أعد المحاولة.';
  }
  return 'خدمة تسجيل الدخول غير متاحة حالياً. أعد المحاولة بعد قليل.';
}
