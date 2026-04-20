import { Calendar as CalendarIcon, Clock, Video, MapPin, Home, Plane, Train, ArrowRight, User } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard({ bookings, onNewBooking }) {
  const getBookingDetails = (booking) => {
    switch (booking.duration) {
      case 1: return { title: "1 Hour Consultation", icon: <Clock size={24} />, type: 'consultation' };
      case 2: return { title: "2 Hours Itinerary Planning", icon: <Clock size={24} />, type: 'consultation' };
      case 3: return { title: "Hotel Stay", icon: <Home size={24} />, type: 'hotel' };
      case 4: return { title: "Flight Ticket", icon: <Plane size={24} />, type: 'flight' };
      case 5: return { title: "Train Ticket", icon: <Train size={24} />, type: 'train' };
      default: return { title: "Travel Booking", icon: <CalendarIcon size={24} />, type: 'unknown' };
    }
  };

  return (
    <div className="animation-wrapper">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={32} className="text-primary" /> My Bookings
          </h2>
          <p className="text-muted mt-2">Manage all your upcoming travel plans and sessions in one place.</p>
        </div>
        <button className="btn btn-primary" onClick={onNewBooking}>
          + New Booking
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="card text-center" style={{ padding: '4rem 2rem' }}>
          <CalendarIcon size={64} className="duration-icon mx-auto" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
          <h3 className="text-2xl mb-4">No bookings yet</h3>
          <p className="text-muted mb-8">You don't have any upcoming trips or sessions scheduled.</p>
          <button className="btn btn-primary" onClick={onNewBooking}>Start Planning</button>
        </div>
      ) : (
        <div className="dashboard-grid">
          {bookings.map(booking => {
            const { title, icon, type } = getBookingDetails(booking);
            
            return (
              <div key={booking.id} className="booking-item card" style={{ padding: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary-color)', borderRadius: 'var(--radius-md)' }}>
                      {icon}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{title}</h4>
                      <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0 }}>Booking ID: {booking.id}</p>
                    </div>
                  </div>
                  <span className="status-badge">{booking.status}</span>
                </div>

                <div className="booking-info" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', paddingTop: '0.5rem' }}>
                  {type === 'consultation' && (
                    <>
                      <p><CalendarIcon size={16} className="text-primary" /> <strong>Date:</strong> {format(booking.date, 'MMMM do, yyyy')}</p>
                      <p><Clock size={16} className="text-primary" /> <strong>Time:</strong> {booking.time}</p>
                      <p><Video size={16} className="text-primary" /> <strong>Link:</strong> Zoom Meeting</p>
                    </>
                  )}

                  {type === 'hotel' && (
                    <>
                      <p><Home size={16} className="text-primary" /> <strong>Hotel:</strong> {booking.hotel?.name}</p>
                      <p><MapPin size={16} className="text-primary" /> <strong>Location:</strong> {booking.hotel?.location}</p>
                      <p><CalendarIcon size={16} className="text-primary" /> <strong>Check-in:</strong> {format(booking.date, 'MMM do, yyyy')}</p>
                      <p><CalendarIcon size={16} className="text-primary" /> <strong>Check-out:</strong> {booking.checkOutDate ? format(booking.checkOutDate, 'MMM do, yyyy') : 'N/A'}</p>
                    </>
                  )}

                  {(type === 'flight' || type === 'train') && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', gridColumn: '1 / -1' }}>
                        <span style={{ fontWeight: 'bold' }}>{booking.origin}</span>
                        <ArrowRight size={16} className="text-primary" />
                        <span style={{ fontWeight: 'bold' }}>{booking.destination}</span>
                      </div>
                      <p><CalendarIcon size={16} className="text-primary" /> <strong>Departure:</strong> {booking.departureDateStr}</p>
                      {booking.isReturn && (
                        <p><CalendarIcon size={16} className="text-primary" /> <strong>Return:</strong> {booking.returnDateStr}</p>
                      )}
                      <p><User size={16} className="text-primary" /> <strong>Class:</strong> {booking.ticketClass}</p>
                      <p><strong>Passenger:</strong> {booking.name}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
