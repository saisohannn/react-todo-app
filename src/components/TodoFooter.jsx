import React from 'react';

export default function TodoFooter({
  activeCount,
  completedCount,
  onClearCompleted,
  onToggleAll,
  allCompleted,
}) {
  return (
    <footer className="todo-footer-card" id="todo-footer-card">
      <div className="footer-left">
        <span className="items-counter" id="items-left-count">
          <strong>{activeCount}</strong> {activeCount === 1 ? 'task' : 'tasks'} remaining
        </span>
        <span className="storage-badge" title="Changes are automatically persisted in browser localStorage">
          <span className="storage-dot" />
          Auto-saved
        </span>
      </div>

      <div className="footer-actions">
        <button
          type="button"
          id="toggle-all-btn"
          className="btn-text"
          onClick={onToggleAll}
          title={allCompleted ? 'Mark all as active' : 'Mark all as completed'}
        >
          {allCompleted ? 'Uncheck All' : 'Check All'}
        </button>

        {completedCount > 0 && (
          <button
            type="button"
            id="clear-completed-btn"
            className="btn-text btn-clear-completed"
            onClick={onClearCompleted}
            title="Remove all completed tasks"
          >
            Clear Completed ({completedCount})
          </button>
        )}
      </div>
    </footer>
  );
}
