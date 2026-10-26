import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({
  todos,
  onToggleComplete,
  onDelete,
  onUpdate,
  activeFilter,
  searchQuery,
  onResetFilters,
}) {
  if (todos.length === 0) {
    let emptyTitle = "You're all caught up!";
    let emptySub = 'No tasks right now. Add a new task above to stay productive!';

    if (searchQuery) {
      emptyTitle = 'No matching tasks';
      emptySub = `No tasks found matching "${searchQuery}".`;
    } else if (activeFilter === 'active') {
      emptyTitle = 'No active tasks';
      emptySub = 'Great job! Everything is either completed or waiting for you to add more.';
    } else if (activeFilter === 'completed') {
      emptyTitle = 'No completed tasks';
      emptySub = 'Complete some of your active tasks and they will appear here!';
    }

    return (
      <div className="empty-state-card" id="empty-state-card">
        <div className="empty-icon-wrap">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <h3 className="empty-title">{emptyTitle}</h3>
        <p className="empty-desc">{emptySub}</p>
        {(searchQuery || activeFilter !== 'all') && (
          <button
            type="button"
            id="reset-filter-btn"
            className="btn btn-secondary empty-reset-btn"
            onClick={onResetFilters}
          >
            Show All Tasks
          </button>
        )}
      </div>
    );
  }

  return (
    <ul className="todo-list" id="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
