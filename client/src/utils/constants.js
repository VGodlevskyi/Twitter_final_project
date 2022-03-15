export const _ENV_MODE = process.env.NODE_ENV;
export const _RUNNING_HOST = window.location.host;
export const _RUNNING_HOST_NAME = _RUNNING_HOST.split(":")[0]
export const _RUNNING_HOST_PORT = _RUNNING_HOST.split(":")[1];
export const _PROD_API_URL = "https://twitterapp-fs13.herokuapp.com/api/v0";
export const _DEV1_API_URL = "http://localhost:8081/api/v0";
export const _DEV2_API_URL = "/api/v0";

export const _PROD_WS_URL = "https://twitterapp-fs13.herokuapp.com/ws";
export const _DEV_WS_URL = "http://localhost:8081/ws";


const GOOGLE_LOGIN_URL = {
    dev1: "http://localhost:8081/oauth2/auth/google?oauth2_redirect=http://localhost:8082/oauth2/login",
    dev2: "http://localhost:8081/oauth2/auth/google?oauth2_redirect=http://localhost:3000/oauth2/login",
    prod: "https://twitterapp-fs13.herokuapp.com/oauth2/auth/google?oauth2_redirect=https://twitterapp13.herokuapp.com/oauth2/login"
}

export const wsURL = () => {
    if      (_ENV_MODE === 'production'  &&  _RUNNING_HOST_NAME  !== 'localhost')  return _PROD_WS_URL
    else if (_ENV_MODE === 'production'  &&  _RUNNING_HOST_NAME  === 'localhost')  return _DEV_WS_URL;
    else if (_ENV_MODE === 'development' &&  _RUNNING_HOST_NAME  === 'localhost')  return _DEV_WS_URL;
}

export const GOOGLE_AUTH_URL = () => {
    let localhost = _RUNNING_HOST_NAME === 'localhost';
    if (_ENV_MODE === 'production' && !localhost) {
        return GOOGLE_LOGIN_URL.prod
    } else if (localhost && _RUNNING_HOST_PORT === "8082") {
        return GOOGLE_LOGIN_URL.dev1
    } else if (localhost && _RUNNING_HOST_PORT === "3000") {
        return GOOGLE_LOGIN_URL.dev2
    } else {
        console.error("google auth url will not be provided for unknown hosts, contact to admin")
    }
}
