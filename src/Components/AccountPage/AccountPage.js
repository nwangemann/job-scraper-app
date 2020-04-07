import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { submitUser, loggedIn } from "../../redux/reducer";
import "./AccountPage.scss";
import returnpng from "./return_arrow.png";

function AccountPage() {
  const user_id = useSelector(state => state.user.user_id);
  const yourEmail = useSelector(state => state.user.email);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayEmail, setDisplayEmail] = useState(yourEmail);
  const [changedPassword, setChangedPassword] = useState(false);
  const [thePasswordMessage, setThePasswordMessage] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const userPull = localStorage.getItem("user")
    console.log(userPull)
    if (userPull){
      dispatch(submitUser(JSON.parse(userPull)));
      dispatch(loggedIn());
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  })

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
          <img
            onClick={back}
            alt="returnimg"
            className="returnImg"
            src={returnpng}
          />
        </div>
        <div>
          <h1 className="yourEmail">Your Email: {displayEmail}</h1>
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
                className="accountInput"
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
                className="accountInput"
              />
              <input
                type="submit"
                className="submitButton"
                placeholder="Save Password"
              />
              <div className="messageContainer">
                {changedPassword && thePasswordMessage ? (
                  <p className="passwordMessage">
                    Changed Password Successfully
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountPage;
