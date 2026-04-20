import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './Footer';

const Layout = () => (
  <div className="app-layout">
    <Header />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
