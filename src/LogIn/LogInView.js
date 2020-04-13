import React from "react";
import { FiLogIn } from 'react-icons/fi';
import "../styles.css";

const LogInView = ({ onSubmit }) => {
  return (
    <div className="loginview"><br/>
      <h1>Log in <FiLogIn/></h1>
      <form onSubmit={onSubmit}>
        <label className="loginlogoutlabel">
          Email:<br/>
          <input
            name="email"
            type="email"
            placeholder="Enter your e-mail"
            className="loginlogoutinput"
          />
        </label><br/>
        <label className="loginlogoutlabel">
          Password:<br/>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="loginlogoutinput"
          />
        </label><br/>
        <button className="loginlogoutbutton" type="submit">Log in</button>
      </form><br/>
      <p>Or select <strong>'Register'</strong> on the side menu.</p><br/>
    </div>
  );
};

export default LogInView;
