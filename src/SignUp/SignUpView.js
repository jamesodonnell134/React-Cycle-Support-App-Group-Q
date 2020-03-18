import React from "react";
import { FaPen } from 'react-icons/fa';

const SignUpView = ({ onSubmit }) => {
  return (
      <div className="loginview"><br/>
        <h1>Register <FaPen/></h1>
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
        <p>Or select <strong>'Sign In/Out'</strong> on the side menu.</p><br/>
      </div>
  );
};

export default SignUpView;
