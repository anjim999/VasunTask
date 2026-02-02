# VasunTask | Advanced Frontend Internship Assignment

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-yellow?logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?logo=vercel)](https://vasun-task.vercel.app/)

## 🔗 Live Demo

**Deployment URL:** [https://vasun-task.vercel.app/](https://vasun-task.vercel.app/)

A high-performance, responsive React application showcasing modular component architecture, complex state management, and custom persistence hooks. Built specifically for the **Vasundharaa Geo Technologies** Internship Assignment.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

*   **Node.js**: `v18.x` or higher
*   **npm**: `v9.x` or higher

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/vasuntask-assignment.git
    cd vasuntask-assignment
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Launch the development server**:
    ```bash
    npm run dev
    ```

---

## 🛠️ Tech Stack & Architecture

*   **Core**: React 18 (Hooks, Context-like state management with custom hooks)
*   **Build Tool**: Vite (Lightning-fast HMR)
*   **Styling**: 
    *   **Dynamic Theming**: CSS variables + `data-theme` attribute for instant Dark/Light mode switching.
    *   **Architecture**: Hybrid approach using Tailwind CSS for resets and Inline Styles for complex, state-dependent UI calculations.
*   **Icons**: Lucide React (Pixel-perfect, lightweight icons)
*   **Persistence**: Custom `useLocalStorage` hook for cross-session data integrity.

---

## 📋 Task Highlights

### 1. Task 1: Enhanced Todo System
*   **Features**: Full CRUD, Priority tagging (🔴 🟡 🟢), and Completion toggling.
*   **Smart Filtering**: Real-time view switching between All, Active, and Completed tasks.
*   **UX**: Fixed header layout with an independent scrollable task list.

### 2. Task 3: Intelligent Progress Dashboard
*   **Dynamic Calculation**: Computes a weighted global average from multiple sub-nodes.
*   **Visual Feedback**: Color-coded thresholds (Red < 40%, Green > 70%) with fluid CSS transitions.
*   **Advanced**: Persistent node naming and removal logic.

### 3. Task 2: Robust Form Handling
*   **Validation**: Real-time inline regex validation for email and mandatory field checks.
*   **Security**: Password visibility toggle and controlled input sanitization.
*   **Activity Logging**: Captures submissions into a persistent history log with edit/delete capabilities.

### 4. Task 4: Precision Countdown Timer
*   **Logic**: Drift-compensated timing using delta timestamps from `Date.now()`.
*   **High Resolution**: Millisecond-level accuracy displayed in real-time.
*   **Session Persistence**: Resumes exactly from where it left off, even after a browser refresh.

### 5. Task 5: Live Search with Highlighting
*   **Performance**: Optimized filtering with `useMemo` to prevent unnecessary re-renders.
*   **Highlighting**: Custom regex logic to highlight search queries within results while preserving case sensitivity.

---

## 🧠 Assumptions & Implementation Decisions

*   **Modularity over Utility**: Chose to build custom components for each task to demonstrate deep understanding of React’s lifecycle and props flow rather than relying on external UI libraries.
*   **Inline styles for Logic**: Used inline styles for elements like progress bars and timers where the UI state changes at `60fps`. This avoids CSS class-name thrashing and ensures smoother performance.
*   **Custom Hook Strategy**: Abstracted LocalStorage logic into `useLocalStorage` to follow the DRY (Don't Repeat Yourself) principle.
*   **Responsiveness**: Implemented a "Mobile-First" strategy using `clamp()` and flex-box wrapping to ensure the app looks premium on everything from a 4K monitor to an iPhone SE.

---

## 📂 Project Structure

```text
src/
├── components/          # Specialized task directories
│   ├── Todo/           # Task 1
│   ├── Forms/          # Task 2
│   ├── Progress/       # Task 3
│   ├── Timer/          # Task 4
│   └── Search/         # Task 5
├── hooks/              # Custom reusable hooks (useLocalStorage)
├── App.jsx             # Main controller and Tab Navigation
├── index.css           # Global theme variables & animations
└── main.jsx            # Entry point
```


