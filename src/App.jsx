import { useState, useEffect } from 'react';
import { 
  CheckSquare, FileText, BarChart3, Timer, Search, Sparkles, Sun, Moon 
} from 'lucide-react';

import TodoApp from './components/Todo/TodoApp';
import UserForm from './components/Forms/UserForm';
import MultiProgressBar from './components/Progress/MultiProgressBar';
import CountdownTimer from './components/Timer/CountdownTimer';
import SearchList from './components/Search/SearchList';

const TABS = [
  { id: 'todo', label: 'Todo App', icon: CheckSquare, component: TodoApp },
  { id: 'form', label: 'User Form', icon: FileText, component: UserForm },
  { id: 'progress', label: 'Progress Bar', icon: BarChart3, component: MultiProgressBar },
  { id: 'timer', label: 'Timer', icon: Timer, component: CountdownTimer },
  { id: 'search', label: 'Live Search', icon: Search, component: SearchList }
];

function App() {
  const [activeTab, setActiveTab] = useState('todo');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  const activeTabInfo = TABS.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabInfo?.component;
  const taskNumber = TABS.findIndex(t => t.id === activeTab) + 1;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div style={{ minHeight: '100vh', position: 'relative', color: 'var(--text-main)', backgroundColor: 'var(--bg-main)' }}>
      <div className="bg-animated">
        <div className="orb" style={{ width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', top: '-100px', left: '-100px', opacity: 'var(--orb-opacity)' }} />
        <div className="orb" style={{ width: 'clamp(250px, 40vw, 500px)', height: 'clamp(250px, 40vw, 500px)', background: 'radial-gradient(circle, rgba(217, 70, 239, 0.1) 0%, transparent 70%)', top: '40%', right: '-100px', opacity: 'var(--orb-opacity)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        <button 
          onClick={toggleTheme}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            padding: '10px', borderRadius: '50%', border: '1px solid var(--border-color)',
            background: 'var(--bg-card)', color: 'var(--text-main)', cursor: 'pointer',
            boxShadow: '0 4px 12px var(--shadow-color)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <header style={{ textAlign: 'center', marginBottom: '32px', marginTop: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ padding: 'clamp(8px, 2vw, 12px)', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 30px rgba(99, 102, 241, 0.3)' }}>
              <Sparkles size={28} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 900, background: 'linear-gradient(to right, #6366f1, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>
              VasunTask
            </h1>
          </div>
        </header>

        <nav style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div className="nav-container" style={{ display: 'flex', gap: '4px', padding: '6px', backgroundColor: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-color)', backdropFilter: 'blur(10px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {TABS.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="tab-button"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: '0.3s',
                    background: isActive ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                    color: isActive ? 'white' : 'var(--text-muted)',
                    fontWeight: 600,
                    boxShadow: isActive ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  <Icon size={18} />
                  <span className="tab-label">Task {idx + 1}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <main style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '2px' }}>Step {taskNumber}</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 700, color: 'var(--text-main)' }}>{activeTabInfo.label}</h2>
          </div>

          <div className="main-content" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: 'clamp(16px, 5vw, 40px)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px var(--shadow-color)', minHeight: '400px' }}>
            {ActiveComponent && <ActiveComponent />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
