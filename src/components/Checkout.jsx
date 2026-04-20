import { useState, useEffect } from 'react';
import { ShieldCheck, CreditCard, Smartphone, QrCode, Timer } from 'lucide-react';
import { format } from 'date-fns';

export default function Checkout({ bookingData, onPaymentComplete, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [upiId, setUpiId] = useState('');
  const [upiMethod, setUpiMethod] = useState('qr');
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
  
  if (!bookingData) return null;

  let price = 5000;
  let typeLabel = "1 Hour Consultation";
  if (bookingData.duration === 2) {
    price = 8500;
    typeLabel = "2 Hours Itinerary Planning";
  } else if (bookingData.duration === 3) {
    price = 25000;
    typeLabel = "Hotel Stay Package";
  } else if (bookingData.duration === 4) {
    typeLabel = "Flight Ticket";
    if (bookingData.ticketClass === 'Economy') {
      price = 25000;
    } else if (bookingData.ticketClass === 'Business Class') {
      price = 60000;
    } else {
      price = 25000;
    }
    if (bookingData.isReturn) price *= 2;
  } else if (bookingData.duration === 5) {
    typeLabel = "Train Ticket";
    if (bookingData.ticketClass === 'Sleeper Class') {
      price = 800;
    } else if (bookingData.ticketClass === '3rd AC') {
      price = 2000;
    } else if (bookingData.ticketClass === '2nd AC') {
      price = 3000;
    } else if (bookingData.ticketClass === '1st AC') {
      price = 5000;
    } else {
      price = 3000;
    }
    if (bookingData.isReturn) price *= 2;
  }

  const handlePay = () => {
    if (paymentMethod === 'upi' && upiMethod === 'id' && !upiId) {
      alert("Please enter UPI ID");
      return;
    }
    onPaymentComplete();
  };

  return (
    <div className="card checkout-container" style={{ paddingBottom: '3rem' }}>
      <ShieldCheck size={48} className="duration-icon" style={{ margin: '0 auto 1rem' }} />
      <h2 className="text-3xl">Secure Checkout</h2>
      <p className="text-muted mt-4">Review your booking details and complete the payment.</p>

      <div style={{ textAlign: 'left', marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-lg)' }}>
        <h3 className="text-2xl mb-4">Summary</h3>
        <p><strong>Booking Type:</strong> {typeLabel}</p>
        {bookingData.duration === 3 ? (
          <>
            <p><strong>Hotel:</strong> {bookingData.hotel?.name} ({bookingData.hotel?.location})</p>
            <p><strong>Check-in:</strong> {format(bookingData.date, 'MMMM do, yyyy')}</p>
            <p><strong>Check-out:</strong> {bookingData.checkOutDate ? format(bookingData.checkOutDate, 'MMMM do, yyyy') : 'N/A'}</p>
          </>
        ) : (bookingData.duration === 4 || bookingData.duration === 5) ? (
          <>
            <p><strong>From:</strong> {bookingData.origin}</p>
            <p><strong>To:</strong> {bookingData.destination}</p>
            <p><strong>Class:</strong> {bookingData.ticketClass}</p>
            <p><strong>Departure Date:</strong> {bookingData.departureDateStr}</p>
            {bookingData.isReturn && <p><strong>Return Date:</strong> {bookingData.returnDateStr}</p>}
          </>
        ) : (
          <>
            <p><strong>Date:</strong> {format(bookingData.date, 'MMMM do, yyyy')}</p>
            <p><strong>Time:</strong> {bookingData.time}</p>
          </>
        )}
        <p><strong>Name:</strong> {bookingData.name}</p>
      </div>

      <div className="price-tag">₹{price.toLocaleString('en-IN')}</div>

      <div style={{ marginTop: '2rem', textAlign: 'left' }}>
        <h3 className="text-xl mb-4" style={{ fontWeight: '700' }}>Select Payment Method</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div 
            className={`duration-card ${paymentMethod === 'card' ? 'selected' : ''}`} 
            style={{ padding: '1.5rem 1rem' }}
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCard size={32} className="duration-icon" />
            <h4 className="mt-2" style={{ fontWeight: '600' }}>Credit Card</h4>
          </div>
          <div 
            className={`duration-card ${paymentMethod === 'upi' ? 'selected' : ''}`} 
            style={{ padding: '1.5rem 1rem' }}
            onClick={() => setPaymentMethod('upi')}
          >
            <Smartphone size={32} className="duration-icon" />
            <h4 className="mt-2" style={{ fontWeight: '600' }}>UPI</h4>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div className="form-group animation-wrapper">
            <label className="form-label">Card Number</label>
            <input type="text" className="form-input mb-4" placeholder="1234 5678 9101 1121" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Expiry</label>
                <input type="text" className="form-input" placeholder="MM/YY" />
              </div>
              <div>
                <label className="form-label">CVV</label>
                <input type="text" className="form-input" placeholder="123" />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'upi' && (
          <div className="form-group animation-wrapper">
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button 
                className={`btn ${upiMethod === 'qr' ? 'btn-primary' : 'btn-secondary'}`} 
                onClick={() => setUpiMethod('qr')}
                style={{ flex: 1 }}
              >
                Scan QR Code
              </button>
              <button 
                className={`btn ${upiMethod === 'id' ? 'btn-primary' : 'btn-secondary'}`} 
                onClick={() => setUpiMethod('id')}
                style={{ flex: 1 }}
              >
                Enter UPI ID
              </button>
            </div>

            {upiMethod === 'id' ? (
              <>
                <label className="form-label">UPI ID</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="username@bank" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </>
            ) : (
              <div className="text-center" style={{ padding: '2rem', backgroundColor: 'var(--bg-color)', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
                <QrCode size={160} style={{ margin: '0 auto', color: 'var(--text-primary)' }} />
                <p className="mt-4 font-bold text-xl">Scan with any UPI App</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', borderRadius: '99px', fontWeight: 'bold' }}>
                  <Timer size={18} />
                  Time Remaining: {formatTime()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <button className="btn btn-primary w-full" style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }} onClick={handlePay}>
        {paymentMethod === 'upi' && upiMethod === 'qr' ? 'I have paid (Simulate)' : 'Pay Now'}
      </button>
      
      <div className="mt-8">
        <button className="btn btn-secondary" onClick={onBack}>Cancel</button>
      </div>
    </div>
  );
}
