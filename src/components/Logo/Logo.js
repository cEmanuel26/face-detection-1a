import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt"
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner">
          <img src={logo} alt="logo"></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
