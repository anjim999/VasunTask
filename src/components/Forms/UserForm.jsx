import { useState } from 'react';
import { User, Mail, CreditCard, Lock, Eye, EyeOff, CheckCircle2, Send, Clock, Trash2, Edit3, X } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';

const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', id: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submissions, setSubmissions] = useLocalStorage('user-submissions', []);
  const [editingId, setEditingId] = useState(null);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.match(/\S+@\S+\.\S+/)) e.email = "Invalid email address";
    if (!formData.id.trim()) e.id = "User ID is required";
    if (formData.password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (editingId) {
        setSubmissions(submissions.map(sub => 
          sub.recordId === editingId 
            ? { ...formData, recordId: editingId, date: sub.date, lastEdited: new Date().toLocaleTimeString() } 
            : sub
        ));
        setEditingId(null);
      } else {
        const newSubmission = { 
          ...formData, 
          recordId: Date.now(),
          date: new Date().toLocaleTimeString() 
        };
        setSubmissions([newSubmission, ...submissions]);
      }
      setFormData({ name: '', email: '', id: '', password: '' });
      setErrors({});
    }
  };

  const handleEdit = (sub) => {
    setFormData({ name: sub.name, email: sub.email, id: sub.id, password: sub.password });
    setEditingId(sub.recordId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', id: '', password: '' });
    setErrors({});
  };

  const inputStyle = (err) => ({
    width: '100%', padding: '16px 20px 16px 52px', borderRadius: '12px',
    backgroundColor: 'var(--bg-input)', 
    border: `1px solid ${err ? '#f87171' : 'var(--border-color)'}`,
    color: 'var(--text-main)', outline: 'none', transition: '0.3s'
  });

  const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 };

  return (
    <div className="responsive-flex" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Left Side: The Form */}
      <div style={{ flex: '1', minWidth: 'min(100%, 320px)' }}>
        <div style={{ position: 'sticky', top: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {editingId ? 'Edit Profile' : 'User Details'}
            </h3>
            {editingId && (
              <button onClick={cancelEdit} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                <X size={14} /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User style={{ position: 'absolute', left: '18px', top: '18px', opacity: 0.3, color: 'var(--text-main)' }} size={20} />
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle(errors.name)} placeholder="John Doe" />
              </div>
              {errors.name && <span style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '4px' }}>{errors.name}</span>}
            </div>

            <div>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', left: '18px', top: '18px', opacity: 0.3, color: 'var(--text-main)' }} size={20} />
                <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={inputStyle(errors.email)} placeholder="john@example.com" autoComplete="off" />
              </div>
              {errors.email && <span style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '4px' }}>{errors.email}</span>}
            </div>

            <div>
              <label style={labelStyle}>User ID</label>
              <div style={{ position: 'relative' }}>
                <CreditCard style={{ position: 'absolute', left: '18px', top: '18px', opacity: 0.3, color: 'var(--text-main)' }} size={20} />
                <input value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} style={inputStyle(errors.id)} placeholder="USR-123" />
              </div>
              {errors.id && <span style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '4px' }}>{errors.id}</span>}
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '18px', top: '18px', opacity: 0.3, color: 'var(--text-main)' }} size={20} />
                <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} style={inputStyle(errors.password)} placeholder="••••••••" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '18px', top: '18px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <span style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '4px' }}>{errors.password}</span>}
            </div>

            <button type="submit" style={{
              padding: '18px', borderRadius: '12px', border: 'none', background: editingId ? '#34d399' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
              {editingId ? <CheckCircle2 size={20} /> : <Send size={20} />}
              {editingId ? 'Update Record' : 'Submit Profile'}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side: Activity Log */}
      <div style={{ flex: '1.2', minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={20} color="#34d399" /> Activity Log
          </h3>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>{submissions.length} Total</span>
        </div>

        <div className="custom-scrollbar" style={{ maxHeight: '600px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '16px', paddingRight: '12px' }}>
          {submissions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--bg-input)', borderRadius: '24px', border: '2px dashed var(--border-color)', opacity: 0.5, gridColumn: '1 / -1' }}>
              <p style={{ fontSize: '1rem' }}>No records found.</p>
            </div>
          ) : (
            submissions.map((sub) => (
              <div key={sub.recordId} style={{
                padding: '24px', borderRadius: '20px', backgroundColor: editingId === sub.recordId ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-input)', 
                border: `1px solid ${editingId === sub.recordId ? '#6366f1' : 'var(--border-color)'}`,
                animation: 'slideIn 0.3s ease-out', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: '0.3s transform',
              }} className="submission-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>
                      {sub.name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{sub.name}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600 }}>
                      <Clock size={12} /> {sub.date}
                    </div>
                    {sub.lastEdited && <span style={{ fontSize: '0.6rem', color: '#34d399' }}>Edited {sub.lastEdited}</span>}
                  </div>
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <Mail size={14} style={{ flexShrink: 0, opacity: 0.5 }} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={14} style={{ flexShrink: 0, opacity: 0.5 }} /> ID: <span style={{ fontWeight: 600 }}>{sub.id}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                  <button onClick={() => handleEdit(sub)} style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', border: 'none', cursor: 'pointer', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                    <Edit3 size={14} /> Edit
                  </button>
                  <button onClick={() => setSubmissions(submissions.filter(s => s.recordId !== sub.recordId))} style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(248, 113, 113, 0.1)', border: 'none', cursor: 'pointer', color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserForm;
