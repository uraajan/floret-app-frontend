import { Component } from 'react'
import { connect } from 'react-redux'
import SoapService from '../api/SoapService'
import AdminCardComponent from './AdminCardComponent'
import * as actionTypes from '../store/constants';

class AdminHomeComponent extends Component {

    constructor() {
        super()

        this.state = {
            responseData: {}
        }
    }

    componentDidMount() {
        console.log("AdminHomeComponent: componentDidMount")
        SoapService.getSoaps()
            .then(response => {
                console.log("componentDidMount: response.data: ", response.data)
                this.setState({
                    responseData: response.data
                })
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log("error.response.data: ", error.response.data)
                } else if (error.message) {
                    console.log("error.message: ", error.message)
                }
            })
    }

    render() {
        console.log("AdminHomeComponent: render: this.state.responseData: ", this.state.responseData)
        return (
            <>
                <div className="card-columns">
                {
                    
                    Object.keys(this.state.responseData).map((key, index) => {
                        this.props.setProductCountInGStore(this.state.responseData[key].id, this.state.responseData[key].availabilityCount)
                        return <AdminCardComponent key={index} {...this.state.responseData[key]}></AdminCardComponent>
                    })

                }
                </div>
            </>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        setProductCountInGStore: (productId, count) => dispatch({type: actionTypes.SET_PRODUCT_COUNT, productId, count})
    }
}

export default connect(null, mapDispatchToProps)(AdminHomeComponent)