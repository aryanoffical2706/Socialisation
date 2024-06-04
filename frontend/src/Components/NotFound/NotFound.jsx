import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  
  return (
    <div className="not-found-container">
      <h1>Oops!</h1>
      <p>Error 404 - Page Not Found</p>
      <p>The page you requested could not be found. We're working on it 😊</p>
      <div className="image-container">
        <div className="boat">
          <div className="person"></div>
        </div>
        <div className="sharks">
          <div className="shark"></div>
          <div className="shark"></div>
          <div className="shark"></div>
          <div className="shark"></div>
        </div>
      </div>
      <Link to="/"><button className="home-button" >
        Go to Home
      </button></Link>
      
    </div>
  );
};

export default NotFound;
