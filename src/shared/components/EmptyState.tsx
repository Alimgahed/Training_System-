import { FileX } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, actionLabel, onAction, actionHref }) => {
  const actionButton = actionLabel && (
    actionHref ? (
      <Link to={actionHref}>
        <Button>{actionLabel}</Button>
      </Link>
    ) : onAction ? (
      <Button onClick={onAction}>{actionLabel}</Button>
    ) : null
  );

  return (
    <div className="ui-empty-state">
      <div className="ui-empty-state__icon" aria-hidden="true">
        {icon || <FileX size={28} />}
      </div>
      <h3>{title}</h3>
      {description && (
        <p className="ui-empty-state__description">
          {description}
        </p>
      )}
      {actionButton && <div className="ui-empty-state__action">{actionButton}</div>}
    </div>
  );
};
