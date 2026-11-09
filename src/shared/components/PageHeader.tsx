import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  image?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs, actions, badge, image }) => {
  const { pathname } = useLocation();
  if (pathname.split('/').filter(Boolean).length === 1) return <>
    <h1 className="visually-hidden">{title}</h1>
    {actions && <div className="page-heading__actions">{actions}</div>}
  </>;
  return (
    <header className="page-heading page-heading--module" style={image ? { '--module-image': `url(${image})` } as React.CSSProperties : undefined}>
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
