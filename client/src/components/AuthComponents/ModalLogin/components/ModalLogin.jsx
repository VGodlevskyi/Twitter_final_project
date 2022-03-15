import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useStyles} from "../styles";
import LoadingComponent from "../../../LoadingComponent/LoadingComponent";
import LoginForm from "./LoginForm";
import FindForm from "./FindForm";
import ResetForm from "./ResetForm";
import ConfirmationForm from "./ConfirmationForm";


const ModalLogin = (props) => {
    const MODES = {
        LOGIN_MODE: 0,
        FIND_MODE: 1,
        RESET_MODE: 2,
        CONFIRMATION_MODE: 3,
    }
    const [mode, setMode] = useState(MODES.LOGIN_MODE);
    const switchFindMode = () => setMode(MODES.FIND_MODE);
    const switchResetMode = () => setMode(MODES.RESET_MODE);
    const switchConfirmationMode = () => setMode(MODES.CONFIRMATION_MODE);
    const {handleClose} = props;
    const {loading} = useSelector(state => state.auth);
    const classes = useStyles();
    return (
        <>
            <LoadingComponent visible={loading}/>
            <div className={classes.root}>
                <div className={classes.paper}>
                    {mode === MODES.LOGIN_MODE && <LoginForm classes={classes} handleClose={handleClose} switchFindMode={switchFindMode}/>}
                    {mode === MODES.FIND_MODE  && <FindForm classes={classes} handleClose={handleClose} switchResetMode={switchResetMode}/>}
                    {mode === MODES.RESET_MODE && <ResetForm classes={classes} switchConfirmationMode={switchConfirmationMode} handleClose={handleClose} />}
                    {mode === MODES.CONFIRMATION_MODE && <ConfirmationForm classes={classes} handleClose={handleClose} />}
                </div>
            </div>
        </>
    );
}

export default ModalLogin;