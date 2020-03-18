import React from "react";
import { FaJs, FaCss3Alt, FaHtml5, FaInfoCircle, FaReact} from 'react-icons/fa';


export default () => {
  return (
    <div className="about">
        <h1><FaInfoCircle/> About</h1><br/>
        <h2>Languages used:</h2>
        <ul>
            <li>HTML5 <FaHtml5/></li>
            <li>CSS3 <FaCss3Alt/></li>
            <li>JavaScript <FaJs/></li>
        </ul>
        <h2>Frameworks used:</h2>
        <ul>
            <li>React App <FaReact/></li>
            <li>NPM API</li>
            <li>Add more here...</li>
        </ul>

    </div>
  );
};

