import React from 'react';

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'work', label: '💼 Work' },
  { id: 'personal', label: '👤 Personal' },
  { id: 'study', label: '📚 Study' },
  { id: 'goals', label: '🎯 Goals' },
  { id: 'shopping', label: '🛒 Shopping' },
];

export default function TodoFilters({
  activeFilter,
  onFilterChange,
  counts,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="filters-card" id="todo-filters-card">
      <div className="search-bar">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="search-todo-input"
          type="text"
          className="search-input"
          placeholder="Search your tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            id="clear-search-btn"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className="filter-controls-row">
        <div className="status-tabs" role="tablist">
          <button
            id="filter-all-tab"
            role="tab"
            aria-selected={activeFilter === 'all'}
            className={`tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All <span className="tab-badge">{counts.all}</span>
          </button>
          <button
            id="filter-active-tab"
            role="tab"
            aria-selected={activeFilter === 'active'}
            className={`tab-btn ${activeFilter === 'active' ? 'active' : ''}`}
            onClick={() => onFilterChange('active')}
          >
            Active <span className="tab-badge">{counts.active}</span>
          </button>
          <button
            id="filter-completed-tab"
            role="tab"
            aria-selected={activeFilter === 'completed'}
            className={`tab-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            Completed <span className="tab-badge">{counts.completed}</span>
          </button>
        </div>

        <div className="filter-dropdowns">
          <select
            id="category-filter-select"
            className="styled-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          <select
            id="sort-select"
            className="styled-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort tasks"
          >
            <option value="newest">🕒 Newest first</option>
            <option value="oldest">⌛ Oldest first</option>
            <option value="priority">⚡ High priority</option>
            <option value="alphabetical">🔤 Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  );
}
