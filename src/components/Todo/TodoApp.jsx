import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';

const PRIORITIES = {
  high: { label: 'High', emoji: '🔴', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.2)', border: 'rgba(239, 68, 68, 0.3)' },
  medium: { label: 'Medium', emoji: '🟡', color: '#eab308', bg: 'rgba(234, 179, 8, 0.2)', border: 'rgba(234, 179, 8, 0.3)' },
  low: { label: 'Low', emoji: '🟢', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.2)', border: 'rgba(34, 197, 94, 0.3)' }
};

const TodoApp = () => {
  const [tasks, setTasks] = useLocalStorage('todo-tasks', []);
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e?.preventDefault(); 
    if (!inputValue || !inputValue.trim()) return;
    const newTask = { id: Date.now(), text: inputValue.trim(), completed: false, priority };
    setTasks(prev => [newTask, ...prev]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(x => x.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0 }}>
        <div style={{ marginBottom: '24px' }}>
          <form onSubmit={addTask} style={{ display: 'flex', gap: '12px', width: '100%', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              style={{
                flex: '1 1 240px', padding: '16px 20px', borderRadius: '12px', 
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-input)', 
                color: 'var(--text-main)', outline: 'none', fontSize: '1rem'
              }}
            />
            <button type="submit" style={{
              flex: '1 1 100px', padding: '16px 24px', borderRadius: '12px', border: 'none', 
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontWeight: 600, 
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'
            }}>
              <Plus size={20} /> Add
            </button>
          </form>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {Object.entries(PRIORITIES).map(([key, p]) => (
              <button key={key} type="button" onClick={() => setPriority(key)} style={{
                padding: '6px 12px', borderRadius: '10px', fontSize: '0.75rem', cursor: 'pointer',
                border: `1px solid ${priority === key ? p.border : 'transparent'}`,
                background: priority === key ? p.bg : 'var(--bg-card)',
                color: priority === key ? p.color : 'var(--text-muted)',
                fontWeight: priority === key ? 600 : 400, display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                <span>{p.emoji}</span> {p.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '2px', background: 'var(--bg-card)', padding: '4px', borderRadius: '12px' }}>
            {['all', 'active', 'completed'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '6px 10px', borderRadius: '8px', border: 'none', fontSize: '0.75rem', cursor: 'pointer',
                background: filter === f ? '#6366f1' : 'transparent',
                color: filter === f ? 'white' : 'var(--text-muted)'
              }}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', maxHeight: '500px', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', opacity: 0.3, color: 'var(--text-main)' }}>
            {filter === 'all' ? 'No tasks yet.' : `No ${filter} tasks.`}
          </div>
        ) : (
          filteredTasks.map(t => (
            <div key={t.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '14px',
              backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)',
              animation: 'slideIn 0.3s ease-out', flexShrink: 0
            }}>
              <button onClick={() => toggleTask(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {t.completed ? <CheckCircle2 size={18} color="#34d399" /> : <Circle size={18} color="var(--text-muted)" />}
              </button>
              <span style={{ flex: 1, textDecoration: t.completed ? 'line-through' : 'none', opacity: t.completed ? 0.4 : 1, fontSize: '0.95rem', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t.text}
              </span>
              <span style={{
                fontSize: '0.6rem', padding: '3px 8px', borderRadius: '5px', fontWeight: 700,
                background: PRIORITIES[t.priority].bg, color: PRIORITIES[t.priority].color, border: `1px solid ${PRIORITIES[t.priority].border}`, flexShrink: 0
              }}>
                {PRIORITIES[t.priority].label.toUpperCase()}
              </span>
              <button onClick={() => deleteTask(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, color: '#f87171', padding: '4px' }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;
