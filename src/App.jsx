import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BookingFlow from './components/BookingFlow';
import Checkout from './components/Checkout';
import Success from './components/Success';
import Dashboard from './components/Dashboard';
import TravelBackground from './components/TravelBackground';
import Login from './components/Login';
import Register from './components/Register';
import Tracking from './components/Tracking';
import AdminDashboard from './components/AdminDashboard';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState('light');
  const [currentView, setCurrentView] = useState('booking'); // booking, checkout, success, dashboard
  const [bookingData, setBookingData] = useState(null);
  const [bookings, setBookings] = useState([
    { id: 'DEMO-1', name: 'John Doe', duration: 1, date: new Date(), time: '10:00 AM', status: 'Confirmed' },
    { id: 'DEMO-2', name: 'Jane Smith', duration: 3, date: new Date(Date.now() + 86400000), hotel: { name: 'Taj Palace', location: 'Mumbai' }, status: 'Confirmed' },
    { id: 'DEMO-3', name: 'Bob Wilson', duration: 4, date: new Date(Date.now() - 86400000), origin: 'Delhi', destination: 'Goa', departureDateStr: '2026-04-19', status: 'Confirmed' }
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleBookingComplete = (data) => {
    setBookingData(data);
    setCurrentView('checkout');
  };

  const handlePaymentComplete = () => {
    const newBooking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Confirmed'
    };
    setBookings([newBooking, ...bookings]);
    setCurrentView('success');
  };

  const handleLoginSubmit = (email) => {
    setIsLoggedIn(true);
    if (email === 'user@admin.com') {
      setIsAdmin(true);
      setCurrentView('dashboard');
    } else {
      setIsAdmin(false);
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentView('booking');
  };

  const navigateToBooking = () => {
    setBookingData(null);
    setCurrentView('booking');
  };

  const navigateToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Admin Actions
  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
    }
  };

  const handleRescheduleBooking = (id) => {
    const newDate = window.prompt('Enter new date (YYYY-MM-DD):', '2026-05-01');
    if (newDate) {
      setBookings(bookings.map(b => b.id === id ? { ...b, date: new Date(newDate), departureDateStr: newDate } : b));
    }
  };

  const handleAddFreeEvent = () => {
    const name = window.prompt('Client Name:');
    if (name) {
      const newBooking = {
        id: 'FREE-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        name,
        duration: 1,
        date: new Date(),
        time: 'Free Consultation',
        status: 'Confirmed'
      };
      setBookings([newBooking, ...bookings]);
    }
  };

  return (
    <div className="app-container">
      <TravelBackground />
      <Navbar 
        isLoggedIn={isLoggedIn} 
        isAdmin={isAdmin}
        onLoginClick={() => setCurrentView('login')}
        onRegisterClick={() => setCurrentView('register')}
        onTrackStatusClick={() => setCurrentView('tracking')}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
        onLogoClick={() => setCurrentView(isLoggedIn ? 'dashboard' : 'booking')}
      />
      
      <main className="main-content">
        {currentView === 'booking' && (
          <BookingFlow onComplete={handleBookingComplete} />
        )}
        
        {currentView === 'checkout' && (
          <Checkout 
            bookingData={bookingData} 
            onPaymentComplete={handlePaymentComplete}
            onBack={() => setCurrentView('booking')}
          />
        )}
        
        {currentView === 'success' && (
          <Success 
            isLoggedIn={isLoggedIn}
            onLoginClick={() => setCurrentView('login')}
            onRegisterClick={() => setCurrentView('register')}
            onGoToDashboard={navigateToDashboard}
          />
        )}
        
        {currentView === 'dashboard' && (
          isAdmin ? (
            <AdminDashboard 
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              onRescheduleBooking={handleRescheduleBooking}
              onAddFreeEvent={handleAddFreeEvent}
            />
          ) : (
            <Dashboard 
              bookings={bookings}
              onNewBooking={navigateToBooking}
            />
          )
        )}
        {currentView === 'login' && (
          <Login 
            onLogin={handleLoginSubmit} 
            onNavigateToRegister={() => setCurrentView('register')} 
          />
        )}
        
        {currentView === 'register' && (
          <Register 
            onRegister={(email) => handleLoginSubmit(email)} 
            onNavigateToLogin={() => setCurrentView('login')} 
          />
        )}
        
        {currentView === 'tracking' && (
          <Tracking />
        )}
      </main>
    </div>
  );
}

export default App;
