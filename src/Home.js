import React from "react";
import { FaHome } from 'react-icons/fa';

export default () => {
    return (
    <div className="home">
      <h1><FaHome/>Home</h1>
      <h2>Group Q's Cycling Support App!</h2>
        <p>Please use the navigation menu on the left to work your way through the app.</p><br/>
        <p>Our app allows you to: </p>
        <ul>
            <li>Measure ride distances/times.</li>
            <li>View your rides.</li>
            <li>Compare your rides on a leaderboard.</li>
        </ul>
    </div>
  );
};

