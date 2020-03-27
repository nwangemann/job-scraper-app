import React, { Component } from 'react'
import axios from 'axios'
import {submitUser, switchToRegister } from '../../redux/reducer'
import { connect } from 'react-redux'

 class Login extends Component {
     constructor(props){
         super(props)
         this.state = {
             email: '', 
             password: '',
             loggedInFailed: false
         }
     }

    login = (email, password) => {
        let body = { email, password}
        axios.post('/auth/login', body)
        .then( res => {
            this.props.submitUser(res.data);
            this.props.history.push('/')
        }).catch(err => {
            this.setState({
                loggedInFailed: true
            })
        })
    }
    render() {
        return (
            <div>
                This is the login component
                <form onSubmit={e => {
                    e.preventDefault();
                    this.login(this.state.email, this.state.password)
                }}>
                    <input type="text" name="email" value={this.state.email} placeholder="Email"></input>
                    <input type="text" name="password" value={this.state.password} placeholder="Password"></input>
                    <input type="submit" placeholder="Login" value="login"/>
                    
                
                </form>
                <button
                onClick={this.props.switchToRegister}
                >Switch to register</button>
            </div>
        )
    }
}
const mapStateToProps = state => state;

const mapDispatchToProps = {
    submitUser,
    switchToRegister
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)