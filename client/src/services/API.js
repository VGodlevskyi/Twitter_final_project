import axios from "axios"
import {getTokens, setAuthToken, setRefreshToken} from "../utils"
import {_DEV1_API_URL, _DEV2_API_URL, _ENV_MODE, _PROD_API_URL, _RUNNING_HOST_NAME} from "../utils/constants";

const baseURL = () => {
    if      (_ENV_MODE === 'production'  &&  _RUNNING_HOST_NAME  !== 'localhost')  return _PROD_API_URL
    else if (_ENV_MODE === 'production'  &&  _RUNNING_HOST_NAME  === 'localhost')  return _DEV1_API_URL;
    else if (_ENV_MODE === 'development' &&  _RUNNING_HOST_NAME  === 'localhost')  return _DEV2_API_URL;
}

const api = axios.create({
    baseURL: baseURL(),
})

api.interceptors.response.use(
    (response) => response.data,
    // eslint-disable-next-line func-names
    async function (error) {
        const {refreshToken} = getTokens()
        const originalRequest = error.config

        if (originalRequest._retry) {
            setAuthToken();
            setRefreshToken();
        }

        // eslint-disable-next-line no-underscore-dangle
        if (error.response && (error.response.status === 401 || error.response.status ===405 && !originalRequest._retry)) {
            // eslint-disable-next-line no-underscore-dangle
            originalRequest._retry = true

            // eslint-disable-next-line no-return-await
            return await axios
                .get(`/token/refresh`, {
                    headers: {
                        "refresh-token": `Bearer ${refreshToken}`,
                    },
                })
                .then(({data}) => {
                    setAuthToken(data.jwt)
                    setRefreshToken(data.refreshToken)
                    originalRequest.headers.Authorization = `${data.jwt}`
                    return api(originalRequest)
                })
        }

        return Promise.reject(error)
    }
)

export default api
