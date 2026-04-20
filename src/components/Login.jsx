import { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';

export default function Login({ onLogin, onNavigateToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div className="text-center mb-8">
        <div className="success-animation" style={{ animation: 'none', background: 'var(--surface-color)', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}>
          <LogIn size={40} />
        </div>
        <h2 className="text-3xl">Welcome Back</h2>
        <p className="text-muted mt-4">Login to manage your bookings</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email or User ID</label>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              <Mail size={18} />
            </div>
            <input 
              type="text" 
              className="form-input" 
              style={{ paddingLeft: '2.5rem' }} 
              placeholder="Enter your email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              <Lock size={18} />
            </div>
            <input 
              type="password" 
              className="form-input" 
              style={{ paddingLeft: '2.5rem' }} 
              placeholder="Enter your password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4 flex items-center justify-center">
          <LogIn size={18} /> Login
        </button>
      </form>

      <div className="text-center mt-8">
        <p className="text-muted">Don't have an account?</p>
        <button className="btn btn-secondary w-full mt-4 flex items-center justify-center" onClick={onNavigateToRegister}>
          <UserPlus size={18} /> Register Here
        </button>
      </div>
    </div>
  );
}
