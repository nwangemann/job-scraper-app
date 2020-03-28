import React from "react";
import {useSelector} from 'react-redux'
import "./Header.css";
import { Link } from "react-router-dom";
import SubHeader from './SubHeader'

function Header(){
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  
    return (
      <header>
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
        
      </header>
    );
}
export default Header;
