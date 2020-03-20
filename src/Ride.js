import React, { Component } from "react";
import "./styles.css";

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

let formattedTime = 0;
let resetVar = false;
let resetTime = 0;

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
            this.interval = setInterval(this.tick.bind(this), 1000);
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

    render() {
        let hours = Math.floor(this.state.time / 3600);
        let minutes = Math.floor((this.state.time - (hours * 3600)) / 60);
        let seconds = this.state.time - (hours * 3600) - (minutes * 60);
        formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        return (
            <div className="timer well">
                <p className="time">{formattedTime}</p>
                <p className="btn-group">
                    <button className={ this.state.condition ? "button btn" : "hidden" } onClick={this.handleStartClick}>Start</button>
                    <button className={ this.state.condition ? "hidden" : "button btn " } onClick={this.handleStopClick}>Pause</button>
                    <button className="red btn" onClick={this.handleResetClick}>Reset</button>
                </p>
                <p className={ resetVar ? "display" : "hidden" }>Your last time is: </p>
                <p className={ resetVar ? "display" : "hidden" }>{resetTime} </p>
                <p className={ resetVar ? "display" : "hidden" }>Do you want to save it to your progress?
                    <button>Yes</button>
                    <button>No</button>
                </p>

            </div>
        );
    }
}




