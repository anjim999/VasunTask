import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

const NAMES = [
  'Aarav Patel', 'Aditi Sharma', 'Alexander Hamilton', 'Ananya Gupta', 'Arjun Singh',
  'Benjamin Franklin', 'Deepika Padukone', 'Diya Krishnan', 'Eleanor Roosevelt',
  'Ishaan Verma', 'Kavya Reddy', 'Leonardo da Vinci', 'Marie Curie', 
  'Meera Iyer', 'Mohammed Khan', 'Neha Malhotra', 'Priya Venkatesh',
  'Rahul Dravid', 'Riya Kapoor', 'Rohan Mehta', 'Sanya Mirchandani',
  'Sara Ali Khan', 'Stephen Hawking', 'Tanvi Saxena', 'Thomas Edison',
  'Varun Dhawan', 'Vihaan Das', 'William Shakespeare', 'Zara Sheikh'
];

const SearchList = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => 
    NAMES.filter(n => n.toLowerCase().includes(query.toLowerCase()))
  , [query]);

  const highlight = (text) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((p, i) => 
      p.toLowerCase() === query.toLowerCase() 
        ? <span key={i} style={{ backgroundColor: 'rgba(99, 102, 241, 0.4)', color: '#818cf8', fontWeight: 700, padding: '2px 4px', borderRadius: '4px' }}>{p}</span> 
        : p
    );
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <Search style={{ position: 'absolute', left: '20px', top: '18px', opacity: 0.3, color: 'var(--text-main)' }} size={20} />
        <input
          type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search team members..."
          style={{
            width: '100%', padding: '16px 20px 16px 52px', borderRadius: '16px',
            background: 'var(--bg-input)', border: '1px solid var(--border-color)',
            color: 'var(--text-main)', outline: 'none', fontSize: 'clamp(0.9rem, 4vw, 1.1rem)'
          }}
        />
        {query && <X onClick={() => setQuery('')} style={{ position: 'absolute', right: '18px', top: '18px', cursor: 'pointer', opacity: 0.3, color: 'var(--text-main)' }} size={20} />}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.8rem', opacity: 0.4, padding: '0 8px', color: 'var(--text-main)' }}>
        <span>Directory</span>
        <span>{filtered.length} matches</span>
      </div>

      <div className="custom-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '450px', overflowY: 'auto', paddingRight: '8px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', opacity: 0.2, color: 'var(--text-main)' }}>No results found</div>
        ) : (
          filtered.map((name, idx) => (
            <div key={name} style={{
              display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', borderRadius: '14px',
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              animation: `slideIn 0.3s ease-out ${idx * 0.05}s forwards`, opacity: 0
            }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.75rem', color: 'white', flexShrink: 0 }}>
                {name.charAt(0)}
              </div>
              <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{highlight(name)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchList;
