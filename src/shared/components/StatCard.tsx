import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  accentColor?: string;
  isLoading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
  accentColor = 'var(--color-primary)',
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}>
        <div style={{ width: '80px', height: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--color-border-light)', animation: 'shimmer 1.5s ease-in-out infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, var(--color-border-light) 25%, var(--color-border) 50%, var(--color-border-light) 75%)' }} />
        <div style={{ width: '50px', height: '28px', borderRadius: 'var(--radius-sm)', background: 'var(--color-border-light)', animation: 'shimmer 1.5s ease-in-out infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, var(--color-border-light) 25%, var(--color-border) 50%, var(--color-border-light) 75%)' }} />
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border)',
      padding: 'var(--space-5)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)',
      transition: 'box-shadow var(--transition-base)',
    }}
    onMouseOver={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
    onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: `${accentColor}10`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={22} color={accentColor} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0,
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          fontWeight: 'var(--font-weight-medium)' as any,
          marginBottom: 'var(--space-1)',
        }}>
          {label}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
          <span style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-bold)' as any,
            color: 'var(--color-text-primary)',
            lineHeight: 1,
          }}>
            {value}
          </span>
          {trend && (
            <span style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)' as any,
              color: trendUp ? 'var(--color-success)' : 'var(--color-danger)',
            }}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
