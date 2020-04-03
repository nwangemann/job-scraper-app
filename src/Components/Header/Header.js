import React from "react";
import {useSelector} from 'react-redux'
import "./Header.scss";
import { Link } from "react-router-dom";
import SubHeader from './SubHeader'

function Header(){
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  
    return (
      <div  className="stickyHeader">
        <Link className="links" to="/">Job Scraper</Link>
       
          
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
    );
}
export default Header;
