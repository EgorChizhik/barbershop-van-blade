import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Services from '../pages/Services';
import ServiceDetail from '../pages/ServiceDetail';
import About from '../pages/About';
import Works from '../pages/Works';

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
    ],
  },
]);

export default router;