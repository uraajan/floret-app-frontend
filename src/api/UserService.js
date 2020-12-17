import Axios from "axios"
import * as FloretConstants from "../floretConstants"

class UserService {

    getUserByUsername(username) {
        console.log("UserService: getUserByUsername")
        return Axios.get(`${FloretConstants.REST_API_HOST_PORT}/users/${username}`)
    }

}

export default new UserService()