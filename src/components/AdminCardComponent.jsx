import {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actionTypes from '../store/constants'

class AdminCardComponent extends Component {

    constructor() {
        super()

        this.state = {
            productCount: 0
        }

        this.editProductDetails = this.editProductDetails.bind(this)

    }

    componentDidMount() {
        console.log("AdminCardComponent: componentDidMount: this.props.id: ", this.props.id)
        this.setState({
            productCount: this.props.availabilityCount
        })
    }

    editProductDetails(productId) {
        this.props.setProductIdToEditInGStore(productId)
        this.props.history.push("/admin-add-edit")
    }

    render() {
        console.log("AdminCardComponent: render: this.state.productCount: ", this.state.productCount)
        return (
            <>
                <div className="card bg-light soapCard">
                    <div className="card-header soapName"><span className="displayInlineBlock"><h4>Floret&nbsp;</h4></span><span className="soapType">{this.props.name}</span></div>
                    <img className="card-img-top soapImage" src="http://127.0.0.1:8081/src/resources/images/1533-200.png" alt="Card" />
                    <div className="card-body text-center">
                        <h4 className="card-text soapDiscountedPrice">₹{this.props.discountedPrice}</h4>
                        <h6 className="card-text">MRP: <span className="soapPrice">₹{this.props.price}</span> ({this.props.discountPercentage}% off)</h6>
                        <p className="card-text soapCategory">Suitable for {this.props.category} skin</p>
                        <h6 className="card-text">Available: {this.state.productCount}</h6>
                    </div>
                    <button className="btnAddRemoveCheckout" onClick={()=> this.editProductDetails(this.props.id) }><span>Edit</span></button>
                </div>
            </>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        setProductIdToEditInGStore: (productIdToEdit) => dispatch({type: actionTypes.SET_PRODUCT_ID_TO_EDIT, productIdToEdit})
    }
}

export default withRouter(connect(null, mapDispatchToProps)(AdminCardComponent))