import React from "react";
import { MdAccountBox } from 'react-icons/md';
import firebase from "firebase";
let user_id, last_name, contact_number, residence, DOB, first_name = "";
let email = "unset";
let resetVar = false;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        user_id = user.uid;
    } else {
        console.log("User not set!!");
    }
});

const asyncOperation = () => new Promise(resolve => setTimeout(resolve, 1000))

    class MyAccount extends React.Component {

        constructor() {
            super()

            this.state = {
                loading: false,
                email: "",
                first_name: "",
                last_name : "",
                DOB : "",
                contact_number : "",
                residence : ""
            }

            this.initialiseDB();
            this.handleClick = this.handleClick.bind(this)
        }

        handleClick() {
            this.setState({loading: true})

            asyncOperation()
                .then(() => {
                    console.log('Current state value:', this.state.first_name)
                    resetVar = true;

                    this.setState({
                        loading: false,
                        counter: this.state.counter + 1,
                        first_name : first_name,
                        last_name : last_name,
                        email : email,
                        DOB : DOB,
                        contact_number : contact_number,
                        residence : residence,

                    }, () => {
                        console.log('New state value:', this.state.email)
                    })
                })
        }

        initialiseDB(){
            let database = firebase.database();
            let ref = database.ref("users/"+user_id);
            ref.on('value', this.getData)
        }

        getData(data){
            let values = data.val();
            if(values === null){
                console.log("Not got the data yet...");
            }
            else {
                console.log("Got the data!")
                email = values.email;
                first_name = values.first_name;
                last_name = values.last_name;
                contact_number = values.contact_number;
                residence = values.residence;
                DOB = values.DOB;
            }
        }

        render() {

            return (

                <form onSubmit={this.handleSubmit}>
                    <div className="myrides">

                    <h1><MdAccountBox/> My Account</h1>

                        <button onClick={this.handleClick}>Refresh</button>
                        {this.state.loading && <p>Downloading...</p>}

                        <p className={ resetVar ? "display" : "hidden" }>E-mail: {this.state.email}<br/></p>
                        <label className={ resetVar ? "display" : "hidden" }>First name: <input type="text" value={this.state.first_name} onChange={this.handleChange}/><br/></label>
                        <label className={ resetVar ? "display" : "hidden" }>Last name: <input type="text" value={this.state.last_name} onChange={this.handleChange}/><br/></label>
                        <label className={ resetVar ? "display" : "hidden" }>DOB: <input type="text" value={this.state.DOB} onChange={this.handleChange}/><br/></label>
                        <label className={ resetVar ? "display" : "hidden" }>Contact no: <input type="text" value={this.state.contact_number} onChange={this.handleChange}/><br/></label>
                        <label className={ resetVar ? "display" : "hidden" }>Residence: <input type="text" value={this.state.residence} onChange={this.handleChange}/><br/></label>

                      <br/>
                    <input type="submit" value="Submit"/>
                    </div>
                </form>
            );
        }
        handleChange(event) {
            this.setState({
                last_name: event.target.email,
                first_name : event.target.first_name
            });
        }

        handleSubmit(event) {
            //alert('A name was submitted: ' + this.state.email);
            /*
             firebase.database().ref('users/' + userId).set({
                    username: this.state.value,
                    email: email,
                    profile_picture : imageUrl
                });*/

            event.preventDefault();
        }


    }



export default MyAccount;
