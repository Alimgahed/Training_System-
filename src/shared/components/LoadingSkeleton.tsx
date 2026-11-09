import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'table' | 'card' | 'form' | 'stat' | 'detail';
  rows?: number;
}

const SkeletonBar: React.FC<{ width?: string; height?: string; style?: React.CSSProperties }> = ({ width = '100%', height = '14px', style }) => (
  <div style={{
    width,
    height,
    borderRadius: 'var(--radius-sm)',
    background: 'linear-gradient(90deg, var(--color-border-light) 25%, var(--color-border) 50%, var(--color-border-light) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s ease-in-out infinite',
    ...style,
  }} />
);

const TableSkeleton: React.FC<{ rows: number }> = ({ rows }) => (
  <div style={{ padding: 'var(--space-5)' }}>
    <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-4)', borderBottom: '2px solid var(--color-border)' }}>
      {[120, 200, 150, 100, 80].map((w, i) => (
        <SkeletonBar key={i} width={`${w}px`} height="12px" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-border-light)' }}>
        {[120, 200, 150, 100, 80].map((w, j) => (
          <SkeletonBar key={j} width={`${w}px`} height="14px" />
        ))}
      </div>
    ))}
  </div>
);

const CardSkeleton: React.FC = () => (
  <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
    <SkeletonBar width="40%" height="18px" />
    <SkeletonBar width="70%" />
    <SkeletonBar width="55%" />
    <SkeletonBar width="85%" />
  </div>
);

const StatSkeleton: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} style={{ padding: 'var(--space-5)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
        <SkeletonBar width="60%" height="12px" style={{ marginBottom: 'var(--space-3)' }} />
        <SkeletonBar width="40%" height="28px" />
      </div>
    ))}
  </div>
);

const DetailSkeleton: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <SkeletonBar width="250px" height="28px" />
        <SkeletonBar width="180px" height="14px" />
      </div>
      <SkeletonBar width="120px" height="36px" />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
      <CardSkeleton />
      <CardSkeleton />
    </div>
  </div>
);

const FormSkeleton: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: 'var(--space-5)' }}>
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <SkeletonBar width="80px" height="12px" />
        <SkeletonBar height="36px" />
      </div>
    ))}
  </div>
);

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ variant = 'table', rows = 6 }) => {
  switch (variant) {
    case 'table': return <TableSkeleton rows={rows} />;
    case 'card': return <CardSkeleton />;
    case 'stat': return <StatSkeleton />;
    case 'detail': return <DetailSkeleton />;
    case 'form': return <FormSkeleton />;
    default: return <TableSkeleton rows={rows} />;
  }
};
