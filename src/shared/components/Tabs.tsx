import React,{ useId } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, children }) => {
  const tabPrefix = useId();
  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | undefined;
    // Tabs follow RTL reading order: ArrowLeft advances to the next tab.
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === undefined || tabs.length === 0) return;
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    onTabChange(nextTab.id);
    document.getElementById(`${tabPrefix}-tab-${nextTab.id}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="أقسام المحتوى" aria-orientation="horizontal" style={{
        display: 'flex',
        borderBottom: '2px solid var(--color-border)',
        gap: 0,
        overflowX: 'auto',
      }}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              id={`${tabPrefix}-tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tabPrefix}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3) var(--space-5)',
                fontSize: 'var(--font-size-base)',
                fontWeight: isActive ? 700 : 500,
                fontFamily: 'var(--font-family)',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                marginBottom: '-2px',
                cursor: 'pointer',
                transition: 'color var(--transition-fast), border-color var(--transition-fast)',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 700,
                  backgroundColor: isActive ? 'var(--color-primary-50)' : 'var(--color-border-light)',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                  padding: '1px 8px',
                  borderRadius: 'var(--radius-full)',
                  minWidth: '20px',
                  textAlign: 'center',
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div id={`${tabPrefix}-panel`} role="tabpanel" aria-labelledby={`${tabPrefix}-tab-${activeTab}`} tabIndex={0} style={{ paddingTop: 'var(--space-5)', animation: 'fadeIn 0.2s ease forwards' }}>
        {children}
      </div>
    </div>
  );
};
