import React from 'react';
import './WelcomeBanner.scss';
import { ReactComponent as WelcomeImage } from './asset/Image.svg'; // Import the SVG as a React component

const WelcomeBanner = ({user}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="welcome-banner">
      <div className="welcome-text">
        <p className="date">{currentDate}</p>
        <h1 className="greeting">Welcome back, {user?.name}</h1>
        <p className="subtext">Always stay updated in your student portal</p>
      </div>
      <div className="welcome-image">
        <WelcomeImage />
      </div>
    </div>
  );
};

export default WelcomeBanner;
