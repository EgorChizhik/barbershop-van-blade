import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";
import { BookingProvider } from '../context/BookingContext';
import BookingPanel from './booking/BookingPanel';

const Layout = () => {
  const location = useLocation();

  return (
    <BookingProvider> 
      <ScrollToTop />
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
        
        {location.pathname !== '/contacts' && <Footer />}
    
        <BookingPanel />
      </div>
    </BookingProvider>
  );
};

export default Layout;