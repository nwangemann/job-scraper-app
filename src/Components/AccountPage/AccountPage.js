import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function AccountPage() {
  const user_id = useSelector(state => state.user.user_id);
  const yourEmail = useSelector(state => state.user.email);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayEmail, setDisplayEmail] = useState(yourEmail);
  const [changedPassword, setChangedPassword] = useState(false);

  const history = useHistory();

  function changeEmail() {
    console.log("user_id = ", user_id);
    let body = { email: email };
    axios
      .put(`/auth/edit_email/${user_id}`, body)
      .then(res => {
        console.log("before setDisplay", res);
        setDisplayEmail(res.data[0].email);
        console.log("after setDisplay", res);
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
  return (
    <div>
        <button onClick={back}>Back</button>
      <div>{displayEmail}</div>
      <form
        onSubmit={e => {
          e.preventDefault();
          changeEmail();
        }}
      >
        <input
          type="email"
          name="email"
          onChange={e => setEmail(e.target.value)}
          placeholder="New Email"
        ></input>
        <input type="submit" placeholder="Save Email"/>
      </form>
      <form
        onSubmit={e => {
          e.preventDefault();
          changePassword();
        }}
      >
        <input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="New Password"
        ></input>
        <input type="submit" placeholder="Save Password" />
        <div>{changedPassword ? <p>Changed Password Successfully</p> : null}</div>
      </form>
      
    </div>
  );
}
export default AccountPage;
