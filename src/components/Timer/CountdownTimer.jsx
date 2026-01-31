import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'vgt-timer-state';

const CountdownTimer = () => {
  const [configSeconds, setConfigSeconds] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(60000);
  const [status, setStatus] = useState('idle');
  const [initialTime, setInitialTime] = useState(60000);
  
  const intervalRef = useRef(null);
  const lastUpdateRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const state = JSON.parse(saved);
      if (state.status === 'running') {
        const elapsed = Date.now() - state.lastUpdated;
        const remaining = Math.max(0, state.remaining - elapsed);
        setTimeRemaining(remaining);
        setStatus(remaining > 0 ? 'running' : 'completed');
      } else {
        setTimeRemaining(state.remaining);
        setStatus(state.status);
      }
      setInitialTime(state.initialTime);
      if (state.configSeconds) setConfigSeconds(state.configSeconds);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      remaining: timeRemaining, status, initialTime, configSeconds, lastUpdated: Date.now()
    }));
    
    if (status === 'running') {
      lastUpdateRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const delta = Date.now() - lastUpdateRef.current;
        lastUpdateRef.current = Date.now();
        setTimeRemaining(prev => {
          if (prev <= delta) { setStatus('completed'); return 0; }
          return prev - delta;
        });
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [status, timeRemaining, initialTime, configSeconds]);

  const format = (ms) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const ss = String(s % 60).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const ms_part = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return { mm, ss, ms_part };
  };

  const { mm, ss, ms_part } = format(timeRemaining);
  const progress = initialTime > 0 ? (timeRemaining / initialTime) * 100 : 0;

  return (
    <div style={{ maxWidth: 'min(100%, 500px)', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: 'clamp(20px, 5vw, 40px)' }}>
        <div style={{
          display: 'inline-flex', flexDirection: 'column', gap: '8px', padding: 'clamp(20px, 8vw, 40px)', borderRadius: '50%',
          border: '4px solid var(--border-color)', background: 'var(--bg-card)', position: 'relative'
        }}>
          <div style={{ fontSize: 'clamp(2.5rem, 12vw, 4rem)', fontWeight: 900, fontFamily: 'monospace', color: status === 'completed' ? '#f87171' : 'var(--text-main)', lineHeight: 1 }}>
            {mm}:{ss}<span style={{ fontSize: '1.2rem', opacity: 0.3 }}>.{ms_part}</span>
          </div>
          {status === 'completed' && <div style={{ color: '#f87171', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginTop: '8px' }}>Time's Up!</div>}
        </div>
      </div>

      <div style={{ height: '6px', background: 'var(--bg-card-hover)', borderRadius: '3px', marginBottom: '32px', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(to right, #6366f1, #d946ef)', transition: '0.1s linear' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {status === 'idle' && (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>Set Duration:</span>
            <input 
              type="number" min="1"
              value={configSeconds} 
              onChange={e => setConfigSeconds(Math.max(1, parseInt(e.target.value) || 0))} 
              style={{ width: '70px', padding: '8px', borderRadius: '10px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-main)', textAlign: 'center' }} 
            />
            <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>seconds</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {status !== 'completed' && (status === 'idle' || status === 'paused') ? (
            <button onClick={() => {
              if (status === 'idle') { setInitialTime(configSeconds * 1000); setTimeRemaining(configSeconds * 1000); }
              setStatus('running');
            }} style={{
              flex: 1, padding: '16px', borderRadius: '14px', border: 'none', background: '#34d399', color: 'white', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', maxWidth: '300px'
            }}>
              <Play size={20} fill="white" /> {status === 'idle' ? 'Start' : 'Resume'}
            </button>
          ) : status === 'running' ? (
            <button onClick={() => setStatus('paused')} style={{ flex: 1, padding: '16px', borderRadius: '14px', border: 'none', background: '#fbbf24', color: '#1a1a1a', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', maxWidth: '300px' }}>
              <Pause size={20} fill="currentColor" /> Pause
            </button>
          ) : null}

          <button onClick={() => { setStatus('idle'); setTimeRemaining(configSeconds * 1000); }} style={{
            padding: '16px 24px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', cursor: 'pointer'
          }}>
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
