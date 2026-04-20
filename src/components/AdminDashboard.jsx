import { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MapPin, 
  Home, 
  Plane, 
  Train, 
  ArrowRight, 
  User, 
  Trash2, 
  Calendar, 
  Plus, 
  DollarSign, 
  TrendingUp, 
  Users, 
  CheckCircle,
  XCircle,
  Edit2,
  Settings,
  ShieldCheck,
  ChevronRight,
  PieChart,
  BarChart3,
  Search,
  Filter
} from 'lucide-react';
import { format, isSameDay, isAfter, isBefore, addDays, startOfToday } from 'date-fns';

export default function AdminDashboard({ bookings, onCancelBooking, onRescheduleBooking, onAddFreeEvent }) {
  const [activeTab, setActiveTab] = useState('bookings'); // bookings, payments, clients, settings
  const [bookingFilter, setBookingFilter] = useState('Upcoming'); // Past, Tomorrow, Upcoming
  const [searchTerm, setSearchTerm] = useState('');

  const today = startOfToday();
  const tomorrow = addDays(today, 1);

  // Demo Data for analytics
  const stats = [
    { title: 'Total Revenue', value: '₹4,52,000', icon: <DollarSign />, trend: '+12.5%', color: '#3b82f6' },
    { title: 'Total Bookings', value: '128', icon: <Calendar />, trend: '+8.2%', color: '#10b981' },
    { title: 'Active Clients', value: '42', icon: <Users />, trend: '+5.4%', color: '#8b5cf6' },
    { title: 'Conv. Rate', value: '18.4%', icon: <TrendingUp />, trend: '+2.1%', color: '#f59e0b' },
  ];

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const bDate = new Date(b.date);
      if (bookingFilter === 'Past') return isBefore(bDate, today);
      if (bookingFilter === 'Tomorrow') return isSameDay(bDate, tomorrow);
      if (bookingFilter === 'Upcoming') return isAfter(bDate, tomorrow) || isSameDay(bDate, today);
      return true;
    });
  }, [bookings, bookingFilter, today, tomorrow]);

  // Demo Payments
  const payments = [
    { id: 'PAY-101', user: 'Rahul Sharma', amount: 5000, method: 'UPI', date: '2026-04-20', status: 'Completed' },
    { id: 'PAY-102', user: 'Priya Patel', amount: 25000, method: 'Card', date: '2026-04-19', status: 'Completed' },
    { id: 'PAY-103', user: 'Amit Singh', amount: 8500, method: 'UPI', date: '2026-04-18', status: 'Pending' },
    { id: 'PAY-104', user: 'Sneha Gupta', amount: 60000, method: 'Card', date: '2026-04-18', status: 'Completed' },
    { id: 'PAY-105', user: 'Vikram Rao', amount: 2000, method: 'UPI', date: '2026-04-17', status: 'Completed' },
  ];

  // Demo Clients
  const clients = [
    { id: 'C-1', name: 'Rahul Sharma', email: 'rahul@example.com', joined: '2026-03-15', bookings: 3 },
    { id: 'C-2', name: 'Priya Patel', email: 'priya@example.com', joined: '2026-03-20', bookings: 1 },
    { id: 'C-3', name: 'Amit Singh', email: 'amit@example.com', joined: '2026-04-02', bookings: 5 },
    { id: 'C-4', name: 'Sneha Gupta', email: 'sneha@example.com', joined: '2026-04-10', bookings: 2 },
  ];

  const [availability, setAvailability] = useState({
    monday: { active: true, start: '09:00', end: '17:00' },
    tuesday: { active: true, start: '09:00', end: '17:00' },
    wednesday: { active: true, start: '09:00', end: '17:00' },
    thursday: { active: true, start: '09:00', end: '17:00' },
    friday: { active: true, start: '09:00', end: '17:00' },
    saturday: { active: false, start: '10:00', end: '14:00' },
    sunday: { active: false, start: '10:00', end: '14:00' },
  });

  const [blockedDates, setBlockedDates] = useState(['2026-05-01', '2026-05-05']);

  const getBookingDetails = (booking) => {
    switch (booking.duration) {
      case 1: return { title: "1h Consultation", icon: <Clock size={18} />, color: '#3b82f6' };
      case 2: return { title: "2h Itinerary", icon: <Clock size={18} />, color: '#2563eb' };
      case 3: return { title: "Hotel", icon: <Home size={18} />, color: '#8b5cf6' };
      case 4: return { title: "Flight", icon: <Plane size={18} />, color: '#ef4444' };
      case 5: return { title: "Train", icon: <Train size={18} />, color: '#f59e0b' };
      default: return { title: "Booking", icon: <CalendarIcon size={18} />, color: '#64748b' };
    }
  };

  return (
    <div className="admin-container animation-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="text-3xl" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={36} className="text-primary" /> Admin Panel
          </h1>
          <p className="text-muted mt-2">Welcome back, Super Admin. Here is what's happening today.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={() => onAddFreeEvent()}>
            <Plus size={18} /> Add Free Event
          </button>
          <div className="success-animation" style={{ margin: 0, width: '45px', height: '45px', animation: 'none' }}>
            <User size={24} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem', 
        backgroundColor: 'rgba(var(--surface-color-rgb), 0.5)', 
        padding: '0.5rem', 
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        overflowX: 'auto'
      }}>
        {[
          { id: 'bookings', label: 'Bookings', icon: <Calendar /> },
          { id: 'payments', label: 'Payments', icon: <DollarSign /> },
          { id: 'clients', label: 'Clients', icon: <Users /> },
          { id: 'availability', label: 'Availability', icon: <Settings /> },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              flex: 1, 
              minWidth: '120px',
              backgroundColor: activeTab === tab.id ? 'var(--primary-color)' : 'transparent',
              border: 'none',
              boxShadow: activeTab === tab.id ? 'var(--shadow-md)' : 'none'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings View */}
      {activeTab === 'bookings' && (
        <div className="animation-wrapper">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-color)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
              {['Upcoming', 'Tomorrow', 'Past'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setBookingFilter(filter)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: bookingFilter === filter ? 'var(--surface-color)' : 'transparent',
                    color: bookingFilter === filter ? 'var(--primary-color)' : 'var(--text-secondary)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: bookingFilter === filter ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search bookings..." 
                style={{ paddingLeft: '2.5rem', width: '300px' }}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredBookings.length === 0 ? (
              <div className="card text-center" style={{ padding: '3rem' }}>
                <CalendarIcon size={48} className="text-muted" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p className="text-muted">No bookings found for this period.</p>
              </div>
            ) : (
              filteredBookings.map(booking => {
                const details = getBookingDetails(booking);
                return (
                  <div key={booking.id} className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }}>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        borderRadius: 'var(--radius-md)', 
                        backgroundColor: `${details.color}20`, 
                        color: details.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {details.icon}
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>{booking.name}</h4>
                        <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>
                          {details.title} • {format(new Date(booking.date), 'MMM do')} • {booking.time || 'All Day'}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                      <div className="text-right">
                        <span className="status-badge" style={{ 
                          backgroundColor: booking.status === 'Confirmed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: booking.status === 'Confirmed' ? 'var(--success-color)' : 'var(--danger-color)'
                        }}>
                          {booking.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-icon" title="Reschedule" onClick={() => onRescheduleBooking(booking.id)} style={{ color: 'var(--primary-color)', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                          <Edit2 size={18} />
                        </button>
                        <button className="btn-icon" title="Cancel" onClick={() => onCancelBooking(booking.id)} style={{ color: 'var(--danger-color)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Payments Dashboard */}
      {activeTab === 'payments' && (
        <div className="animation-wrapper">
          <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '2rem' }}>
            {stats.map((stat, i) => (
              <div key={i} className="card" style={{ padding: '1.5rem', borderLeft: `4px solid ${stat.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ color: stat.color }}>{stat.icon}</div>
                  <span style={{ color: 'var(--success-color)', fontSize: '0.85rem', fontWeight: 'bold' }}>{stat.trend}</span>
                </div>
                <h3 className="text-2xl">{stat.value}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="text-xl">Recent Transactions</h3>
              <button className="btn btn-secondary">Download Report</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                  <tr>
                    <th style={{ padding: '1rem 1.5rem' }}>Transaction ID</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Client</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Amount</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Method</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(pay => (
                    <tr key={pay.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>{pay.id}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{pay.user}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>₹{pay.amount.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{pay.method}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>{pay.date}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '99px', 
                          fontSize: '0.75rem', 
                          fontWeight: 'bold',
                          backgroundColor: pay.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: pay.status === 'Completed' ? 'var(--success-color)' : '#f59e0b'
                        }}>
                          {pay.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Clients Tab */}
      {activeTab === 'clients' && (
        <div className="animation-wrapper">
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="text-xl">Client Management</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="text" className="form-input" placeholder="Search clients..." style={{ width: '250px' }} />
                <button className="btn btn-primary">Add Client</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', padding: '1.5rem' }}>
              {clients.map(client => (
                <div key={client.id} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--bg-color)' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {client.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0 }}>{client.name}</h4>
                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>{client.email}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                      <span><strong>{client.bookings}</strong> Bookings</span>
                      <span>Joined {client.joined}</span>
                    </div>
                  </div>
                  <button className="btn-icon"><ChevronRight size={20} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Availability Settings */}
      {activeTab === 'availability' && (
        <div className="animation-wrapper">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Weekly Schedule */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <Clock className="text-primary" />
                <h3 className="text-xl">Weekly Schedule</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {Object.entries(availability).map(([day, config]) => (
                  <div key={day} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '120px' }}>
                      <div 
                        onClick={() => setAvailability(prev => ({ ...prev, [day]: { ...config, active: !config.active } }))}
                        style={{ 
                          width: '40px', 
                          height: '20px', 
                          borderRadius: '99px', 
                          backgroundColor: config.active ? 'var(--primary-color)' : 'var(--border-color)',
                          position: 'relative',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ 
                          width: '16px', 
                          height: '16px', 
                          borderRadius: '50%', 
                          backgroundColor: 'white', 
                          position: 'absolute', 
                          top: '2px', 
                          left: config.active ? '22px' : '2px',
                          transition: 'all 0.2s ease'
                        }} />
                      </div>
                      <span style={{ textTransform: 'capitalize', fontWeight: '600' }}>{day.slice(0, 3)}</span>
                    </div>
                    {config.active ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="time" className="form-input" style={{ padding: '0.4rem', width: '100px' }} value={config.start} />
                        <span>to</span>
                        <input type="time" className="form-input" style={{ padding: '0.4rem', width: '100px' }} value={config.end} />
                      </div>
                    ) : (
                      <span className="text-muted">Unavailable</span>
                    )}
                  </div>
                ))}
              </div>
              <button className="btn btn-primary w-full mt-8">Save Schedule</button>
            </div>

            {/* Blocked Dates */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <XCircle className="text-danger" />
                <h3 className="text-xl">Block Specific Dates</h3>
              </div>
              <p className="text-muted mb-6">Dates where you will be unavailable for any bookings.</p>
              
              <div className="form-group">
                <label className="form-label">Add Date to Block</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input type="date" className="form-input" />
                  <button className="btn btn-primary">Block</button>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h4 className="mb-4">Currently Blocked</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {blockedDates.map(date => (
                    <div key={date} style={{ 
                      padding: '0.5rem 1rem', 
                      backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                      color: 'var(--danger-color)', 
                      borderRadius: '99px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {format(new Date(date), 'MMM do, yyyy')}
                      <XCircle size={14} style={{ cursor: 'pointer' }} onClick={() => setBlockedDates(blockedDates.filter(d => d !== date))} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
