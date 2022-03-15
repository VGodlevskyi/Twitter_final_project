import {getTokens} from "../../utils"
import {authConstants} from "./consts";

const {accessToken} = getTokens()

const INIT_STATE = {
    authorized: Boolean(accessToken),
    loading: false,
    errors: "",
    user: {},
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case authConstants.GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                loading: false,
                authorized: true
            };
        case authConstants.LOG_OUT:
            return {
                ...state,
                user: {},
                loading: false,
                authorized: false,
            };
        case authConstants.GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case authConstants.GET_USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                authorized: false,
                user: {}
            }
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case authConstants.LOGIN_FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false,
            }
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case authConstants.REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case authConstants.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }

        case authConstants.REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload.error
            }
        case authConstants.REGISTER_INITIAL:
            return {
                ...state,
                loading: false,
                errors: "",
                message: "",
                resetSuccess: false
            }
        case authConstants.RESET_REQUEST:
            return {
                ...state,
                loading: true,
                errors: "",
                message: ""
            }
        case authConstants.RESET_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload.error,
            }
        case authConstants.RESET_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                resetSuccess: true
            }
        case authConstants.RESET_INITIAL:
            return {
                ...state,
                loading: false,
                message: "",
            }
        case authConstants.FIND_REQUEST:
            return {
                ...state,
                loading: true,
                message: ""
            }
        case authConstants.FIND_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload.error
            }
        case authConstants.FIND_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            }
        case authConstants.CHANGE_PASS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case authConstants.CHANGE_PASS_SUCCESS:
            return {
                ...state,
                loading: false,
                changeStatus: "successfully changed"
            }
        case authConstants.CHANGE_PASS_FAIL:
            return {
                ...state,
                loading: false,
                changeStatus: "change failed"
            }
        default:
            return state
    }
}
