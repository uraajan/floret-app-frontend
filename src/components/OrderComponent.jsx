import { Component } from 'react'
import { connect } from 'react-redux'
import OrderService from '../api/OrderService'

function Order(props) {
    return (
        <>
            <div className="shadow p-3 mb-5 bg-white rounded">
                <div className="orderDetails displayInlineBlock">
                    <div><h5>Order Reference # { props.id }</h5></div>
                    <br />
                    <div align="center">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.orderProductVOs.map((orderProductVO, index) => {
                                        return (
                                            <tr key={ index }>
                                                <td>Floret {orderProductVO.productName}</td>
                                                <td>{orderProductVO.productCount}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div><h5>Order Amount: ₹{ props.orderAmount }</h5></div>
                </div>
                <div className="orderGapFill displayInlineBlock"></div>
                <div className="orderActions displayInlineBlock">
                    <br />
                    { props.orderCancelled && <div>Order cancelled</div> }
                    { props.orderProcessed && <div>Order processing</div> }
                    { props.orderDelivered && <div>Order shipped</div> }
                    { (!props.orderDelivered && !props.orderProcessed && !props.orderCancelled) && <div><h5>Order placed</h5></div> }
                    <br />
                    {(!props.orderDelivered && !props.orderProcessed && !props.orderCancelled) && <button onClick={ props.cancelOrderOnClick } className="btnAddRemoveCheckout">Cancel Order</button> }
                    { props.orderDelivered && <button className="btnAddRemoveCheckout"><span>Track Package</span></button> }
                </div>
            </div>
        </>
    )
}

class OrderComponent extends Component {

    constructor() {
        super()
        this.state = {}
    }

    cancelOrder(orderId) {
        console.log("OrderComponent: cancelOrder")
        OrderService.cancelOrderForUser(this.props.username, orderId)
            .then(response => {
                console.log("Order cancelled: ", response.data)
                this.setState({
                    orderId: 0
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
    
    componentDidMount() {
        console.log("OrderComponent: componentDidMount: this.props.id", this.props.id)
        this.setState({
            orderId: this.props.id
        })
    }

    render() {
        console.log("OrderComponent: render")
        return (
            
            this.state.orderId
                ? <Order {...this.props} cancelOrderOnClick={() => this.cancelOrder(this.props.id)}></Order>
                : <></>
            
            
        )
    }

}

const mapStateToProps = globalStore => {
    return {
        username: globalStore.username
    }
}

export default connect(mapStateToProps)(OrderComponent)