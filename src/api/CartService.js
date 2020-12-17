import Axios from "axios"
import * as FloretConstants from "../floretConstants"

class CartService {

    getCartDataForUser(username) {
        console.log("CartService: getCartDataForUser")
        return Axios.get(`${FloretConstants.REST_API_HOST_PORT}/carts/${username}`)
    }

    addToCartForUser(username, productId) {
        console.log("CartService: addToCartForUser")
        return Axios.put(`${FloretConstants.REST_API_HOST_PORT}/carts`, {
            id: productId,
            name: username
        })
    }

    removeFromCartForUser(username, productId) {
        console.log("CartService: removeFromCartForUser")
        return Axios.delete(`${FloretConstants.REST_API_HOST_PORT}/carts/${username}/${productId}`)
    }

}

export default new CartService()