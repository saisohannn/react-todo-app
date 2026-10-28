# TaskFlow — React TODO Application

> **Assignment Question 14**: *Create a TODO application in React with necessary components and deploy it into GitHub.*

TaskFlow is a modern, responsive, component-driven task management application built with **React** and **Vite**, featuring rich aesthetics, glassmorphism UI, real-time filtering, local storage persistence, and zero-configuration GitHub Pages deployment.

---

## ✨ Features   

- **Component Architecture**: Built with modular, reusable React components (`Header`, `TodoInput`, `TodoFilters`, `TodoList`, `TodoItem`, `TodoFooter`).
- **Interactive Task Management**:
  - Add tasks with description, category, and priority (High, Medium, Low).
  - Inline task editing (double-click or tap edit button).
  - Quick toggle complete/incomplete with animated custom checkbox.
  - Delete individual tasks or clear completed tasks in bulk.
  - "Check All / Uncheck All" batch toggle.
- **Search & Dynamic Filters**:
  - Live search filtering by task text, priority, or category.
  - Status tabs: All, Active, Completed with live counter badges.
  - Filter by category (Work, Personal, Study, Goals, Shopping).
  - Sort by: Newest, Oldest, Priority level, or Alphabetical.
- **Visual Progress & Analytics**:
  - Real-time completion progress bar with percentage indicator.
  - Active tasks counter.
- **Themes & Aesthetics**:
  - Dark mode (default) & Light mode with seamless instant toggle.
  - Curated typography (*Outfit* & *Plus Jakarta Sans* via Google Fonts).
  - Glassmorphic card design with subtle ambient glow and micro-animations.
- **Data Persistence**:
  - Auto-saved to browser `localStorage` with live status indicator.

---

## 📁 Component Structure

```text
src/
├── components/
│   ├── Header.jsx        # App title, formatted date, theme toggle & progress bar
│   ├── TodoInput.jsx     # Task input form with category & priority selectors
│   ├── TodoFilters.jsx   # Search bar, status tabs, category & sort dropdowns
│   ├── TodoList.jsx      # List container with contextual empty states
│   ├── TodoItem.jsx      # Individual task item with inline editing & actions
│   └── TodoFooter.jsx    # Counter, auto-save status & batch actions
├── App.jsx               # State management, filter computations, localStorage sync
├── App.css               # Design system, glassmorphism, responsive styles
├── index.css             # Theme CSS variables (dark & light), Google Fonts
└── main.jsx              # React 19 application entry point
```

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:5173`.

---

## 🌐 Deploying to GitHub & GitHub Pages

You can easily push this project to GitHub and deploy it using either method below:

### Option A: Automatic Deployment via GitHub Actions (Recommended)

1. Create a new repository on [GitHub](https://github.com/new) (e.g., `react-todo-app`).
2. Add your GitHub remote and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/react-todo-app.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site!

### Option B: Deploy using `gh-pages` script

1. Make sure your repository is pushed to GitHub as described above.
2. Run:
   ```bash
   npm run deploy
   ```
3. In your GitHub repository, go to **Settings** > **Pages** and ensure the source branch is set to `gh-pages`.
