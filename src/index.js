import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./Sidebar";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./Home";
import Ride from "./Ride";
import MyRides from "./MyRides";
import Leaderboards from "./Leaderboards";
import MyAccount from "./MyAccount";
import About from "./About";
import Settings from "./Settings";
import Logout from "./Logout";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar />
        <div id="page-wrap">
          <h1>Cycling Support App</h1>
        </div>
      </div>
      <Route path="/home" component={Home} />
      <Route path="/ride" component={Ride} />
      <Route path="/myrides" component={MyRides} />
      <Route path="/leaderboards" component={Leaderboards} />
      <Route path="/myaccount" component={MyAccount} />
      <Route path="/settings" component={Settings} />
      <Route path="/about" component={About} />
      <Route path="/logout" component={Logout} />


    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
    <App />, rootElement);

