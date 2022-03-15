import React from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {FormControl, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {authActions} from "../../../../redux/auth/action";
import {useStyles} from "../styles";
import Logo from "../../../SvgIcons/Logo";
import {GOOGLE_AUTH_URL} from "../../../../utils/constants";

const LoginForm = (props) => {
    const {email, password, switchFindMode} = props;
    const signInSchema = yup.object().shape({
        email: yup
            .string()
            .email("invalid email format")
            .required("this field is required"),
        password: yup
            .string()
            .required("this field is required")
            .min(4, "Min length is 4")
    });
    const formik = useFormik({
        initialValues: {
            email: email,
            password: password,
        },
        onSubmit: values => {
            onSubmit(values);
        },
        validationSchema: signInSchema,
        validateOnChange: false,
        validateOnBlur: true
    });

    const {errors} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const onSubmit = values => {
        dispatch(authActions.logIn(values));
    };
    const cleanError = () => dispatch(authActions.cleanErrors());
    const classes = useStyles();

    return (
        <form onSubmit={formik.handleSubmit}  className={classes.form} action="">
            <div onClick={() => {
                cleanError();
                props.handleClose();
            }}>
                <CloseIcon className={classes.closeIcon}/>
            </div>
            <div className={classes.loginFormHeader}>
                <div className={classes.logoWrapper}>
                    <Logo width={57} height={45} />
                </div>
                <div className={classes.loginFormHeaderText}>
                    <Typography variant={"h4"}>Sign in to Twitterapp</Typography>
                </div>
            </div>
            <div className={classes.buttonWrapper}>
                <div className={classes.buttons}>
                    <a className={classes.googleLogin} href={GOOGLE_AUTH_URL()}>
                        <div className={classes.googleLoginContent}>
                            <div className={classes.googleLoginIcon}>
                                <img width={20} height={20} src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="google-login"/>
                            </div>
                            <div>
                                <Typography className={classes.googleButtonText}>
                                    Sign in with Google
                                </Typography>
                            </div>
                        </div>
                    </a>
                    <div className={classes.orInsert}>
                        <div className={classes.orLineLeft} />
                        <Typography>or</Typography>
                        <div className={classes.orLineRight} />
                    </div>
                </div>
            </div>

            <div className={classes.inputWrapper}>
                <div>
                    <Typography>Provide your credentials</Typography>
                </div>
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

                <FormControl
                    fullWidth
                    variant="standard"
                >
                    <TextField
                        error={formik.touched.password && formik.errors.password}
                        onBlur={formik.handleBlur}
                        type={"password"}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        label="Password"
                        name={"password"}
                        variant="outlined"
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </FormControl>
            </div>

            { !errors &&
                <>
                    <Button className={classes.submitButton} variant="contained" type="submit">
                        Next
                    </Button>
                    <Button onClick={switchFindMode} className={classes.cancelButton} variant="outlined">
                        Forgot password?
                    </Button>
                </>
            }
            { errors &&
                <>
                    <Typography className={classes.errors}>{ errors }</Typography>
                    <Button onClick={cleanError} className={classes.tryAgainButton} variant="contained">
                        Try again
                    </Button>
                </>
            }

        </form>
    );
}

export default LoginForm;