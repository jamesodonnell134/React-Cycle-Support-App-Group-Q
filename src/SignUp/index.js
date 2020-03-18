import React, { Component } from "react";
import { withRouter } from "react-router";
import SignUpView from "./SignUpView";
import app from "../base";

class SignUpPage extends Component {
  SignUpHandler = async event => {
    // Don't reload, get target form
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <SignUpView onSubmit={this.SignUpHandler} />;
  }
}

export default withRouter(SignUpPage);
