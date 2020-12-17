import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthenticationService from '../api/AuthenticationService';
import * as actionTypes from '../store/constants';

class RegisterComponent extends Component {

    constructor() {
        super();

        this.state = {
            password: "",
            address: "",
            mobileNo: "",
            repeatPassword: "",
            registerFailure: ""
        }

        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.validateUserInputs = this.validateUserInputs.bind(this);
    }

    handleTextInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            this.registerUser();
        }
        this.setState({
            registerFailure: ""  
        })
    }

    registerUser() {
        console.log("RegisterComponent: registerUser")
        if (this.validateUserInputs()) {
            if (this.state.password === this.state.repeatPassword) {
                AuthenticationService.registerUser(this.props.username, this.state.password, this.props.firstName,
                    this.props.lastName, this.state.address, this.state.mobileNo)
                    .then(response => {
                        AuthenticationService.registerSuccessfulLogin(this.props.username, response.data.token)
                        this.props.history.push("/home")
                    })
                    .catch(error => {
                        if (error.response && error.response.data) {
                            this.setState({
                                registerFailure: error.response.data
                            })
                        } else if (error.message) {
                            this.setState({
                                registerFailure: error.message
                            })
                        }
                    })
            } else {
                this.setState({
                    registerFailure: "Passwords didn't match. Please try again!"
                })
            }
        }
    }

    validateUserInputs() {
        console.log("RegisterComponent: validateUserInputs")
        if (this.props.username === undefined || this.props.username === "") {
            this.setState({
                registerFailure: "Please provide a valid username!"
            })
            return false
        } else if (this.state.password === undefined || this.state.password === "") {
            this.setState({
                registerFailure: "Please provide a valid password!"
            })
            return false
        } else if (this.state.repeatPassword === undefined || this.state.repeatPassword === "") {
            this.setState({
                registerFailure: "Please provide a valid password!"
            })
            return false
        } else if (this.props.firstName === undefined || this.props.firstName === "") {
            this.setState({
                registerFailure: "Please provide a valid first name!"
            })
            return false
        } else if (this.props.lastName === undefined || this.props.lastName === "") {
            this.setState({
                registerFailure: "Please provide a valid last name!"
            })
            return false
        } else if (this.state.address === undefined || this.state.address === "") {
            this.setState({
                registerFailure: "Please provide a valid address!"
            })
            return false
        } else if (this.state.mobileNo === undefined || this.state.mobileNo === "") {
            this.setState({
                registerFailure: "Please provide a valid mobile number!"
            })
            return false
        }
        this.setState({
            registerFailure: ""
        })
        return true
    }

    render() {
        return (
            <div align="center">
                <br />
                <h1>Welcome to Floret! Sign up</h1>
                <br />
                {this.state.registerFailure && <div className="alert alert-warning">{this.state.registerFailure}</div>}
                <div className="registerUser">
                    <input type="text" name="username" maxLength="16" placeholder="Username" onChange={this.props.handleUsernameChange} onKeyDown={this.handleKeyDown} />
                    <br /><br />
                    <input type="password" name="password" maxLength="64" placeholder="Password" onChange={this.handleTextInputChange} onKeyDown={this.handleKeyDown}/>
                    <br /><br />
                    <input type="password" name="repeatPassword" maxLength="64" placeholder="Repeat Password" onChange={this.handleTextInputChange} onKeyDown={this.handleKeyDown}/>
                    <br /><br />
                    <input type="text" name="firstName" maxLength="32" placeholder="First Name" onChange={this.props.handleFirstnameChange} onKeyDown={this.handleKeyDown} />
                    <br /><br />
                    <input type="text" name="lastName" maxLength="32" placeholder="Last Name" onChange={this.props.handleLastnameChange} onKeyDown={this.handleKeyDown} />
                    <br /><br />
                    <input type="text" name="address" maxLength="512" placeholder="Address" onChange={this.handleTextInputChange} onKeyDown={this.handleKeyDown} />
                    <br /><br />
                    <input type="number" name="mobileNo" placeholder="Mobile Number" onChange={this.handleTextInputChange} onKeyDown={this.handleKeyDown} />
                    <br /><br />
                    <button onClick={this.registerUser}>Sign up</button>
                </div>
            </div>
        );
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
        handleUsernameChange: (event) => dispatch({ type: actionTypes.USERNAME_CHANGE, val: event.target.value.toLowerCase() }),
        handleFirstnameChange: (event) => dispatch({ type: actionTypes.FIRSTNAME_CHANGE, val: event.target.value }),
        handleLastnameChange: (event) => dispatch({ type: actionTypes.LASTNAME_CHANGE, val: event.target.value })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)