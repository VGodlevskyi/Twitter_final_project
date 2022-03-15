import api from "../services/API"

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    localStorage.setItem("authToken", token)
  } else {
    delete api.defaults.headers.common.Authorization
    localStorage.removeItem("authToken")
  }
}

export const setRefreshToken = (token) => {
  if (token) {
    localStorage.setItem("refreshToken", token)
  } else {
    localStorage.removeItem("refreshToken")
  }
}

export const getTokens = () => {
  return {
    accessToken: localStorage.getItem("authToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  }
}
