import {authConstants} from "./consts";
import api from "../../services/API";
import {setAuthToken, setRefreshToken} from "../../utils";

const getProfile = () => (dispatch) => {
    dispatch({type: authConstants.GET_USER_PROFILE_REQUEST})

    api.get("/users/profile")
        .then(user => {
            dispatch({type: authConstants.GET_USER_PROFILE_SUCCESS, payload: {user}});
        }).catch((e) => {
            dispatch({type: authConstants.GET_USER_PROFILE_FAILURE});
    })
}

const logIn = (values) => (dispatch) => {
    dispatch({type: authConstants.LOGIN_REQUEST});

    setAuthToken();
    setRefreshToken();

    api
        .post('/auth/login', values)
        .then((data) => {
            setAuthToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            dispatch({type: authConstants.LOGIN_SUCCESS});
            dispatch(getProfile());
        })
        .catch((err) => {
            const errMessage = err.response.data.message;
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {error: errMessage}
            });
        });
}

const oauthLogin = ({accessToken, refreshToken}) => (dispatch) => {
    setAuthToken(accessToken);
    setRefreshToken(refreshToken);
    dispatch({type: authConstants.LOGIN_SUCCESS});
    dispatch(getProfile());
}

const cleanLoginErrors = () => dispatch => {
    dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {errors: ""}
    });
}

const signUp = (values) => (dispatch) => {
    dispatch({type: authConstants.REGISTER_REQUEST})
    api
        .post('/auth/register', values)
        .then((data) => {
            const { message } = data;
            dispatch({
                type: authConstants.REGISTER_SUCCESS,
                payload: {message}
            })
        })
        .catch((err) => {
            const errMessage = err.response.data.message
            dispatch({
                type: authConstants.REGISTER_FAILURE,
                payload: {error: errMessage}
            });
        });
}

const resetRegisterState = () => dispatch => {
    dispatch({
        type: authConstants.REGISTER_INITIAL,
    });
}

const findEmail = (email) => (dispatch) => {
    dispatch({type: authConstants.FIND_REQUEST})
    api
        .post('/auth/find-account', email)
        .then((data) => {
            const { message } = data;
            dispatch({
                type: authConstants.FIND_SUCCESS,
                payload: {message}
            });
        })
        .catch((err) => {
            let errMessage = err.response.data.message;
            const BAD_REQUEST = "400 BAD_REQUEST"

            if (errMessage.includes(BAD_REQUEST)) {
                errMessage = errMessage.replace(BAD_REQUEST, "")
                errMessage = errMessage.replace("\"", "")
                errMessage = errMessage.replace("\"", "")
            }

            dispatch({
                type: authConstants.FIND_FAILURE,
                payload: {error: errMessage}
            });
        });
}

const resetPassword = (values) => (dispatch) => {
    dispatch({type: authConstants.RESET_REQUEST})
    api
        .post('/auth/reset', values)
        .then((data) => {
            const { message } = data;
            dispatch({
                type: authConstants.RESET_SUCCESS,
                payload: {message}
            });
        })
        .catch((err) => {
            let errMessage = err.response.data.message;

            dispatch({
                type: authConstants.REGISTER_FAILURE,
                payload: {error: errMessage}
            });
        });
}

const changePassword = values => dispatch => {
    dispatch({type: authConstants.CHANGE_PASS_REQUEST})
    api.put('/users/user-info', {userinfo: values.userinfo})
        .then(r =>
            r.changeStatus === "OK"
                ? dispatch({type: authConstants.CHANGE_PASS_SUCCESS})
                : dispatch({type: authConstants.CHANGE_PASS_FAIL})
        )
        .catch(() => dispatch({type: authConstants.CHANGE_PASS_FAIL}));
}

const cleanPassResetMessage = () => (dispatch) => {
    dispatch({
        type: authConstants.RESET_INITIAL,
    });
}

const logOut = () => (dispatch) => {
    dispatch({
        type: authConstants.LOG_OUT,
    });
}

export const authActions = {
    logIn,
    logOut,
    oauthLogin,
    cleanErrors: cleanLoginErrors,
    cleanResetMessage: cleanPassResetMessage,
    signUp,
    resetRegisterState,
    resetPassword,
    findEmail,
    getProfile,
    changePassword
}
