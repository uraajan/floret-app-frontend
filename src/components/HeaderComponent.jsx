import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AuthenticationService from '../api/AuthenticationService';
import * as actionTypes from '../store/constants';

class HeaderComponent extends Component {

    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout() {
        console.log("HeaderComponent: logout")
        AuthenticationService.logout(this.props.username)
            .then(response => {
                console.log(response.data)
                AuthenticationService.logoutComplete()
                this.props.logout()
                this.props.history.push("/logout")
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log("logout: error.response.data:", error.response.data)
                } else if (error.message) {
                    console.log("logout: error.message:", error.message)
                }
            })
        
        
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    {
                        AuthenticationService.isUserLoggedIn() && AuthenticationService.isAdminLogin()
                            ? <div><Link to="/admin-home" className="navbar-brand">Floret</Link></div>
                            : <div><Link to="/home" className="navbar-brand">Floret</Link></div>
                    }
                    
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!AuthenticationService.isUserLoggedIn() && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {AuthenticationService.isUserLoggedIn() && <li><span className="nav-link disabled">Welcome {this.props.firstName + " " + this.props.lastName}!</span></li>}
                        {AuthenticationService.isUserLoggedIn() && !AuthenticationService.isAdminLogin() && <li><Link className="nav-link" to="/cart">Cart</Link></li>}
                        {AuthenticationService.isUserLoggedIn() && !AuthenticationService.isAdminLogin() && <li><Link className="nav-link" to="/orders">Orders</Link></li>}
                        {AuthenticationService.isUserLoggedIn() && !AuthenticationService.isAdminLogin() && <li><Link className="nav-link" to="/profile">Profile</Link></li>}
                        {AuthenticationService.isUserLoggedIn() && AuthenticationService.isAdminLogin() && <li><Link className="nav-link" to="/admin-orders">Orders</Link></li>}
                        {AuthenticationService.isUserLoggedIn() && AuthenticationService.isAdminLogin() && <li><Link className="nav-link" to="/admin-add-edit">Add Product</Link></li>}
                        {AuthenticationService.isUserLoggedIn() && <li><Link className="nav-link" to="/logout" onClick={this.logout}>Logout</Link></li>}
                    </ul>
                </nav>
                
            </header>
        )
    }
}

const mapStateToProps = globalStore => {
    return {
        username: globalStore.username,
        firstName: globalStore.firstName,
        lastName: globalStore.lastName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({type: actionTypes.LOGOUT_USER})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)