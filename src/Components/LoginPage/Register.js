import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {submitUser, switchToLogin} from '../../redux/reducer'

function Register (){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerFail, setRegisterFail] = useState(false)

    // useHistory makes the const "history" into the functional component equivalent of (this.props.history)
    const history = useHistory()

    // useDispatch is the equivalent of "mapDispatchToProps", the const dispatch will be invoked with the dispatched function inside of it
    const dispatch = useDispatch()

    // useSelector is the way to bring state from redux into the local state with hooks. for example, const user = useSelector(state => state.user)    this brings in the state from redux and makes it available to use. We aren't using it right now for this component. 


    function registerSubmit(email, password){
        let body = {
            email: email,
            password: password
        }

        console.log('history', history)
  
        axios.post('/auth/register', body).then(res => {
            dispatch(submitUser(res.data));
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
               <form onSubmit={e => {
                    e.preventDefault();
                    registerSubmit(email, password)
                }}>
                    <input type="text" name="email" onChange={e => setEmail(e.target.value)} placeholder="Email"></input>
                    <input type="text" name="password" onChange={e => setPassword(e.target.value)} placeholder="Password"></input>
                    {
                        registerFail ?
                        <p>That email already exists. Please register with an alternate email</p>
                        :
                        null
                    }
                    <input type="submit" placeholder="Register" value="Register"/>
                
                </form>
                <button
                onClick={() => dispatch(switchToLogin())}
                >Switch back to the login component</button>
        </div>
    )
}

export default Register
