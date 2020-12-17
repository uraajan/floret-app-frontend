import { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthenticationService from '../api/AuthenticationService'

class UnauthenticatedRoute extends Component {

    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/home" />
        }       
    }

}

export default UnauthenticatedRoute