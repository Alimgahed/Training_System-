import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs, actions, badge }) => {
  return (
    <header className="page-heading page-heading--module">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="page-heading__breadcrumbs" aria-label="مسار التنقل">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronLeft aria-hidden="true" size={14} />}
              {crumb.href ? (
                  <Link to={crumb.href}>
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="page-heading__main">
        <div className="page-heading__copy">
          <div className="page-heading__title-row"><h1>{title}</h1>{badge}</div>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {actions && <div className="page-heading__actions">{actions}</div>}
      </div>
    </header>
  );
};
