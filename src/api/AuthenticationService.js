import Axios from "axios"
import * as FloretConstants from "../floretConstants"

class AuthenticationService {

    authHeader = ""
    adminUserLogin = false

    registerUser(username, password, firstName, lastName, address, mobileNo) {
        console.log('AuthenticationService: registerUser')
        return Axios.post(`${FloretConstants.REST_API_HOST_PORT}/register`, {
            username, password, firstName, lastName, address, mobileNo
        })
    }

    authenticateUser(username, password) {
        console.log('AuthenticationService: authenticateUser')
        return Axios.post(`${FloretConstants.REST_API_HOST_PORT}/authenticate`, {
            username, password
        })
    }

    registerSuccessfulLogin(username, token) {
        console.log("AuthenticationService: registerSuccessfulLogin")
        sessionStorage.setItem(FloretConstants.SESSION_STORAGE_USER_AUTHENTICATE_KEY, username)
        this.setupAxiosInterceptors(this.generateBasicAuthHeader(token))
    }

    generateBasicAuthHeader(token) {
        console.log("AuthenticationService: generateBasicAuthHeader")
        this.authHeader = "Basic" + token
    }

    setupAxiosInterceptors() {
        console.log("AuthenticationService: setupAxiosInterceptors")

        Axios.interceptors.request.use(
            config => {
                if (this.isUserLoggedIn()) {
                    console.log("setupAxiosInterceptors: ", this.authHeader)
                    config.headers.Authorization = this.authHeader
                }
                return config
            }
        )

        Axios.interceptors.response.use(
            response => response,
            error => {
                console.log("Axios error response interceptor")
                if (error.response && error.response.status) {
                    if (error.response.status === 401) {
                        console.log("Unauthorized")
                        this.logoutComplete()
                    } else {
                        return Promise.reject(error)
                    }
                }
            }
        )

    }

    isUserLoggedIn() {
        if (sessionStorage.getItem(FloretConstants.SESSION_STORAGE_USER_AUTHENTICATE_KEY) === null) {
            return false
        }
        return true
    }

    isAdminLogin() {
        console.log("AuthenticationService: isAdminLogin: ", this.adminUserLogin)
        return this.adminUserLogin
    }

    setAdminLogin(adminLogin) {
        console.log("AuthenticationService: setAdminLogin: ", adminLogin)
        this.adminUserLogin = adminLogin
    }

    logout(username) {
        console.log("AuthenticationService: logout")
        return Axios.delete(`${FloretConstants.REST_API_HOST_PORT}/logout/${username}`)
    }

    logoutComplete() {
        console.log("AuthenticationService: logoutComplete")
        sessionStorage.removeItem(FloretConstants.SESSION_STORAGE_USER_AUTHENTICATE_KEY)
        this.authHeader = ""        
        console.log("Logout fired completely")
    }

}

export default new AuthenticationService()