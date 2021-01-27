import { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthenticationService from '../api/AuthenticationService'

class AdminRoute extends Component {

    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            if (AuthenticationService.isAdminLogin()) {
                return <Route {...this.props} />
            }
            console.log("AdminRoute: User valid, but not an admin user. Redirecting to user home")
            return <Redirect to="/home" {...this.props} />
        } else {
            return <Redirect to="/login" />
        }
    }

}

export default AdminRoute