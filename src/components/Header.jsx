import React, { useState } from 'react';

export default function Header({ todos, theme, onToggleTheme }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const [todayStr] = useState(() =>
    new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(new Date())
  );

  return (
    <header className="app-header" id="app-header">
      <div className="header-top">
        <div className="brand-group">
          <div className="brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <h1 className="brand-title">TaskFlow</h1>
            <p className="brand-subtitle">{todayStr}</p>
          </div>
        </div>

        <button
          id="theme-toggle-btn"
          className="theme-toggle"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle color theme"
        >
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>

      {total > 0 && (
        <div className="progress-card">
          <div className="progress-info">
            <span className="progress-label">Task Progress</span>
            <span className="progress-count">
              <strong>{completed}</strong> of {total} completed ({percent}%)
            </span>
          </div>
          <div className="progress-bar-bg" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      )}
    </header>
  );
}
