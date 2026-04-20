import { useState } from 'react';
import { Clock, Calendar as CalendarIcon, ArrowRight, User as UserIcon, Home, Plane, Train } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';

export default function BookingFlow({ onComplete }) {
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [formData, setFormData] = useState({ name: '', email: '', requirements: '' });
  
  // New state for ticket bookings
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDateStr, setDepartureDateStr] = useState('');
  const [isReturn, setIsReturn] = useState(false);
  const [returnDateStr, setReturnDateStr] = useState('');
  const [ticketClass, setTicketClass] = useState('');

  const locations = ['All', 'Mumbai', 'Jaipur', 'Udaipur', 'Goa', 'New Delhi', 'Agra'];
  
  const hotels = [
    { id: 'taj', name: 'Taj Mahal Palace', location: 'Mumbai', image: '/taj_hotel.png' },
    { id: 'rambagh', name: 'Rambagh Palace', location: 'Jaipur', image: '/rambagh_palace.png' },
    { id: 'oberoi', name: 'Oberoi Udaivilas', location: 'Udaipur', image: '/oberoi_udaivilas.png' },
    { id: 'taj_goa', name: 'Taj Exotica Resort', location: 'Goa', image: '/taj_exotica_goa.png' },
    { id: 'leela', name: 'The Leela Palace', location: 'New Delhi', image: '/leela_palace_delhi.png' },
    { id: 'amarvilas', name: 'The Oberoi Amarvilas', location: 'Agra', image: '/oberoi_amarvilas_agra.png' }
  ];

  const today = startOfToday();
  const days = Array.from({ length: 14 }).map((_, i) => addDays(today, i));
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const getTotalSteps = () => {
    if (duration === 3) return 5;
    if (duration === 4 || duration === 5) return 3;
    return 4;
  };

  const handleNext = () => setStep(step + 1);
  
  const handleComplete = (e) => {
    e.preventDefault();
    onComplete({ 
      duration, date: selectedDate, time: selectedTime, checkOutDate, hotel: selectedHotel, 
      origin, destination, departureDateStr, isReturn, returnDateStr, ticketClass,
      ...formData 
    });
  };

  return (
    <div className="card">
      <div className="text-center mb-8">
        <h2 className="text-3xl">Book a Travel Consultation</h2>
        <p className="text-muted mt-4">Select your preferred duration and time to schedule a travel planning session with me.</p>
      </div>

      <div className="step-indicator">
        {Array.from({ length: getTotalSteps() }).map((_, i) => (
          <div key={i + 1} className={`step-dot ${step >= i + 1 ? 'active' : ''}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="animation-wrapper">
          <h3 className="text-2xl text-center mb-4">Select Duration</h3>
          <div className="duration-selector" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <div className={`duration-card ${duration === 1 ? 'selected' : ''}`} onClick={() => setDuration(1)}>
              <Clock size={48} className="duration-icon" />
              <div>
                <h4 className="text-2xl">1 Hour</h4>
                <p className="text-muted">Standard Consultation</p>
              </div>
            </div>
            <div className={`duration-card ${duration === 2 ? 'selected' : ''}`} onClick={() => setDuration(2)}>
              <Clock size={48} className="duration-icon" />
              <div>
                <h4 className="text-2xl">2 Hours</h4>
                <p className="text-muted">Itinerary Planning</p>
              </div>
            </div>
            <div className={`duration-card ${duration === 3 ? 'selected' : ''}`} onClick={() => setDuration(3)}>
              <Home size={48} className="duration-icon" />
              <div>
                <h4 className="text-2xl">Hotel Stay</h4>
                <p className="text-muted">Premium Accommodation</p>
              </div>
            </div>
            <div className={`duration-card ${duration === 4 ? 'selected' : ''}`} onClick={() => setDuration(4)}>
              <Plane size={48} className="duration-icon" />
              <div>
                <h4 className="text-2xl">Flight Ticket</h4>
                <p className="text-muted">Domestic & International</p>
              </div>
            </div>
            <div className={`duration-card ${duration === 5 ? 'selected' : ''}`} onClick={() => setDuration(5)}>
              <Train size={48} className="duration-icon" />
              <div>
                <h4 className="text-2xl">Train Ticket</h4>
                <p className="text-muted">Fast & Scenic Routes</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex" style={{ justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" disabled={!duration} onClick={handleNext}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (duration <= 3) && (
        <div className="animation-wrapper">
          <h3 className="text-2xl text-center mb-4">{duration === 3 ? "Select Check-in Date" : "Select a Date"}</h3>
          <div className="calendar-grid">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="text-center font-bold text-muted">{d}</div>
            ))}
            {/* Pad to start on correct day of week for the first day */}
            {Array.from({ length: days[0].getDay() }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map(day => (
              <div 
                key={day.toString()} 
                className={`calendar-day ${selectedDate && isSameDay(selectedDate, day) ? 'selected' : ''}`}
                onClick={() => setSelectedDate(day)}
              >
                {format(day, 'd')}
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" disabled={!selectedDate} onClick={handleNext}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (duration === 4 || duration === 5) && (
        <div className="animation-wrapper">
          <h3 className="text-2xl text-center mb-4">Travel Details</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            <div className="form-group">
              <label className="form-label">From (Origin Station/Airport)</label>
              <input type="text" className="form-input" required value={origin} onChange={e => setOrigin(e.target.value)} placeholder="e.g. New Delhi" />
            </div>
            <div className="form-group">
              <label className="form-label">To (Destination Station/Airport)</label>
              <input type="text" className="form-input" required value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Mumbai" />
            </div>
            <div className="form-group">
              <label className="form-label">Departure Date</label>
              <input type="date" className="form-input" required value={departureDateStr} onChange={e => setDepartureDateStr(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Class</label>
              <select className="form-input" required value={ticketClass} onChange={e => setTicketClass(e.target.value)}>
                <option value="" disabled>Select Class</option>
                {duration === 4 ? (
                  <>
                    <option value="Economy">Economy</option>
                    <option value="Business Class">Business Class</option>
                  </>
                ) : (
                  <>
                    <option value="Sleeper Class">Sleeper Class</option>
                    <option value="3rd AC">3rd AC</option>
                    <option value="2nd AC">2nd AC</option>
                    <option value="1st AC">1st AC</option>
                  </>
                )}
              </select>
            </div>
            <div style={{
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: `2px solid ${isReturn ? 'var(--primary-color)' : 'var(--border-color)'}`,
              backgroundColor: isReturn ? 'rgba(59, 130, 246, 0.05)' : 'rgba(var(--surface-color-rgb), 0.3)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setIsReturn(!isReturn)}>
                <div>
                  <h4 style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Round Trip / Return Ticket</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Book a return ticket for your journey</p>
                </div>
                <div style={{
                  width: '50px',
                  height: '28px',
                  borderRadius: '99px',
                  backgroundColor: isReturn ? 'var(--primary-color)' : 'var(--border-color)',
                  position: 'relative',
                  transition: 'background-color 0.3s ease'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: isReturn ? '24px' : '2px',
                    transition: 'left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
              </div>
              
              {isReturn && (
                <div className="animation-wrapper" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border-color)' }}>
                  <label className="form-label" style={{ fontWeight: '600', color: 'var(--primary-color)' }}>Select Return Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    required={isReturn} 
                    value={returnDateStr} 
                    onChange={e => setReturnDateStr(e.target.value)} 
                    style={{ 
                      borderColor: 'var(--primary-color)',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
                    }} 
                  />
                </div>
              )}
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button type="submit" className="btn btn-primary">
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (duration <= 3) && (
        <div className="animation-wrapper">
          <h3 className="text-2xl text-center mb-4">
            {duration === 3 ? "Select Check-out Date" : `Select a Time for ${selectedDate && format(selectedDate, 'MMM do')}`}
          </h3>
          
          {duration === 3 ? (
            <div className="calendar-grid">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} className="text-center font-bold text-muted">{d}</div>
              ))}
              {Array.from({ length: days[0].getDay() }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {days.map(day => (
                <div 
                  key={day.toString()} 
                  className={`calendar-day ${checkOutDate && isSameDay(checkOutDate, day) ? 'selected' : ''} ${day <= selectedDate ? 'disabled' : ''}`}
                  onClick={() => day > selectedDate && setCheckOutDate(day)}
                >
                  {format(day, 'd')}
                </div>
              ))}
            </div>
          ) : (
            <div className="time-slots">
              {timeSlots.map(time => (
                <div 
                  key={time} 
                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            <button className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
            <button className="btn btn-primary" disabled={duration === 3 ? !checkOutDate : !selectedTime} onClick={handleNext}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 4 && duration === 3 && (
        <div className="animation-wrapper">
          <h3 className="text-2xl text-center mb-4">Select Your Destination & Hotel</h3>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
            {locations.map(loc => (
              <button 
                key={loc}
                className={`btn ${selectedLocation === loc ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.5rem 1rem', borderRadius: '99px' }}
                onClick={() => setSelectedLocation(loc)}
              >
                {loc}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {hotels.filter(h => selectedLocation === 'All' || h.location === selectedLocation).map(h => (
              <div 
                key={h.id} 
                className={`card ${selectedHotel?.id === h.id ? 'selected' : ''}`}
                style={{ padding: '1rem', cursor: 'pointer', borderColor: selectedHotel?.id === h.id ? 'var(--primary-color)' : 'var(--border-color)', borderWidth: '2px', transition: 'all 0.3s ease' }}
                onClick={() => setSelectedHotel(h)}
              >
                <img src={h.image} alt={h.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }} />
                <h4 className="font-bold" style={{ fontSize: '1.1rem' }}>{h.name}</h4>
                <p className="text-muted text-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {h.location}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button className="btn btn-secondary" onClick={() => setStep(3)}>Back</button>
            <button className="btn btn-primary" disabled={!selectedHotel} onClick={handleNext}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === getTotalSteps() && (
        <div className="animation-wrapper">
          <h3 className="text-2xl text-center mb-4">Your Details</h3>
          <form onSubmit={handleComplete}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Session Requirements (Optional)</label>
              <textarea 
                className="form-input" 
                rows="3"
                value={formData.requirements}
                onChange={e => setFormData({...formData, requirements: e.target.value})}
              />
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(step - 1)}>Back</button>
              <button type="submit" className="btn btn-primary">
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
