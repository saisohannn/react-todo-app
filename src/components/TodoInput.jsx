import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'work', label: '💼 Work' },
  { id: 'personal', label: '👤 Personal' },
  { id: 'study', label: '📚 Study' },
  { id: 'goals', label: '🎯 Goals' },
  { id: 'shopping', label: '🛒 Shopping' },
];

const PRIORITIES = [
  { id: 'low', label: 'Low', color: 'emerald' },
  { id: 'medium', label: 'Medium', color: 'amber' },
  { id: 'high', label: 'High', color: 'rose' },
];

export default function TodoInput({ onAddTodo }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('work');
  const [priority, setPriority] = useState('medium');
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Please enter a task description');
      return;
    }

    onAddTodo({
      text: trimmed,
      category,
      priority,
    });

    setText('');
    setError('');
  };

  return (
    <div className="todo-input-card" id="todo-input-card">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="input-row">
          <input
            id="new-todo-input"
            type="text"
            className={`todo-text-input ${error ? 'input-error' : ''}`}
            placeholder="What needs to be done?..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError('');
            }}
            onFocus={() => setIsExpanded(true)}
          />
          <button
            id="add-todo-btn"
            type="submit"
            className="btn btn-primary"
            aria-label="Add Task"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add</span>
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className={`input-options ${isExpanded || text ? 'visible' : ''}`}>
          <div className="option-group">
            <span className="option-label">Category:</span>
            <div className="option-pills" role="radiogroup" aria-label="Category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  id={`cat-btn-${cat.id}`}
                  className={`pill-btn ${category === cat.id ? 'active' : ''}`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <span className="option-label">Priority:</span>
            <div className="priority-pills" role="radiogroup" aria-label="Priority">
              {PRIORITIES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  id={`priority-btn-${p.id}`}
                  className={`priority-pill priority-${p.id} ${priority === p.id ? 'active' : ''}`}
                  onClick={() => setPriority(p.id)}
                >
                  <span className="priority-dot" />
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
