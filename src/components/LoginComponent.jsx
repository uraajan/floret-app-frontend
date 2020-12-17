import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthenticationService from '../api/AuthenticationService';
import UserService from '../api/UserService';
import * as actionTypes from '../store/constants';

class LoginComponent extends Component {

    constructor() {
        super();

        this.state = {
            password: "",
            loginFailure: ""
        }

        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.loginUser = this.loginUser.bind(this)
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
            this.loginUser();
        }
        this.setState({
            loginFailure: false
        })
    }

    getUserByUsername() {
        console.log("LoginComponent: getUserByUsername")
        UserService.getUserByUsername(this.props.username)
            .then(response => {
                this.props.handleFirstnameChange(response.data.firstName)
                this.props.handleLastnameChange(response.data.lastName)
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log("getUserByUsername: error.response.data: ", error.response.data)
                } else if (error.message) {
                    console.log("getUserByUsername: error.message: ", error.message)
                }
            })
    }

    loginUser() {
        console.log("LoginComponent: loginUser")
        if (this.validateUserInputs()) {
            AuthenticationService.authenticateUser(this.props.username, this.state.password)
                .then(response => {
                    AuthenticationService.registerSuccessfulLogin(this.props.username, response.data.token)
                    this.getUserByUsername()
                    this.props.history.push("/home")
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        this.setState({
                            loginFailure: error.response.data
                        })
                    } else if (error.message) {
                        this.setState({
                            loginFailure: error.message
                        })
                    }
                })
        }
    }

    validateUserInputs() {
        console.log("LoginComponent: validateUserInputs")
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
            <div align="center">
                <h1>Welcome to Floret! Login</h1>
                {this.state.loginFailure && <div className="alert alert-warning">{this.state.loginFailure}</div>}
                <br />
                <div className="loginUser">
                    <input type="text" name="username" placeholder="Username" onChange={this.props.handleUsernameChange} onKeyDown={this.handleKeyDown} />
                    <br /><br />
                    <input type="password" name="password" placeholder="Password" onChange={this.handlePasswordChange} onKeyDown={this.handleKeyDown}/>
                    <br /><br />
                    <button onClick={this.loginUser}>Login</button>
                </div>
                <br />
                <h2>New to Floret? <Link to="/register">Register</Link> here!</h2>
            </div>  
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)