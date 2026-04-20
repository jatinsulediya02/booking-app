import { Sun, Moon, Plane, User, LogOut, LogIn, Navigation, ShieldCheck } from 'lucide-react';

export default function Navbar({ isLoggedIn, isAdmin, onLoginClick, onRegisterClick, onTrackStatusClick, onLogout, theme, toggleTheme, onLogoClick }) {
  return (
    <nav className="navbar">
      <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={onLogoClick}>
        <Plane size={28} color="#3b82f6" />
        <span>TravelBook</span>
        {isAdmin && (
          <span style={{ 
            fontSize: '0.7rem', 
            background: 'var(--primary-color)', 
            color: 'white', 
            padding: '2px 8px', 
            borderRadius: '99px',
            marginLeft: '8px',
            textTransform: 'uppercase',
            fontWeight: '800',
            letterSpacing: '0.5px'
          }}>Admin</span>
        )}
      </div>
      
      <div className="nav-actions">
        <button className="btn-icon" onClick={onTrackStatusClick} aria-label="Track Status" title="Live Status Tracking">
          <Navigation size={20} />
        </button>
        <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        {isLoggedIn ? (
          <>
            <div className="flex items-center" style={{ gap: '0.5rem', marginRight: '1rem', fontWeight: '500', color: isAdmin ? 'var(--primary-color)' : 'inherit' }}>
              {isAdmin ? <ShieldCheck size={18} /> : <User size={18} />}
              <span>{isAdmin ? 'Admin Portal' : 'My Account'}</span>
            </div>
            <button className="btn btn-secondary" onClick={onLogout}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-secondary" onClick={onLoginClick}>
              <LogIn size={16} /> Login
            </button>
            <button className="btn btn-primary" onClick={onRegisterClick}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
