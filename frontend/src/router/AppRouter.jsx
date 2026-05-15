import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Services from '../pages/Services';
import ServiceDetail from '../pages/ServiceDetail';
import About from '../pages/About';
import Works from '../pages/Works';


import LegalLayout from '../pages/legal/LegalLayout';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';
import PersonalData from '../pages/legal/PersonalData';
import TermsOfService from '../pages/legal/TermsOfService';



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
      
      {
        element: <LegalLayout />,
        children: [
          { path: 'policy', element: <PersonalData /> },
          { path: 'terms', element: <TermsOfService /> },
          { path: 'privacy', element: <PrivacyPolicy /> },
        ],
      },
    ],
  },
]);

export default router;