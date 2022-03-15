import {postConstants} from "./consts";

const INIT_STATE = {
    postsList: [],
    loading: false,
    errors: "",
}

export default (state = INIT_STATE, action) => {

    switch (action.type) {

        case postConstants.LOADING_POSTS:
            return {
                ...state,
                loading: action.payload,

            }

        case postConstants.ADD_NEW_POST:
            return {
                ...state,
                postsList: [action.payload, ...state.postsList]
            }

        case postConstants.RESET_POST:
            return {
                ...INIT_STATE
            }

        case postConstants.GET_ALL_POSTS_SUCCESS:
            return {
                ...state,
                postsList: action.payload.length? [...action.payload,  ...state.postsList] : [...state.postsList],
                loading: false
            }

        case postConstants.GET_ALL_POSTS_FAILURE:
            return {
                ...state,
                postsList: [...state.postsList],
                errors: action.payload.error,
                loading: false
            }
        case postConstants.GET_ALL_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case postConstants.GET_USER_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case postConstants.GET_USER_POSTS_SUCCESS:
            return {
                ...state,
                postsList: [...state.postsList, ...action.payload],
                loading: false
            }

        case postConstants.CLEAR_POSTS:
            return {
                ...state,
                postsList: []
            }

        case postConstants.GET_USER_POSTS_FAILURE:
            return {
                ...state,
                postsList: [...state.postsList],
                errors: action.payload.error,
                loading: false
            }


        default:
            return state
    }
}
