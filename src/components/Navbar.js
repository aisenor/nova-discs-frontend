// frontend/src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false)

    const handleMenuClick = () => {
        setIsMobile(!isMobile);
    }

    const handleHomeClick = () => {
        setIsMobile(false);
    }

  return (
      <nav className={`navbar ${isMobile ? 'mobile' : ''}`}>
          <h1 onClick={handleHomeClick}><Link to="/">NovaDiscs</Link></h1>
          <div className="menu-icon" onClick={handleMenuClick}>
              <div className={`bar ${isMobile ? 'open' : ''}`}/>
              <div className={`bar ${isMobile ? 'open' : ''}`}/>
              <div className={`bar ${isMobile ? 'open' : ''}`}/>
          </div>
          <ul className={`nav-list ${isMobile ? 'mobile' : ''}`}>
              <li className="nav-item" onClick={handleMenuClick}><Link to="/standings">Standings</Link></li>
              <li className="nav-item" onClick={handleMenuClick}><Link to="/scorecard">Scorecard</Link></li>
              <li className="nav-item" onClick={handleMenuClick}><Link to="/players">Players</Link></li>
          </ul>
      </nav>
  )
}

export default Navbar
