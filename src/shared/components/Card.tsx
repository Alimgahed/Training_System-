import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, action, className }) => {
  return (
    <section className={['ui-card', className].filter(Boolean).join(' ')}>
      {(title || action) && (
        <header className="ui-card__header">
          {title && <h2>{title}</h2>}
          {action && <div className="ui-card__action">{action}</div>}
        </header>
      )}
      <div className="ui-card__body">
        {children}
      </div>
    </section>
  );
};
