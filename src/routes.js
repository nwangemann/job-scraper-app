import React from 'react'
import {Switch, Route} from 'react-router-dom'
import SearchPage from './Components/SearchPage/SearchPage'
import SavedJobsPage from './Components/SavedJobsPage/SavedJobsPage'
import AccountPage from './Components/AccountPage/AccountPage'
import LoginPage from './Components/LoginPage/LoginPage'

export default(
    <Switch>
        <Route exact path="/" component={SearchPage}/>
        <Route path= '/saved_jobs' component={SavedJobsPage}/>
        <Route path= '/account' component={AccountPage}/>
        <Route path='/login' component={LoginPage}/>
    </Switch>
)