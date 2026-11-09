import React,{ forwardRef,useId } from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
  isLoading?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, isLoading, id, className, disabled, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = error ? `${selectId}-error` : undefined;
    return (
      <div className="ui-field">
        {label && <label className="ui-field__label" htmlFor={selectId}>{label}</label>}
        <select
          ref={ref}
          id={selectId}
          className={['ui-select', error ? 'is-invalid' : '', className].filter(Boolean).join(' ')}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          disabled={isLoading || disabled}
          {...props}
        >
          <option value="">{isLoading ? 'جاري التحميل...' : '-- اختر من القائمة --'}</option>
          {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        {error && <span id={errorId} className="ui-field__error" role="alert">{error}</span>}
      </div>
    );
  },
);

Select.displayName = 'Select';
