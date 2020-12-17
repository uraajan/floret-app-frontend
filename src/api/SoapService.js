import Axios from "axios"
import * as FloretConstants from "../floretConstants"

class SoapService {

    getSoaps() {
        console.log("SoapService: getSoaps")
        return Axios.get(`${FloretConstants.REST_API_HOST_PORT}/home`)
    }

}

export default new SoapService()