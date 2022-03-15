import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import ListItemButton from "@mui/material/ListItemButton";
import {FormControl, IconButton, ListItem, ListItemText, TextField} from "@mui/material";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import {makeStyles} from "@mui/styles";
import {useFormik} from "formik";
import {authActions} from "../../redux/auth/action";
import schema from "../../components/AuthComponents/ModalRegister/registrationSchema";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
    passBlock: {
        minWidth: "330px !important",
        minHeight: "380px !important",
        display: "flex !important",
        flexDirection: "column !important",
        justifyContent: "flex-start !important",
        alignItems: "stretch !important",
    },
    changePassTf: {
        margin: "10px 0 !important",
    },
    closeBtn: {
        borderRadius: "20px !important",
        backgroundColor: "red !important"
    },
    okBtn: {
        borderRadius: "20px !important",
    },
    changeForm: {
        marginTop: "20px",
    },
    messageText: {
        color: "green",
        fontWeight: "bold",
        fontSize: "1em",
        textAlign: "center"
    }
});

export default function ChangePassword() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const [msgRender, setMsgRender] = useState(false);
    const [msgText, setMsgText] = useState("");
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const changeStatus = useSelector(({auth}) => auth.changeStatus)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            userinfo: "",
            confirm: "",
        },
        onSubmit: values => {
            dispatch(authActions.changePassword(values));
            setMsgText("Password has been changed");
            setMsgRender(true);
            setTimeout(() => {
                handleClose();
                setMsgText("");
                setMsgRender(false);
            }, 1500);

        },
        validationSchema: schema.changePassSchema,
        validateOnChange: false,
        validateOnBlur: true,
        dirty: true
    });

    const dispatch = useDispatch();

    return (
        <div>
            <ListItem disablePadding secondaryAction={<IconButton disabled><ChevronRightRoundedIcon /></IconButton>}>
                <ListItemButton onClick={handleClickOpen}>
                    <ListItemText primary="Change password" />
                </ListItemButton>
            </ListItem>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="changePass"
                PaperProps={{style: { borderRadius: `${fullScreen ? "0" : "20px"}`,}}}
            >
                <DialogTitle id="changePass">
                    {!msgRender && "Change your password"}
                    {msgRender  && "Password change"}
                </DialogTitle>
                    <form className={classes.changeForm} onSubmit={formik.handleSubmit}>
                        <DialogContent className={classes.passBlock}>

                            {msgRender &&
                                <>
                                    <Typography className={classes.messageText}>
                                        {msgText}
                                    </Typography>
                                </>
                            }

                            {!msgRender &&
                            <>
                                <FormControl margin="normal" fullWidth variant="standard">
                                    <TextField
                                        error={formik.touched.userinfo && formik.errors.userinfo}
                                        onBlur={formik.handleBlur}
                                        type={"password"}
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        label="New password"
                                        name={"userinfo"}
                                        variant="outlined"
                                        helperText={formik.touched.userinfo && formik.errors.userinfo}
                                    />
                                </FormControl >
                                <FormControl margin="normal" fullWidth variant="standard">
                                    <TextField
                                        error={formik.touched.confirm && formik.errors.confirm}
                                        onBlur={formik.handleBlur}
                                        type={"password"}
                                        onChange={formik.handleChange}
                                        value={formik.values.confirm}
                                        label="Confirm password"
                                        name={"confirm"}
                                        variant="outlined"
                                        helperText={formik.touched.confirm && formik.errors.confirm}
                                    />
                                </FormControl >
                            </>
                            }
                        </DialogContent>
                        {!msgRender &&
                        <>
                            <DialogActions>
                                <Button className={classes.closeBtn} variant="contained" autoFocus onClick={handleClose}>
                                    Close
                                </Button>
                                <Button className={classes.okBtn}  style={{backgroundColor: theme.palette.primary.main}} variant="contained" type="submit" autoFocus>
                                    Save
                                </Button>
                            </DialogActions>
                        </>
                        }
                    </form>
            </Dialog>
        </div>
    );
}