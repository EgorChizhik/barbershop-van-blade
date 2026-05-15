import React from 'react';
import { Outlet } from 'react-router-dom';
import './LegalPage.scss';

const LegalLayout = () => {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <Outlet />
      </div>
    </div>
  );
};

export default LegalLayout;