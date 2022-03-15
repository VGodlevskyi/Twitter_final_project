import React, {useEffect, useState} from 'react';
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../../SvgIcons/Logo";
import Typography from "@mui/material/Typography";
import {FormControl, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import * as yup from "yup";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../../redux/auth/action";

function FindForm(props) {
    const {classes, email, handleClose, switchResetMode} = props;
    const [nextStep, setNextStep] = useState(false);
    const {errors, message} = useSelector(state => state.auth)

    useEffect(() => {
        nextStep ? switchResetMode() : void 0;
    }, [nextStep]);

    useEffect(() => {
        message ? setNextStep(true) : void 0;
    }, [message]);

    const emailSchema = yup.object().shape({
        email: yup
            .string()
            .email("invalid email format")
            .required("this field is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: email,
        },
        onSubmit: email => submitEmail(email),
        validationSchema: emailSchema,
        validateOnChange: false,
        validateOnBlur: true
    });

    const dispatch = useDispatch();
    const cleanErrors = () => dispatch(authActions.cleanErrors());

    const submitEmail = email => dispatch(authActions.findEmail(email));
    return (
        <form onSubmit={formik.handleSubmit}  className={classes.form} action="">
            <div onClick={() => {
                cleanErrors();
                handleClose();
            }}>
                <CloseIcon className={classes.closeIcon}/>
            </div>
            <div className={classes.loginFormHeader}>
                <div className={classes.logoWrapper}>
                    <Logo width={57} height={45} />
                </div>
                <div className={classes.loginFormHeaderText}>
                    <Typography variant={"h5"}>Find your Twitterapp account</Typography>
                </div>
            </div>
            <div className={classes.inputWrapper}>
                <FormControl
                    fullWidth
                    variant= "outlined"
                    margin= "normal"
                >
                    <TextField
                        error={formik.touched.email && formik.errors.email}
                        type={"email"}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.values.email && formik.handleBlur}
                        label="Email"
                        name={"email"}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </FormControl>
            </div>
            { !errors &&
                <>
                    <Button className={classes.submitButton} variant="contained" type="submit">
                        Search
                    </Button>
                </>
            }
            { errors &&
                <>
                    <Typography className={classes.errors}>
                        { errors }
                    </Typography>
                </>
            }
            {
                errors &&
                <Button onClick={cleanErrors} className={classes.tryAgainButton} variant="contained">
                    Try again
                </Button>
            }
        </form>
    );
}

export default FindForm;