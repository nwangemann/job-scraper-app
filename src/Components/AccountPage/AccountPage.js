import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AccountPage.css";
import returnpng from "./return_arrow.png";

function AccountPage() {
  const user_id = useSelector(state => state.user.user_id);
  const yourEmail = useSelector(state => state.user.email);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayEmail, setDisplayEmail] = useState(yourEmail);
  const [changedPassword, setChangedPassword] = useState(false);
  const [thePasswordMessage, setThePasswordMessage] = useState(false);

  const history = useHistory();

  function changeEmail() {
    let body = { email: email };
    axios
      .put(`/auth/edit_email/${user_id}`, body)
      .then(res => {
        setDisplayEmail(res.data[0].email);
      })
      .catch(err => console.log(err));
  }
  function changePassword() {
    let body = { password: password };
    axios
      .put(`/auth/edit_password/${user_id}`, body)
      .then(res => {
        setChangedPassword(true);
      })
      .catch(err => console.log(err));
  }
  function back() {
    history.push("/");
  }
  function passwordMessage() {
    setThePasswordMessage(true);

    setTimeout(function() {
      setThePasswordMessage(false);
    }, 2000);
  }
  return (
    <div className="outerDiv">
      <div className="accountContainer">
      
          <div className="settingDiv">
            <p className="accountSettings">Account Settings</p>
            {/* <button onClick={back}>Back</button> */}
            {/* <img className="returnImg" onClick={back} src="https://img.icons8.com/carbon-copy/100/000000/return.png"/> */}
            <img
              onClick={back}
              alt="returnimg"
              className="returnImg"
              src={returnpng}
            />
          </div>
          <div>
            <h1 className="yourEmail">Your Email:{displayEmail}</h1>
          </div>
    
        <div className="formDiv">
          <div>
            <form
              className="emailForm"
              onSubmit={e => {
                e.preventDefault();
                changeEmail();
              }}
            >
              <h1 className="changeText">Change Email:</h1>
              <input
                type="email"
                name="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="New Email"
              />
              <input
                type="submit"
                className="submitButton"
                placeholder="Save Email"
              />
            </form>
          </div>
          <div>
            <form
              className="passwordForm"
              onSubmit={e => {
                e.preventDefault();
                changePassword();
                passwordMessage();
              }}
            >
              <h1 className="changeText">Change Password:</h1>
              <input
                type="password"
                name="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="New Password"
              />
              <input
                type="submit"
                className="submitButton"
                placeholder="Save Password"
              />
            </form>
          </div>
          <div className="messageContainer">
            {changedPassword && thePasswordMessage ? (
              <p className="passwordMessage">Changed Password Successfully</p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountPage;
