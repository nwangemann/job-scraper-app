import React from 'react'
import { useSelector } from "react-redux";
import Login from './Login'
import Register from './Register'

export default function LoginPage (){
    const loginView = useSelector(state => state.loginView)
        return (
            <div>
                {
                    loginView 
                    ?
                    <Login />
                    :
                    <Register /> 
                }
            </div>
        )
}

