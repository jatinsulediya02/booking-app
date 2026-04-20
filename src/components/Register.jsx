import { useState } from 'react';
import { User, Mail, Lock, Phone, UserPlus, LogIn } from 'lucide-react';

export default function Register({ onRegister, onNavigateToLogin }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email);
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div className="text-center mb-8">
        <div className="success-animation" style={{ animation: 'none', background: 'var(--surface-color)', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}>
          <UserPlus size={40} />
        </div>
        <h2 className="text-3xl">Create Account</h2>
        <p className="text-muted mt-4">Join us for a seamless booking experience</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              <User size={18} />
            </div>
            <input type="text" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="John Doe" required />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              className="form-input" 
              style={{ paddingLeft: '2.5rem' }} 
              placeholder="john@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              <Phone size={18} />
            </div>
            <input type="tel" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="+1 234 567 8900" required />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              <Lock size={18} />
            </div>
            <input type="password" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="Create a strong password" required />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              <Lock size={18} />
            </div>
            <input type="password" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="Confirm your password" required />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4 flex items-center justify-center">
          <UserPlus size={18} /> Register Now
        </button>
      </form>

      <div className="text-center mt-8 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
        <p className="text-muted">Already have an account?</p>
        <button className="btn btn-secondary w-full mt-4 flex items-center justify-center" onClick={onNavigateToLogin}>
          <LogIn size={18} /> Login Here
        </button>
      </div>
    </div>
  );
}
