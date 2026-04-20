import { Check, ArrowRight } from 'lucide-react';

export default function Success({ isLoggedIn, onLoginClick, onRegisterClick, onGoToDashboard }) {
  return (
    <div className="card checkout-container">
      <div className="success-animation">
        <Check size={40} />
      </div>
      <h2 className="text-3xl">Booking Confirmed!</h2>
      <p className="text-muted mt-4 mb-8">Your payment was successful and your session has been scheduled. A confirmation email has been sent.</p>

      {isLoggedIn ? (
        <button className="btn btn-primary w-full flex items-center justify-center" style={{ gap: '0.5rem' }} onClick={onGoToDashboard}>
          Go to My Dashboard <ArrowRight size={16} />
        </button>
      ) : (
        <div style={{ padding: '2rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-lg)' }}>
          <h3 className="text-2xl mb-4">Create an Account</h3>
          <p className="text-muted mb-4">Register to easily manage your bookings, reschedule, and book faster next time.</p>
          <div className="flex" style={{ gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={onLoginClick}>Log In</button>
            <button className="btn btn-primary" onClick={onRegisterClick}>Register</button>
          </div>
        </div>
      )}
    </div>
  );
}
