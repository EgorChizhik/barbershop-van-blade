import React from 'react';
import './PageTitle.scss';

const PageTitle = ({ title }) => {
  return (
    <div className="page-title">
      <div className="page-title__line page-title__line--left"></div>
      
      <div className="page-title__square">
        <div className="page-title__inner-frame"></div>
        
        <div className="page-title__content">
          <h2 className="page-title__text">{title}</h2>
          <div className="page-title__divider"></div>
          <div className="page-title__brand-name">Van Blade</div>
        </div>
      </div>

      <div className="page-title__line page-title__line--right"></div>
    </div>
  );
};

export default PageTitle;