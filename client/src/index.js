import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import App from "./containers/AppContainer"
import store from '../src/redux/store'
import {BrowserRouter as Router} from "react-router-dom"
import {StylesProvider} from "@mui/styles";
import './style.css';
import MuiThemeProvider from "./components/global/MuiThemeProvider";
import {hideMyRed} from "./utils/dirtyWay";

hideMyRed();
const reduxStore = store();

ReactDOM.render(
    <Provider store={reduxStore}>
        <Router>
            <MuiThemeProvider>
                <StylesProvider injectFirst>
                    <App/>
                </StylesProvider>
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById("root")
)
