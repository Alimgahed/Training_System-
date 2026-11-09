import { AlertTriangle,RefreshCw } from 'lucide-react';
import React from 'react';
import { Button } from './Button';

interface ErrorStateProps {
  error?: Error;
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'حدث خطأ غير متوقع',
  message = 'لم نتمكن من تحميل البيانات المطلوبة. يرجى المحاولة مرة أخرى.',
  onRetry,
}) => {
  return (
    <section className="ui-error-state" role="alert">
      <div className="ui-error-state__icon" aria-hidden="true">
        <AlertTriangle size={27} />
      </div>
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw size={16} />
          إعادة المحاولة
        </Button>
      )}
    </section>
  );
};
