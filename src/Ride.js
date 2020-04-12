import React from "react";
import "./styles.css";
import firebase from "firebase";
let database = firebase.database();
let formattedTime = 0;
let formattedDistance = 0;
let newScore = 0;
let dist = 0;
let p = 0;


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
let resetScore = 0;
let user_id = "null";
let resetDistance = 0;
let geolocation = true, curPos, oldPos;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        user_id = user.uid;
    } else {
        console.log("User not set!!");
    }
});

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);

        this.handleStopClick = this.onStopClick.bind(this);
        this.handleResetClick = this.onResetClick.bind(this);

        this.state = {
            time: 0,
            distance: 0,
            condition: true
        };
    }

    tick() {
        let newState = Object.assign({}, this.state);
        newState.time = newState.time + 1;
        this.setState(newState);
        if(this.state.time % 20 === 0) {
            this.updatePosition();
        }
    }

    onLocation(){
        function getPosition(pos){
            curPos = pos.coords;
            oldPos = pos.coords;
            geolocation = true;
        }
        if(navigator.geolocation) {
            console.log("Geolocation supported");
            this.onStartClick();
            navigator.geolocation.getCurrentPosition(getPosition, function (error) {
                console.log("Error occurred. Error code: " + error.code);
                geolocation = false;
            });
        }else{
            console.log("Location not supported");
            geolocation = false;
        }
    }

    updatePosition(){
        navigator.geolocation.watchPosition(function(position){

            function addDist(lat1, lon1, lat2, lon2){
                p+=1;
                let R = 6371000; //Earth's radius in m.
                let rLat1 = degToRad(lat1);
                let rLat2 = degToRad(lat2);
                let deltaLat = degToRad(lat2-lat1);
                let deltaLon = degToRad(lon2-lon1);
                let a = (Math.sin(deltaLat/2)) * (Math.sin(deltaLat/2))  + Math.cos(rLat1) * Math.cos(rLat2) * (Math.sin(deltaLon/2)) * (Math.sin(deltaLon/2));
                //let cc = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                let c = 2 * Math.asin(Math.min(1, Math.sqrt(a)));
                

                dist = dist  + (R * c);
                //dist = dist/1000;


                // let newState = Object.assign({}, this.state);
                // newState.distance = newState.distance + R*c;
                // this.setState(newState);
            }

            function degToRad(degrees){
                return degrees*(Math.PI/180);
            }

            oldPos = curPos;

            curPos = position.coords;
            let oldPosLat = oldPos.latitude;
            let oldPosLon = oldPos.longitude;
            let curPosLat = curPos.latitude;
            let curPosLon = curPos.longitude;

            addDist(oldPosLat, oldPosLon, curPosLat, curPosLon);

        }, function(error){
            alert("error in inc distance" + error.code);
        });
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
        resetDistance = formattedDistance;
        resetScore = newScore;
        this.onStopClick();

        let newState = Object.assign({}, this.state);
        newState.time = 0;
        newState.distance = 0;
        newState.condition = true;
        this.setState(newState);

        resetVar = true;
    }


    onYesClick(time, distance, score) {
        let ref = database.ref('myrides/' + user_id);
        let data = {
            time: time,
            distance: distance,
            score: score
        };
        console.log(user_id);
        ref.push(data);
        alert("Ride saved to My Rides!");

    }
    onNoClick(){
        let newState = Object.assign({}, this.state);
        newState.condition = true;
        this.setState(newState);

        resetVar = false;
    }


    render() {

        let hours = Math.floor(this.state.time / 36000);
        let minutes = Math.floor((this.state.time - (hours * 36000)) / 600);
        let seconds = Math.floor((this.state.time - (hours * 36000) - (minutes * 600))/10);
        let tenths = this.state.time - (hours * 36000) - (minutes * 600) - (seconds * 10);
        let dbTime = formattedTime;
        formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}.${tenths}`;

        let kilometers = Math.floor(dist/1000);
        let meters = Math.floor(dist-(kilometers*1000));
        let dbDistance = formattedDistance;
        formattedDistance = `${kilometers < 10 ? "0" + kilometers : kilometers}.${meters < 10 ? "00" + meters : meters < 100 ? "0" + meters : meters} km`;

        let speed = (dist * 1000)/(this.state.time/10);
        let dbScore = newScore;
        newScore = Math.round((dist * 1000) + speed*150);

        return (


            <div className="timer well">
                <h1 className="time">{formattedTime}</h1>
                <h1 className={ geolocation ? "hidden" : "display"}>Geolocation not supported.</h1><br/>
                <h1 className={ geolocation ? "distance" : "hidden"}>{formattedDistance}</h1>
                <div className="btn-group">
                    <button className={ this.state.condition ? "button btn" : "hidden" } onClick={() => this.onLocation()}>Ride</button>
                    <button className={ this.state.condition ? "hidden" : "button btn " } onClick={this.handleStopClick}>Pause</button>
                    <button className={ resetVar ? "hidden" : "red btn" } onClick={this.handleResetClick}>Finish</button>
                </div><br/>
                <p className={ resetVar ? "display" : "hidden" }>Your last time is: </p>
                <p className={ resetVar ? "display" : "hidden" }>{resetTime} </p>
                <p className={ resetVar ? "display" : "hidden" }>Your last distance is: </p>
                <p className={ resetVar ? "display" : "hidden" }>{resetDistance} </p>
                <p className={ resetVar ? "display" : "hidden" }>Your last score is: </p>
                <p className={ resetVar ? "display" : "hidden" }>{resetScore}</p>
                <p className={ resetVar ? "display" : "hidden" }>Save your ride to My Rides?
                    <button onClick={() =>this.onYesClick(dbTime, dbDistance, dbScore) > this.onNoClick()}>Yes</button>
                    <button onClick={() =>this.onNoClick()}>No</button>
                </p>

            </div>
        );
    }
}