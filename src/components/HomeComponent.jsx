import { connect } from "react-redux";
import SoapService from "../api/SoapService";
import CardComponent from "./CardComponent";
import * as actionTypes from '../store/constants';
import { Component } from "react";

class HomeComponent extends Component {

    constructor() {
        super()

        this.state = {
            responseData: {}
        }
    }

    componentDidMount() {
        console.log("HomeComponent: componentDidMount")
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
        console.log("HomeComponent: render: this.state.responseData: ", this.state.responseData)
        return (
            <>
                <div className="card-columns">
                {
                    
                    Object.keys(this.state.responseData).map((key, index) => {
                        this.props.setProductCountInGStore(this.state.responseData[key].id, this.state.responseData[key].availabilityCount)
                        return <CardComponent key={index} {...this.state.responseData[key]}></CardComponent>
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

export default connect(null, mapDispatchToProps)(HomeComponent)