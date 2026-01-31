import { useState } from 'react';
import { Plus, Minus, Trash2, Cpu, Activity, Zap, ShieldAlert } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';

const MultiProgressBar = () => {
  const [inputs, setInputs] = useLocalStorage('progress-nodes', [
    { id: 1, name: 'Main Core', value: 45 },
    { id: 2, name: 'Auxiliary', value: 85 }
  ]);

  const average = Math.round(inputs.reduce((a, b) => a + b.value, 0) / (inputs.length || 1)) || 0;

  const getStatus = (v) => {
    if (v < 40) return { label: 'LOW', color: '#f87171', icon: ShieldAlert };
    if (v < 70) return { label: 'NORMAL', color: '#fbbf24', icon: Activity };
    return { label: 'OPTIMAL', color: '#34d399', icon: Zap };
  };

  const globalStatus = getStatus(average);

  const updateNode = (id, updates) => {
    setInputs(inputs.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const updateValue = (id, val) => {
    const clamped = Math.max(0, Math.min(100, val));
    updateNode(id, { value: clamped });
  };

  const addNode = () => {
    setInputs([...inputs, { id: Date.now(), name: `Node ${inputs.length + 1}`, value: 50 }]);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Summary Dashboard */}
      <div style={{ 
        padding: '32px', 
        borderRadius: '20px', 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border-color)', 
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ margin: 0, opacity: 0.6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Aggregated Progress</h3>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1 }}>
              {average}%
            </div>
          </div>
          
          <div style={{ textAlign: 'right', background: 'var(--bg-card-hover)', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.7rem', opacity: 0.5, fontWeight: 700, marginBottom: '4px' }}>SYSTEM STATUS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: globalStatus.color, fontWeight: 800 }}>
              <globalStatus.icon size={16} /> {globalStatus.label}
            </div>
          </div>
        </div>

        <div style={{ height: '16px', background: 'var(--bg-input)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <div 
            style={{ 
              width: `${average}%`, 
              height: '100%', 
              background: globalStatus.color, 
              transition: '0.8s ease-in-out',
              borderRadius: '8px'
            }} 
          />
        </div>
      </div>

      {/* Inputs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {inputs.map((input, idx) => {
          const status = getStatus(input.value);
          
          return (
            <div key={input.id} style={{ 
              padding: '20px', 
              borderRadius: '16px', 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <input 
                  value={input.name}
                  onChange={(e) => updateNode(input.id, { name: e.target.value })}
                  style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.95rem', outline: 'none' }}
                />
                <button 
                  onClick={() => setInputs(inputs.filter(x => x.id !== input.id))} 
                  style={{ opacity: 0.3, background: 'none', border: 'none', cursor: 'pointer', color: '#f87171' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ flex: 1, height: '8px', background: 'var(--bg-input)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${input.value}%`, height: '100%', background: status.color, transition: '0.4s' }} />
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)', opacity: 0.8 }}>{input.value}%</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => updateValue(input.id, input.value - 5)} style={{ 
                  width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-color)', 
                  background: 'var(--bg-card-hover)', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  <Minus size={14} />
                </button>
                
                <input 
                  type="range" min="0" max="100" value={input.value} 
                  onChange={e => updateValue(input.id, parseInt(e.target.value))}
                  style={{ flex: 1, accentColor: status.color, cursor: 'pointer' }}
                />
                
                <button onClick={() => updateValue(input.id, input.value + 5)} style={{ 
                  width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--border-color)', 
                  background: 'var(--bg-card-hover)', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  <Plus size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={addNode} style={{ 
        width: '100%', padding: '16px', borderRadius: '16px', background: 'none', 
        border: '1px dashed var(--border-color)', color: 'var(--text-muted)', fontWeight: 600, 
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
      }}>
        <Plus size={20} /> Add Component Node
      </button>
    </div>
  );
};

export default MultiProgressBar;
