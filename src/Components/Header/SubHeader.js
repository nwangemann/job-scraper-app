import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {logout} from '../../redux/reducer'



function SubHeader() {
    const dispatch = useDispatch();

    function logOut(){
        console.log('getting fired')
        axios.get('/auth/logout').catch(err => console.log(err))
        dispatch(logout());
    }

    return (
        <div>           
            <Link to='/account'>Account</Link>
            <Link className="links" to="/saved_jobs">Saved</Link>
            <Link onClick={logOut}to='/'>Logout</Link>
        </div>
    )
}
export default SubHeader