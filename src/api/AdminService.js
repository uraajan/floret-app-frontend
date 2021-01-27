import Axios from "axios"
import * as FloretConstants from "../floretConstants"

class AdminService {

    adminLogin(username, password) {
        console.log("AdminService: adminLogin")
        return Axios.post(`${FloretConstants.REST_API_HOST_PORT}/admin/authenticate`, {
            username,
            password
        })
    }

    getProductForId(productId) {
        console.log("AdminService: getProductForId")
        return Axios.get(`${FloretConstants.REST_API_HOST_PORT}/admin/products/${productId}`)
    }

    addOrEditProduct(id, name, price, discountPercentage, discountedPrice, category, availabilityCount) {
        console.log("AdminService: addOrEditProduct")
        discountedPrice = price - (price * discountPercentage / 100)
        return Axios.put(`${FloretConstants.REST_API_HOST_PORT}/admin/products`, {
            id, name, price, discountPercentage, discountedPrice, category, availabilityCount
        })
    }

    getUnprocessedOrders() {
        console.log("AdminService: getAllOrders")
        return Axios.get(`${FloretConstants.REST_API_HOST_PORT}/admin/orders`)
    }

}

export default new AdminService()