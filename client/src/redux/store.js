import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { getTokens, setAuthToken } from "../utils"
import {authActions} from "./auth/action"

import authReducer from "./auth/reducer"
import postReducer from "./post/reducer"
import notificationsReducer from "./notifications/reducer"

import { applyMiddleware, combineReducers, createStore } from "redux"

const reducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  post:postReducer,
})

export default () => {
  const { accessToken } = getTokens()
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  )

  if (accessToken) {
    setAuthToken(accessToken)
    store.dispatch(authActions.getProfile());
  }

  return store
}
