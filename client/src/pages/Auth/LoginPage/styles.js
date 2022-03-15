import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles({
    rootContainer: {
        display: "grid",
        gridTemplateColumns: "47% 53%",
        width: "100%",
        ['@media (min-width: 320px) and (max-width:785px)']: {
           display: "block",
           height: "100vh"
        },
    },
    imageWrapper: {
        gridColumn: 1,
        height: "100vh",
        backgroundImage: "url(https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            display: "none",
        },
    },
    contentWrapper: {
        height: "100vh",
        boxSizing: "border-box",
        gridColumn: 2,
        display: "flex",
        flexDirection: "column",
        paddingTop: "8vh",
        paddingLeft: "3%",
        ['@media (min-width: 320px) and (max-width:785px)']: {
           paddingTop: "2vh",
           alignItems: "center"
        },

    },
    contentHeader: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        userSelect: "none",
        marginBottom: "8%",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            marginBottom: "5vh",
            alignItems: "center"
        },
    },
    logoWrapper: {
        width: "100%",
        display: "flex",
        marginBottom: "3%",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            justifyContent: "center"
        },
    },
    contentTitle: {
        display: "flex",
        flexDirection: "column"
    },
    headerText: {
        marginBottom: "5%",
        ['@media (min-width: 320px) and (max-width:785px)']: {
           textAlign: "center",
            fontSize: "1em",
        },
    },
    headerTextTitle: {

        ['@media (max-width:1600px)']: {
            fontSize: "3.5em !important",
        },
        ['@media (max-width:1200px)']: {
            fontSize: "2.5em !important",
        },
        ['@media (max-width:785x)']: {
            fontSize: "2em !important",
        },
        ['@media (max-width:568px)']: {
            fontSize: "1.5em !important",
        },
    },
    headerTextTitleSecondary: {
        ['@media (max-width:1390px)']: {
            fontSize: "2em !important",
        },
        ['@media (max-width:785px)']: {
            fontSize: "1.5em !important",
            textAlign: "center"
        },
        ['@media (max-width:565px)']: {
            fontSize: ".95em !important",
            textAlign: "center"
        },
    },
    buttons: {
        width: "40%",
        display: "flex",
        flexDirection: "column",
        ['@media (min-width: 320px) and (max-width:568px)']: {
            width: "90%",
        },
        ['@media (min-width: 56px) and (max-width:785px)']: {
            width: "80%",
        },
        ['@media (min-width: 766px) and (max-width:1390px)']: {
            width: "65%",
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
        padding: "10px",
        border: "1px solid lightgray",
        borderRadius: "25px",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            justifyContent: "center",
        },
    },
    googleLoginIcon: {
        ['@media (min-width: 320px) and (max-width:785px)']: {
          marginRight: "10px"
        },
    },
    googleButtonText: {
        ['@media (min-width: 320px) and (max-width:785px)']: {
            fontSize: "1em !important"
        },
    },
    orInsert: {
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
    registerButton: {
        padding: "10px !important",
        borderRadius: "25px !important",
        width: "100% !important",
        fontWeight: "bold !important",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            fontSize: ".75em !important"
        },
    },
    signInBlock: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            marginTop: "10%"
        },
    },
    signInButton: {
        marginTop: "5% !important",
        padding: "10px !important",
        borderRadius: "25px !important",
        width: "100% !important",
        fontWeight: "bold !important",
    },
    alreadySignedText: {
        fontSize: "1.25em !important",
        fontWeight: "bold !important",
        ['@media (min-width: 320px) and (max-width:785px)']: {
            fontSize: ".9em !important"
        },
    },
})
