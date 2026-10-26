import React, { useState, useRef, useEffect } from 'react';

const CATEGORY_MAP = {
  work: '💼 Work',
  personal: '👤 Personal',
  study: '📚 Study',
  goals: '🎯 Goals',
  shopping: '🛒 Shopping',
};

export default function TodoItem({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editCategory, setEditCategory] = useState(todo.category);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      onDelete(todo.id);
      return;
    }
    onUpdate(todo.id, {
      text: trimmed,
      priority: editPriority,
      category: editCategory,
    });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditPriority(todo.priority);
      setEditCategory(todo.category);
      setIsEditing(false);
    }
  };

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(todo.createdAt || 0));
  }, [todo.createdAt]);

  return (
    <li
      id={`todo-item-${todo.id}`}
      className={`todo-item ${todo.completed ? 'completed' : ''} priority-border-${todo.priority}`}
    >
      <div className="todo-content">
        <label className="checkbox-container" aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}>
          <input
            id={`checkbox-${todo.id}`}
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
          />
          <span className="custom-checkbox">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path
                d="M1.5 5.2L4.5 8.2L10.5 1.8"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </label>

        {isEditing ? (
          <div className="edit-form-inline">
            <input
              ref={inputRef}
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="edit-options-row">
              <select
                className="edit-select"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                aria-label="Edit priority"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <select
                className="edit-select"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                aria-label="Edit category"
              >
                <option value="work">💼 Work</option>
                <option value="personal">👤 Personal</option>
                <option value="study">📚 Study</option>
                <option value="goals">🎯 Goals</option>
                <option value="shopping">🛒 Shopping</option>
              </select>

              <div className="edit-buttons-group">
                <button
                  type="button"
                  id={`save-btn-${todo.id}`}
                  className="btn-icon btn-save"
                  onClick={handleSave}
                  title="Save changes (Enter)"
                >
                  ✓
                </button>
                <button
                  type="button"
                  id={`cancel-btn-${todo.id}`}
                  className="btn-icon btn-cancel"
                  onClick={() => {
                    setEditText(todo.text);
                    setIsEditing(false);
                  }}
                  title="Cancel (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="todo-body" onDoubleClick={() => setIsEditing(true)}>
            <div className="todo-title-row">
              <span className="todo-text">{todo.text}</span>
            </div>

            <div className="todo-meta">
              <span className={`badge badge-priority badge-priority-${todo.priority}`}>
                {todo.priority.toUpperCase()}
              </span>
              <span className="badge badge-category">
                {CATEGORY_MAP[todo.category] || todo.category}
              </span>
              <span className="todo-timestamp">{formattedDate}</span>
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="todo-actions">
          <button
            type="button"
            id={`edit-btn-${todo.id}`}
            className="btn-action edit"
            onClick={() => setIsEditing(true)}
            title="Edit task"
            aria-label={`Edit "${todo.text}"`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>
          <button
            type="button"
            id={`delete-btn-${todo.id}`}
            className="btn-action delete"
            onClick={() => onDelete(todo.id)}
            title="Delete task"
            aria-label={`Delete "${todo.text}"`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}
