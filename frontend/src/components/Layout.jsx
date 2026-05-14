import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";
import { BookingProvider } from '../context/BookingContext';
import BookingPanel from './booking/BookingPanel';

const Layout = () => (
  <BookingProvider> 
    <ScrollToTop />
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
  
      <BookingPanel />
    </div>
  </BookingProvider>
);

export default Layout;