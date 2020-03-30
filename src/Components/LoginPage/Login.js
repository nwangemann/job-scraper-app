import React, { useState } from 'react'
import axios from 'axios'
import {submitUser, switchToRegister, loggedIn } from '../../redux/reducer'
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'

 function Login()  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInFailed, setLoggedInFailed] = useState(false);


    const dispatch = useDispatch();

    const history = useHistory();

    function loginSubmit(email, password){
        let body = { email, password}
        axios.post('/auth/login', body)
        .then( res => {
            dispatch(submitUser(res.data));
            dispatch(loggedIn());
            history.push('/')
        }).catch(err => {
            setLoggedInFailed(true)
        })
    }
   
        return (
            <div>
                This is the login component
                <form onSubmit={e => {
                    e.preventDefault();
                    loginSubmit(email, password)
                }}>
                    <input onChange={e => setEmail(e.target.value)}type="text" name="email" placeholder="Email"></input>
                    <input onChange={e => setPassword(e.target.value)} type="text" name="password" placeholder="Password"></input>

                    {
                        loggedInFailed
                        ?
                        <p>Incorrect Email and/or Password</p>
                        :
                        null
                    }

                    <input type="submit" placeholder="Login" value="login"/>
                    
                
                </form>
                <button
                onClick={() => dispatch(switchToRegister())}
                >Switch to register</button>
            </div>
        )
    }


export default Login