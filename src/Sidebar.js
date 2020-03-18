import React from "react";
import { slide as Menu } from "react-burger-menu";
import app from "./base";
import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaTrophy, FaClipboardList, FaPen} from 'react-icons/fa';
import { MdAccountBox, MdDirectionsBike, MdSettings} from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

export default class Sidebar extends React.Component {
  state = {
    menuOpen: false
  };

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <Menu
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}>

        <Link onClick={() => this.closeMenu()} className="menu-item" to="/">
          <FaHome/> Home
        </Link>
        <Link onClick={() => this.closeMenu()} className="menu-item" to="/ride">
          <MdDirectionsBike/> Ride
        </Link>
        <Link onClick={() => this.closeMenu()} className="menu-item" to="/myrides">
          <FaClipboardList/> My Rides
        </Link>
        <Link onClick={() => this.closeMenu()} className="menu-item" to="/leaderboards">
          <FaTrophy/> Leaderboards
        </Link>
        <Link onClick={() => this.closeMenu()} className="menu-item" to="/myaccount">
          <MdAccountBox/> My Account
        </Link>
        <Link onClick={() => this.closeMenu()} className="menu-item" to="/settings">
          <MdSettings/> Settings
        </Link>
        <Link onClick={() => this.closeMenu()} className="menu-item" to="/about">
          <FaInfoCircle/> About
        </Link><br/><br/>
        <Link onClick={() => app.auth().signOut() > this.closeMenu()} className="menu-item" to="/login">
          <FiLogOut/> Sign In/Out
        </Link>
        <Link onClick={() => this.closeMenu()} className="menu-item" to="/signup">
          <FaPen/> Register
        </Link>
        </Menu>
    );
  }
}

