import Axios from "axios"
import * as FloretConstants from "../floretConstants"

class OrderService {

    placeOrderForUser(username) {
        console.log("OrderService: placeOrderForUser")
        return Axios.post(`${FloretConstants.REST_API_HOST_PORT}/orders/${username}`)
    }

    getOrdersForUser(username) {
        console.log("OrderService: getOrdersForUser")
        return Axios.get(`${FloretConstants.REST_API_HOST_PORT}/orders/${username}`)
    }

    cancelOrderForUser(username, orderId) {
        console.log("OrderService: cancelOrderForUser")
        return Axios.delete(`${FloretConstants.REST_API_HOST_PORT}/orders/${username}/${orderId}`)
    }

}

export default new OrderService()