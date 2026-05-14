import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Services from '../pages/Services';
import ServiceDetail from '../pages/ServiceDetail';
import About from '../pages/About';
import Works from '../pages/Works';
import LegalPage from '../pages/LegalPage';

const router = createBrowserRouter([
  {
    
    path: '/',
    element: <Layout />,
    children: [
      
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:slug', element: <ServiceDetail /> },
      { path: 'about', element: <About /> },
      { path: 'works', element: <Works /> },
      { path: 'policy', element: <LegalPage type="policy" /> },
      { path: 'terms', element: <LegalPage type="terms" /> },
      { path: 'privacy', element: <LegalPage type="privacy" /> },
    ],
  },
]);

export default router;