import React from "react";
import { FaHome } from 'react-icons/fa';

export default () => {
  return (
    <div className="home">
      <h1><FaHome/> Home</h1>
      <h2>Group Q's Cycling Support App!</h2>
        <p>Please use the navigation menu on the left to work your way through the app.</p><br/>
        <p>Our app allows you to: </p>
        <ul>
            <li>One item</li>
            <li>One item</li>
            <li>One item</li>
            <li>One item</li>
        </ul>
    </div>
  );
};

