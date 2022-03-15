import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles({
    root: {
        position: "absolute",
        background: "white",
        height: "100vh",
        width: "100%",
        zIndex: 100,
    },
    paper: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.55)",
    },
    closeIcon: {
        position: "absolute",
        top: "2%",
        left: "2%",
        cursor: "pointer"
    },
    form: {
        position: "relative",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        padding: "5%",
        width: "40%",
        height: "90vh",
        border: "1px solid gray",
        borderRadius: "25px",
        background: "white",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            width: "95%",
            height: "95vh"
        },
        ['@media (min-width: 786px) and (max-width:1400px)']: {
            width: "70%",
        },
    },
    loginFormHeader: {
        display: "flex",
        marginBottom: "5vh",
        justifyContent: "center"
    },
    logoWrapper: {
        display: "flex",
        alignItems: "center",
        marginRight: "15px !important"
    },
    loginFormHeaderText: {
        ['@media (min-width: 320px) and (max-width:785px)']: {
           fontSize: "1em !important"
        },
    },
    buttonWrapper: {
      display: "flex",
      width: "100%",
      justifyContent: "center"
    },
    buttons: {
        marginTop: "20px",
        width: "60%",
        display: "flex",
        flexDirection: "column",
        ['@media (min-width: 320px) and (max-width:564px)']: {
            width: "100%"
        },
        ['@media (min-width: 565px) and (max-width:785px)']: {
            width: "90%"
        },
        ['@media (min-width: 766px) and (max-width:1390px)']: {
            width: "65%"
        },
        ['@media (min-width: 1390px) and (max-width:1600px)']: {
            width: "55%"
        },
    },
    googleLogin: {
        color: "black",
        width: "100%",
        userSelect: "none",
        textDecoration: "none",
        marginBottom: "3%"
    },
    googleLoginContent: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "10px",
        border: "1px solid lightgray",
        borderRadius: "25px",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            position: "relative",
            justifyContent: "center",
        },
    },
    googleLoginIcon: {
        ['@media (min-width: 320px) and (max-width:785px)']: {
            marginRight: "10px",
        },
    },
    googleButtonText: {
        ['@media (min-width: 320px) and (max-width:785px)']: {
            fontSize: "1em !important"
        },
    },
    orInsert: {
        width: "100%",
        marginTop: "20px",
        position: "relative",
        marginBottom: "3%",
        textAlign: "center"
    },
    orLineLeft: {
        position: "absolute",
        left: 0,
        top: "50%",
        height: "0px",
        width: "44%",
        borderTop: "2px solid lightgray",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            width: "42%",
        },
    },
    orLineRight: {
        position: "absolute",
        right: 0,
        top: "50%",
        height: "0px",
        width: "44%",
        borderTop: "2px solid lightgray",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            width: "42%",
        },
    },
    inputWrapper: {
        marginTop: "20px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    submitButton: {
        background: "rgba(0,0,0,0.85) !important",
        padding: "10px !important",
        borderRadius: "25px !important",
        width: "60% !important",
        margin: "0 auto !important",
        marginTop: "35px !important",
        fontWeight: "bold !important",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            fontSize: ".75em !important",
            marginTop: "20px !important"
        },
    },
    cancelButton: {
        color: "rgba(0,0,0,0.85) !important",
        border: "1px solid rgba(0,0,0,0.85) !important",
        padding: "10px !important",
        borderRadius: "25px !important",
        width: "60% !important",
        margin: "0 auto !important",
        marginTop: "35px !important",
        fontWeight: "bold !important",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            fontSize: ".75em !important",
            marginTop: "20px !important"
        },
    },
    tryAgainButton: {
        backgroundColor: "green !important",
        padding: "10px !important",
        borderRadius: "25px !important",
        width: "60% !important",
        margin: "0 auto !important",
        marginTop: "35px !important",
        fontWeight: "bold !important",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            fontSize: ".75em !important"
        },
    },
    errors: {
        position: "relative",
        textAlign: "center",
        top: "10px",
        color: "red",
        fontSize: "1em"
    },
    emailFoundHeader: {
        fontSize: ".95em !important",
        color: "grey"
    },
    emailFoundMessage: {
        textAlign: "center",
        fontSize: "1.1em !important"
    },
    emailFound: {
        fontWeight: "bold"
    },
    msgBox: {
        width: "100%",
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
})