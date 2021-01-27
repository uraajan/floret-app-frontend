import { Component } from 'react'
import { connect } from 'react-redux'
import AdminService from '../api/AdminService'
import AuthenticationService from '../api/AuthenticationService';
import UserService from '../api/UserService';
import * as actionTypes from '../store/constants';

class AdminLoginComponent extends Component {

    constructor() {
        super()

        this.state = {
            password: "",
            loginFailure: ""
        }

        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.adminLogin = this.adminLogin.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.validateUserInputs = this.validateUserInputs.bind(this)
        this.getUserByUsername = this.getUserByUsername.bind(this)
    }

    handlePasswordChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            this.adminLogin();
        }
        this.setState({
            loginFailure: false
        })
    }

    getUserByUsername() {
        console.log("AdminLoginComponent: getUserByUsername")
        UserService.getUserByUsername(this.props.username)
            .then(response => {
                AuthenticationService.setAdminLogin(true)
                this.props.handleFirstnameChange(response.data.firstName)
                this.props.handleLastnameChange(response.data.lastName)
                this.props.history.push("/admin-home")
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log("getUserByUsername: error.response.data: ", error.response.data)
                } else if (error.message) {
                    console.log("getUserByUsername: error.message: ", error.message)
                }
            })
    }

    adminLogin() {
        console.log("AdminLoginComponent: adminLogin")
        if (this.validateUserInputs()) {
            AdminService.adminLogin(this.props.username, this.state.password)
                .then(response => {
                    console.log("Basic auth token: ", response.data.token)
                    AuthenticationService.registerSuccessfulLogin(this.props.username, response.data.token)
                    this.getUserByUsername()
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log("Error response on admin authenticate: ", error.response)
                    this.setState({
                        loginFailure: error.response.data
                    })
                } else if (error.message) {
                    console.log("Error message on admin authenticate: ", error.message)
                    this.setState({
                        loginFailure: error.message
                    })
                }
            })            
        }
    }

    validateUserInputs() {
        console.log("AdminLoginComponent: validateUserInputs")
        if (this.props.username === undefined || this.props.username === "") {
            this.setState({
                loginFailure: "Please provide a valid username!"
            })
            return false
        } else if (this.state.password === undefined || this.state.password === "") {
            this.setState({
                loginFailure: "Please provide a valid password!"
            })
            return false
        }
        this.setState({
            loginFailure: ""
        })
        return true
    }

    render() {
        return (
            <>
                <div align="center">
                    <h1>Floret Admin Login</h1>
                    {this.state.loginFailure && <div className="alert alert-warning">{this.state.loginFailure}</div>}
                    <div className="loginUser">
                        <input type="text" name="username" placeholder="Username" onChange={this.props.handleUsernameChange} onKeyDown={this.handleKeyDown} />
                        <br /><br />
                        <input type="password" name="password" placeholder="Password" onChange={this.handlePasswordChange} onKeyDown={this.handleKeyDown}/>
                        <br /><br />
                        <button onClick={this.adminLogin}>Login</button>
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = globalStore => {
    return {
        username: globalStore.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleUsernameChange: (event) => dispatch({ type: actionTypes.USERNAME_CHANGE, val: event.target.value.toLowerCase() }),
        handleFirstnameChange: (firstName) => dispatch({ type: actionTypes.FIRSTNAME_CHANGE, val: firstName }),
        handleLastnameChange: (lastName) => dispatch({ type: actionTypes.LASTNAME_CHANGE, val: lastName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginComponent)
