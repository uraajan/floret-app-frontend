import { Component } from 'react'

class OrderComponent extends Component {

    render() {
        return (
            <>
                <div className="orderComponent">
                    <div className="orderDetails displayInlineBlock">
                        <div>Order Reference Number: 1</div>
                        <br />
                        <div align="center">
                            <table><tbody>
                                <tr>
                                    <td>Floret Tomato</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>Floret Turmeric</td>
                                    <td>2</td>
                                </tr>
                            </tbody></table>
                        </div>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div className="orderActions displayInlineBlock">
                        <button>Cancel Order</button>
                        <button>Order Processing</button>
                        <button>Track Package</button>
                    </div>
                </div>
            </>
        )
    }

}

export default OrderComponent