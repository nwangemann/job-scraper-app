import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <Link className="links" to="/">Job Scraper</Link>
        <ul>
          <Link className="links" to="/account">Account</Link>
          <Link className="links" to="/saved_jobs">Saved</Link>
          <Link className="links" to="login">Login</Link>
        </ul>
      </header>
    );
  }
}
export default Header;
