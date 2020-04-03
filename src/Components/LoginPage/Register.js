import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { submitUser, switchToLogin, loggedIn } from "../../redux/reducer";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerFail, setRegisterFail] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  function registerSubmit(email, password) {
    let body = {
      email: email,
      password: password
    };
    axios
      .post("/auth/register", body)
      .then(res => {
        dispatch(submitUser(res.data));
        dispatch(loggedIn());
        history.push("/");
      })
      .catch(err => {
        setRegisterFail(true);
        console.log(err);
      });
  }

  return (
    <div>
      This is the register component
      <form
        onSubmit={e => {
          e.preventDefault();
          registerSubmit(email, password);
        }}
      >
        <input
          type="text"
          name="email"
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        ></input>
        <input
          type="text"
          name="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        ></input>
        {registerFail ? (
          <p>
            That email already exists. Please register with an alternate email
          </p>
        ) : null}
        <input type="submit" placeholder="Register" value="Register" />
      </form>
      <button onClick={() => dispatch(switchToLogin())}>Return to Login</button>
    </div>
  );
}

export default Register;
