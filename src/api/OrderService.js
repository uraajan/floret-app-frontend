import Axios from "axios"
import * as FloretConstants from "../floretConstants"

class OrderService {

    placeOrderForUser(username) {
        console.log("OrderService: placeOrderForUser")
        return Axios.post(`${FloretConstants.REST_API_HOST_PORT}/orders/${username}`)
    }

    getOrdersForUser(username) {
        console.log("OrderService: getOrdersForUser")
    }

}

export default new OrderService()