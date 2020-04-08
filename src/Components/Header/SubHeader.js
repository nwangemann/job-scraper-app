import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducer";
import "./Header.scss";

function SubHeader() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const dispatch = useDispatch();

  function logOut() {
    axios.get("/auth/logout").catch((err) => console.log(err));
    dispatch(logout());
  }

  return (
    <div>
      <div className="webShow">
        <Link className="links" to="/account">
          Account
        </Link>
        <Link className="links" to="/saved_jobs">
          Saved
        </Link>
        <Link className="links" onClick={logOut} to="/">
          Logout
        </Link>
      </div>

      <div className="buttondiv">
        <img
          className="menuButton"
          alt="hamburger"
          src="https://i.ya-webdesign.com/images/3-bar-menu-png-1.png"
          onClick={() => setToggleMenu(!toggleMenu)}
        />
      </div>
      <div
        className={toggleMenu ? "menu_background_show" : "mobile-menu-hide"}
        onClick={(e) => {
          if (e.target.className === "menu_background_show") {
            setToggleMenu(true);
          }
        }}
      >
        <nav className="menu_show">
          <Link className="links" to="/account">
            Account
          </Link>
          <Link className="links" to="/saved_jobs">
            Saved
          </Link>
          <Link className="links" onClick={logOut} to="/">
            Logout
          </Link>
        </nav>
      </div>
    </div>
  );
}
export default SubHeader;
