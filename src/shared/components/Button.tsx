import React,{ forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', isLoading, disabled, className, style, ...props }, ref) => {
    const classes = ['ui-button', `ui-button--${variant}`, `ui-button--${size}`, className].filter(Boolean).join(' ');
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={classes}
        style={style}
        {...props}
      >
        {isLoading ? (
          <span className="ui-button__spinner" aria-hidden="true" />
        ) : null}
        {children}
      </button>
    );
  }
);
