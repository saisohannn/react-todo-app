import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import './App.css';

const STORAGE_KEY = 'taskflow_todos_v1';
const THEME_KEY = 'taskflow_theme_v1';

const INITIAL_TODOS = [
  {
    id: 'sample-1',
    text: 'Build React TODO application with modular components',
    completed: true,
    priority: 'high',
    category: 'study',
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'sample-2',
    text: 'Push project repository to GitHub',
    completed: false,
    priority: 'high',
    category: 'work',
    createdAt: Date.now() - 3600000 * 1,
  },
  {
    id: 'sample-3',
    text: 'Deploy live demo to GitHub Pages',
    completed: false,
    priority: 'medium',
    category: 'goals',
    createdAt: Date.now() - 1800000,
  },
  {
    id: 'sample-4',
    text: 'Customize categories, filter tags, and dark theme',
    completed: false,
    priority: 'low',
    category: 'personal',
    createdAt: Date.now() - 900000,
  },
];

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    return INITIAL_TODOS;
  });

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return 'dark';
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Sync todos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [todos]);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleAddTodo = ({ text, category, priority }) => {
    const newTodo = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      text,
      category,
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleUpdate = (id, updates) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const allCompleted = todos.length > 0 && todos.every((t) => t.completed);

  const handleToggleAll = () => {
    const targetState = !allCompleted;
    setTodos((prev) => prev.map((t) => ({ ...t, completed: targetState })));
  };

  const handleResetFilters = () => {
    setActiveFilter('all');
    setSearchQuery('');
    setSelectedCategory('all');
  };

  // Filter and sort items
  const filteredTodos = useMemo(() => {
    const priorityWeight = { high: 3, medium: 2, low: 1 };

    return todos
      .filter((todo) => {
        // Status filter
        if (activeFilter === 'active' && todo.completed) return false;
        if (activeFilter === 'completed' && !todo.completed) return false;

        // Category filter
        if (selectedCategory !== 'all' && todo.category !== selectedCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchText = todo.text.toLowerCase().includes(q);
          const matchCategory = todo.category.toLowerCase().includes(q);
          const matchPriority = todo.priority.toLowerCase().includes(q);
          if (!matchText && !matchCategory && !matchPriority) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.createdAt || 0) - (a.createdAt || 0);
        if (sortBy === 'oldest') return (a.createdAt || 0) - (b.createdAt || 0);
        if (sortBy === 'priority') {
          return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        }
        if (sortBy === 'alphabetical') {
          return a.text.localeCompare(b.text);
        }
        return 0;
      });
  }, [todos, activeFilter, selectedCategory, searchQuery, sortBy]);

  const counts = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { all: total, active, completed };
  }, [todos]);

  return (
    <div className="app-layout">
      <div className="app-background-glow" />
      <main className="app-container">
        <Header
          todos={todos}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <TodoInput onAddTodo={handleAddTodo} />

        <TodoFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <TodoList
          todos={filteredTodos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          onResetFilters={handleResetFilters}
        />

        {todos.length > 0 && (
          <TodoFooter
            activeCount={counts.active}
            completedCount={counts.completed}
            onClearCompleted={handleClearCompleted}
            onToggleAll={handleToggleAll}
            allCompleted={allCompleted}
          />
        )}

        <div className="app-bottom-info">
          <span>Question 14 React Project</span>
          <span>•</span>
          <span>Deployable to GitHub & GitHub Pages</span>
        </div>
      </main>
    </div>
  );
}
