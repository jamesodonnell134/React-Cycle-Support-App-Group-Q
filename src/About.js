import React from "react";
import { FaInfoCircle } from 'react-icons/fa';


export default () => {
  return (
    <div className="about">
        <h1><FaInfoCircle/> About</h1><br/>
        <h2>Languages used:</h2>
        <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
        </ul>
        <h2>Frameworks used:</h2>
        <ul>
            <li>React App</li>
            <li>NPM API</li>
            <li>Add more here...</li>
        </ul>

    </div>
  );
};

