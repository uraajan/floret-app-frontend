import { Component } from 'react'
import { connect } from 'react-redux'

class OrderConfirmationComponent extends Component {

    render() {
        return (
            <>
                <div>
                    <br />
                    <h3>Thank you for placing the order!</h3>
                    <br />
                    <h3>Order reference # {this.props.lastOrderId}</h3>
                    <br />
                    <h3>Happy shopping with Floret!</h3>
                </div>
            </>
        )
    }

}

const mapStateToProps = globalStore => {
    return {
        lastOrderId: globalStore.lastOrderId
    }
}

export default connect(mapStateToProps)(OrderConfirmationComponent)