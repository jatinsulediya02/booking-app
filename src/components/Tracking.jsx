import { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';

export default function Tracking() {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingId) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStatus({
        id: trackingId,
        type: trackingId.startsWith('6') ? 'flight' : 'train',
        status: 'On Time',
        currentLocation: 'Approaching Destination',
        estimatedArrival: '14:30 PM',
        updates: [
          { time: '10:00 AM', message: 'Departed from Origin' },
          { time: '12:15 PM', message: 'In Transit' },
          { time: '13:45 PM', message: 'Approaching Destination' }
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="text-center mb-8">
        <div className="success-animation" style={{ animation: 'none', background: 'var(--surface-color)', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}>
          <Navigation size={40} />
        </div>
        <h2 className="text-3xl">Live Status Tracking</h2>
        <p className="text-muted mt-4">Enter your PNR or Flight Number to track live status.</p>
      </div>

      <form onSubmit={handleTrack}>
        <div className="form-group">
          <div style={{ position: 'relative', display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                <Search size={18} />
              </div>
              <input 
                type="text" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }} 
                placeholder="e.g. PNR 1234567890 or Flight 6E123" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Tracking...' : 'Track'}
            </button>
          </div>
        </div>
      </form>

      {status && (
        <div className="animation-wrapper mt-8" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className="text-2xl" style={{ textTransform: 'capitalize' }}>{status.type} Status</h3>
            <span className="status-badge" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>{status.status}</span>
          </div>

          <div style={{ backgroundColor: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <MapPin size={24} color="var(--primary-color)" />
              <div>
                <h4 className="font-bold text-lg">Current Location</h4>
                <p className="text-muted">{status.currentLocation}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <Navigation size={24} color="var(--primary-color)" style={{ transform: 'rotate(90deg)' }} />
              <div>
                <h4 className="font-bold text-lg">Estimated Arrival</h4>
                <p className="text-muted">{status.estimatedArrival}</p>
              </div>
            </div>
          </div>

          <h4 className="font-bold text-lg mt-8 mb-4">Live Updates</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {status.updates.map((update, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <span className="font-bold" style={{ minWidth: '80px', color: 'var(--primary-color)' }}>{update.time}</span>
                <span>{update.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
