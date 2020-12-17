import * as actionTypes from './constants';

const initialState = {
    username: "",
    firstName: "",
    lastName: "",
    productCountMap: {},
    totalCartItems: 0,
    totalCartValue: 0,
    lastOrderId: 0
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERNAME_CHANGE:
            return {
                ...state,
                username: action.val
            }
        case actionTypes.FIRSTNAME_CHANGE:
            return {
                ...state,
                firstName: action.val
            }
        case actionTypes.LASTNAME_CHANGE:
            return {
                ...state,
                lastName: action.val
            }
        case actionTypes.LOGOUT_USER:
            console.log(actionTypes.LOGOUT_USER)
            return {    
                ...state,
                username: "",
                firstName: "",
                lastName: ""
            }
        case actionTypes.SET_PRODUCT_COUNT:
            console.log(actionTypes.SET_PRODUCT_COUNT)
            const productCountMap = { ...state.productCountMap, [action.productId]: action.count }
            return {
                ...state,
                productCountMap
            }
        case actionTypes.DECREMENT_AVAILABILITY_COUNT:
            console.log(actionTypes.DECREMENT_AVAILABILITY_COUNT)
            const count = state.productCountMap[action.productId] - 1
            const productCountMapDec = { ...state.productCountMap, [action.productId]: count }
            return {
                ...state,
                productCountMapDec
            }
        case actionTypes.INCREMENT_AVAILABILITY_COUNT:
            console.log(actionTypes.INCREMENT_AVAILABILITY_COUNT)
            const countInc = state.productCountMap[action.productId] + 1
            const productCountMapInc = { ...state.productCountMap, [action.productId]: countInc }
            return {
                ...state,
                productCountMapInc
            }
        case actionTypes.SET_TOTAL_CART_ITEMS_VALUE:
            console.log(actionTypes.SET_TOTAL_CART_ITEMS_VALUE)
            return {
                ...state,
                totalCartItems: action.items,
                totalCartValue: action.value
            }
        case actionTypes.SET_LAST_ORDER_ID:
            console.log(actionTypes.SET_LAST_ORDER_ID)
            return {
                ...state,
                lastOrderId: action.lastOrderId
            }
        default:
            return state
    }
}

export default rootReducer