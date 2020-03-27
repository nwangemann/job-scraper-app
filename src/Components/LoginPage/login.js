import React, { Component } from 'react'
import axios from 'axios'
import {submitUser} from '../../redux/reducer'
import { connect } from 'react-redux'

 class login extends Component {
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
                <form onSubmit={e => {
                    e.preventDefault();
                    this.login(this.state.email, this.state.password)
                }}>
                    <input type="text" name="email" value={this.state.email} placeholder="Email"></input>
                    <input type="text" name="password" value={this.state.password} placeholder="Password"></input>
                    <input type="submit" value="login"/>
                    
                
                </form>
                
            </div>
        )
    }
}
const mapStateToProps = state => state;

const mapDispatchToProps = {
    submitUser
}
export default connect(mapStateToProps, mapDispatchToProps)(login)