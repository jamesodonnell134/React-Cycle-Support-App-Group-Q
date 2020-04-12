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
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user_id = user.uid;
          if(account_created) {
            console.log("Account creation successful!")
            makeUser(email.value, user_id);
          }
        } else {
          console.log("User not set!!");
        }
      });

      this.props.history.push("/");
      account_created = true;



    } catch (error) {
      alert(error);
    }

    function makeUser(email, id){
      let database = firebase.database();
      let ref = database.ref('users/'+id)
      let data = {
        email: email,
        first_name: "Not set!",
        last_name: "Not set!",
        DOB: "Not set!",
        contact_number: "Not set!",
        residence: "Not set!",

      }
      ref.set(data);
      alert("Account created successfully!");

    }
  };




  render() {
    return <SignUpView onSubmit={this.SignUpHandler} />;
  }


}


export default withRouter(SignUpPage);
