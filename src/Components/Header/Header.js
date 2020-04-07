import React from "react";
import {useSelector} from 'react-redux'
import "./Header.scss";
import { Link } from "react-router-dom";
import SubHeader from './SubHeader'

function Header(){
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  
    return (
      <div  className="stickyHeader">
        <div className="headerEnclosure">    
        <div className="titleText">
          <Link id="Title" to="/">Get Busy</Link>
        </div>
         
        <div>
          {
            isLoggedIn
            ?
            <SubHeader/>
            :
            <Link className="links" to="login">Login</Link>
          }
        </div>
        </div>
      </div>
    );
}
export default Header;
