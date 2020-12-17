import { Component } from 'react'
import { connect } from 'react-redux';
import UserService from '../api/UserService';
import LabelComponent from './LabelComponent';

class ProfileComponent extends Component {

    constructor() {
        super();

        this.state = {
            address: "",
            mobileNo: ""
        }

        this.getUserDetails = this.getUserDetails.bind(this)
    }

    getUserDetails() {
        console.log("ProfileComponent: getUserDetails")
        UserService.getUserByUsername(this.props.username)
            .then(response => {
                this.setState({
                    address: response.data.address,
                    mobileNo: response.data.mobileNo
                })
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log("getUserDetails: error.response.data: ", error.response.data)
                } else if (error.message) {
                    console.log("getUserDetails: error.message: ", error.message)
                }
            })
    }

    componentDidMount() {
        console.log("ProfileComponent: componentDidMount")
        this.getUserDetails()
    }

    render() {
        console.log("ProfileComponent: render")
        return (
            <div align="center">
                <div>
                    <LabelComponent lbRow="lblOdd" lbKey="Username" lbValue={this.props.username} />
                </div>
                <div>
                    <LabelComponent lbRow="lblEven" lbKey="First Name" lbValue={this.props.firstName} />
                </div>
                <div>
                    <LabelComponent lbRow="lblOdd" lbKey="Last Name" lbValue={this.props.lastName} />
                </div>
                <div>
                    <LabelComponent lbRow="lblEven" lbKey="Address" lbValue={this.state.address} />
                </div>
                <div>
                    <LabelComponent lbRow="lblOdd" lbKey="Mobile Number" lbValue={this.state.mobileNo} />
                </div>
                
            </div>
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

export default connect(mapStateToProps)(ProfileComponent)