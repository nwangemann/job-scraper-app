import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AccountPage.css";
import returnpng from './return_arrow.png'

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
        <img  onClick={back} alt="returnimg" className="returnImg" src={returnpng}/>
        </div>



        <div className="formDiv">
        <p className="email">Email:{displayEmail}</p>

        <form
          className="emailForm"
          onSubmit={e => {
            e.preventDefault();
            changeEmail();
          }}
        >
          <div>
            <input
              type="email"
              name="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="New Email"
            />
            <input type="submit" placeholder="Save Email" />
          </div>
        </form>
        <form
          className="passwordForm"
          onSubmit={e => {
            e.preventDefault();
            changePassword();
            passwordMessage();
          }}
        >
          <div>
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="New Password"
          />
          <input type="submit" placeholder="Save Password" />
          </div>
          <div className="messageContainer">
            {changedPassword && thePasswordMessage ? (
              <p className="passwordMessage">Changed Password Successfully</p>
            ) : <p></p>}
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
export default AccountPage;