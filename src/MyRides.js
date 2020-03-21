import React from "react";
import ReactDOM from 'react-dom'
import { FaClipboardList } from 'react-icons/fa';
import firebase from "firebase";
let user_id = null;

export default () => {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user_id = user.uid;
        } else {
            console.log("User not set!!");
        }
    });

    return (
        <div className="myrides">
            <h1><FaClipboardList/> My Rides</h1>
            <button className={"grd"} onClick={() =>onGetDataClick()}>Get Ride Data</button>
            <div id="data">
                <li></li>
            </div>
        </div>


);

    function onGetDataClick(){
        let database = firebase.database();
        let ref = database.ref('myrides/'+user_id)
        ref.on('value', gotData, errData())
    }


    function gotData(data) {
        let values = data.val();
        console.log(values)
        if(values === null){
            console.log("No stored data!")
            ReactDOM.render(
                <p className={"dataErr"}>You do not have any saved rides!</p>,
                document.getElementById('data')
            );
        }

        else {
            let keys = Object.keys(values);
            let myrides = [];
            myrides.push("Distance : Time")
            myrides.push(<br/>);

            for (let i = 0; i < keys.length; i++) {
                let k = keys[i];
                let distance = values[k].distance;
                let time = values[k].time
                myrides.push(distance + " : " + time);
            }

            const listItems = myrides.map((myrides) =>
                <li className={"myRidesLi"}>{myrides}</li>
            );


            ReactDOM.render(
                <ul className={"myRidesUl"}>{listItems}</ul>,
                document.getElementById('data')
            );
        }
    }


    function errData(err) {
        console.log("Error!")
        console.log(err);
    }


};

