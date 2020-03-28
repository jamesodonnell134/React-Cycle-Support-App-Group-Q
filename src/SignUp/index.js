import React, { Component } from "react";
import { withRouter } from "react-router";
import SignUpView from "./SignUpView";
import app from "../base";
import firebase from "firebase";
let user_id = null;
let account_created = false;


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
      account_created = true;

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user_id = user.uid;
          if(account_created) {
            makeUser(email.value);
          }
        } else {
          console.log("User not set!!");
        }
      });

    } catch (error) {
      alert(error);
    }

    function makeUser(email){
      let database = firebase.database();
      let ref = database.ref('users/'+user_id)
      let data = {
        email: email,
        first_name: "First name",
        last_name: "Last name",
        DOB: "00/00/0000",
        contact_number: "Last name",
        residence: "Residence",

      }
      ref.set(data);
      alert("User created successfully!!");

    }
  };




  render() {
    return <SignUpView onSubmit={this.SignUpHandler} />;
  }


}


export default withRouter(SignUpPage);
