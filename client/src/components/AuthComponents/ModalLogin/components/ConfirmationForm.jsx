import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../../SvgIcons/Logo";
import Typography from "@mui/material/Typography";
import {authActions} from "../../../../redux/auth/action";
import {useDispatch, useSelector} from "react-redux";
import {parseEmail} from "../parseEmail";
import Button from "@mui/material/Button";

function ConfirmationForm(props) {
    const {handleClose, classes} = props;
    const CONFIRMATION_HEADER = 'Пароль успешно сброшен!';
    const dispatch = useDispatch();
    const cleanErrors = () => dispatch(authActions.cleanErrors());
    const forget = () => dispatch(authActions.cleanResetMessage());

    const {message} = useSelector(state => state.auth)
    const email = message.split(' ')[2];
    const parsedEmail = parseEmail(email);
    const userMessage = message.replace(email, parsedEmail);

    function cleanClose() {
        cleanErrors();
        forget();
        handleClose();
    }

    return (
        <form className={classes.form} action="">
            <div onClick={cleanClose}>
                <CloseIcon className={classes.closeIcon}/>
            </div>
            <div className={classes.loginFormHeader}>
                <div className={classes.logoWrapper}>
                    <Logo width={57} height={45} />
                </div>
                <div className={classes.loginFormHeaderText}>
                    <Typography variant={"h5"}>{CONFIRMATION_HEADER}</Typography>
                </div>
            </div>
            <div className={classes.msgBox}>
                <Typography className={classes.emailFoundMessage}>
                    Проверьте свой почтовый ящик <span><b>{parsedEmail}</b></span>
                </Typography>
                <Button onClick={cleanClose} className={classes.submitButton} variant="contained">
                    Далее
                </Button>
            </div>

        </form>
    );
}

export default ConfirmationForm;