import React from "react";
import "./styles.css";
import firebase from "firebase";
let database = firebase.database();
let formattedTime = 0;

export default () => {

    return (
        <div className="ride">
            <br/><p>This is the Ride Component</p>
            <div className="ride">
                <div className="App">
                    <Stopwatch />
                </div>
            </div>

        </div>

    );
}

let resetVar = false;
let resetTime = 0;
let user_id = "null";

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        user_id = user.uid;
    } else {
        console.log("User not set!!");
    }
});

class Stopwatch extends React.Component {
    constructor() {
        super();

        this.handleStartClick = this.onStartClick.bind(this);
        this.handleStopClick = this.onStopClick.bind(this);
        this.handleResetClick = this.onResetClick.bind(this);

        this.state = {
            time: 0,
            condition: true
        };
    }

    tick() {
        let newState = Object.assign({}, this.state);
        newState.time = newState.time + 1;
        this.setState(newState);
    }


    onStartClick() {
        if (!this.interval) {
            this.interval = setInterval(this.tick.bind(this), 100);
            // eslint-disable-next-line react/no-direct-mutation-state

        }
        let newState = Object.assign({}, this.state);
        newState.condition = false;
        this.setState(newState);
    }

    onStopClick() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        // eslint-disable-next-line react/no-direct-mutation-state
        let newState = Object.assign({}, this.state);
        newState.condition = true;
        this.setState(newState);
    }

    onResetClick() {

        resetTime = formattedTime;
        this.onStopClick();

        let newState = Object.assign({}, this.state);
        newState.time = 0;
        newState.condition = true;
        this.setState(newState);

        resetVar = true;
    }


    onYesClick(time) {
        let ref = database.ref('myrides/' + user_id)
        let data = {
            time: time,
            distance: 0
        }
        ref.push(data);
        alert("Ride saved to My Rides!")

         }




    render() {

        let hours = Math.floor(this.state.time / 36000);
        let minutes = Math.floor((this.state.time - (hours * 36000)) / 600);
        let seconds = Math.floor((this.state.time - (hours * 36000) - (minutes * 600))/10);
        let tenths = this.state.time - (hours * 36000) - (minutes * 600) - (seconds * 10);
        let dbTime = formattedTime;
        formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}.${tenths}`;

        return (


            <div className="timer well">
                <p className="time">{formattedTime}</p>
                <div className="btn-group">
                    <button className={ this.state.condition ? "button btn" : "hidden" } onClick={this.handleStartClick}>Start</button>
                    <button className={ this.state.condition ? "hidden" : "button btn " } onClick={this.handleStopClick}>Pause</button>
                    <button className="red btn" onClick={this.handleResetClick}>Finish</button>
                </div><br/>
                <p className={ resetVar ? "display" : "hidden" }>Your last time is: </p>
                <p className={ resetVar ? "display" : "hidden" }>{resetTime} </p>
                <p className={ resetVar ? "display" : "hidden" }>Save your ride to My Rides?
                    <button onClick={() =>this.onYesClick(dbTime)}>Yes</button>
                    <button>No</button>
                </p>

            </div>
        );
    }
}




