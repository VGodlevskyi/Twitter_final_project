import React, {useEffect, useState} from 'react';
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../../SvgIcons/Logo";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../../redux/auth/action";
import {parseEmail} from "../parseEmail";

function ResetForm(props) {
    const {handleClose, switchConfirmationMode, classes} = props;
    const RESET_HEADER = 'Please confirm password reset'
    const dispatch = useDispatch();
    const resetEmail = (value) => dispatch(authActions.resetPassword({email: value}));
    const cleanErrors = () => dispatch(authActions.cleanErrors());
    const forget = () => dispatch(authActions.cleanResetMessage());
    const {errors, message, resetSuccess} = useSelector(state => state.auth)
    const [nextStep, setNextStep] = useState(false);

    useEffect(() => {
        nextStep ? switchConfirmationMode() : void 0;
    }, [nextStep]);

    useEffect(() => {
        resetSuccess ? setNextStep(true) : void 0;
    }, [resetSuccess]);

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
                    <Typography variant={"h5"}>{RESET_HEADER}</Typography>
                </div>
            </div>

            { !errors && message &&
                <>
                    <Typography className={classes.emailFoundHeader}>
                        We found the following information associated with your account.
                    </Typography>
                    <div>
                        <br/>
                        <br/>
                    </div>
                    <Typography className={classes.emailFoundMessage}>
                        Can we send temporary password to email: <span className={classes.emailFound}>{parseEmail(message)}</span>?
                    </Typography>
                    <Button onClick={() => resetEmail(message)} className={classes.submitButton} variant="contained">
                        Next
                    </Button>
                    <Button onClick={cleanClose} className={classes.cancelButton} variant="outlined">
                        Cancel
                    </Button>

                </>
            }
            {errors &&
                <>
                    <Typography className={classes.errors}>
                        {errors}
                    </Typography>
                    <Button onClick={cleanErrors} className={classes.tryAgainButton} variant="contained">
                        Try again
                    </Button>
                </>
            }
        </form>
    );
}

export default ResetForm;