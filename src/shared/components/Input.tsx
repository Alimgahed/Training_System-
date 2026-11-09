import React,{ forwardRef,useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const descriptionId = error || helperText ? `${inputId}-description` : undefined;
    return (
      <div className="ui-field">
        {label && <label className="ui-field__label" htmlFor={inputId}>{label}</label>}
        <input
          ref={ref}
          id={inputId}
          className={['ui-input', error ? 'is-invalid' : '', className].filter(Boolean).join(' ')}
          aria-invalid={Boolean(error)}
          aria-describedby={descriptionId}
          {...props}
        />
        {error && <span id={descriptionId} className="ui-field__error" role="alert">{error}</span>}
        {!error && helperText && <span id={descriptionId} className="ui-field__help">{helperText}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
