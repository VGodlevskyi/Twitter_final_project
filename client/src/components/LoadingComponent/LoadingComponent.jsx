import {CircularProgress} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    visible: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        background: "rgba(255,255,255,.4)",
        zIndex: 9999
    },
    invisible: {
        display: "none"
    }
}));

const LoadingComponent = ({visible}) => {
    const classes = useStyles();
    return (
        <div className={visible? classes.visible : classes.invisible}>
            <div>
                <CircularProgress size={70} color="primary" />
            </div>
        </div>
    );
}

export default LoadingComponent;