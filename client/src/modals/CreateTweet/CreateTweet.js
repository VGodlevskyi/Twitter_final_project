import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {makeStyles} from "@mui/styles";
import TweetForm from "../../components/TweetForm/TweetForm";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from "@mui/material/IconButton";

import {ReactComponent as Post} from '../../images/SideNav/Post.svg';
import {Fab} from "@mui/material";


const useStyles = makeStyles({
    mainBtn: {
        width: "247px",
        height: "47px",
        borderRadius: "30px !important",
        // ['@media (min-width:785px) and (max-width:1135px)']: {
        // ['@media (min-width:785px)']: {
            position: "absolute !important",
            // zIndex: "9999 !important",
            // bottom: "90px !important",
            // left: "5px !important",
            fontSize: "12px !important",
            // width: "50px !important",
            // height: "50px !important",
        // },
        ['@media (min-width:565px) and (max-width:785px)']: {
            // position: "relative !important",
            // zIndex: "9999 !important",
            // bottom: "10px !important",
            // left: "5px !important",
            // fontSize: "12px !important",
            // width: "50px !important",
            // height: "50px !important",
            // borderRadius: "25px !important",
            display: "none !important",
        },
        ['@media (max-width:565px)']: {
            display: "none !important",
        },
        ['@media (max-height:500px)']: {
            display: "none !important",
        },
    },
    fabBtn: {
        display: "none !important",
        ['@media (min-width:785px) and (max-width:1135px)']: {
            display: "none !important",
        },
        ['@media (min-width:565px) and (max-width:785px)']: {
            display: "block !important",
            position: "relative !important",
            // zIndex: "9999 !important",
            top: "20px !important",
            left: "10px !important",

        },
        ['@media (max-width:565px)']: {
            display: "block !important",
            position: "fixed !important",
            zIndex: "9 !important",
            bottom: "70px !important",
            right: "10px !important",
        },
        ['@media (max-height:500px)']: {
            display: "block",
        },
    },

});

const CreateTweet = ({extraHide}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const showRightContainer = location.pathname.includes('messages');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            {extraHide ? "" :
            <Button
                className={classes.mainBtn}
                style={{
                    backgroundColor: theme.palette.primary.main,

                }}
                sx={{
                    left: `${showRightContainer ? "215px !important" : "5px !important"}`,
                    bottom: `${showRightContainer ? "90px !important" : "90px !important"}`
                }}
                variant="contained" onClick={handleClickOpen}
            >
                Tweet
            </Button>}
            {extraHide ? "" :
            <Fab
                className={classes.fabBtn}
                style={{backgroundColor: theme.palette.primary.main}}
                onClick={handleClickOpen}>
                <Post />
            </Fab>}
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    style: {
                        borderRadius: `${fullScreen ? "0" : "20px"}`,
                        minWidth: `${fullScreen ? "" : "500px"}`,
                        minHeight: `${fullScreen ? "" : "320px"}`,
                    }}}
            >
                <DialogTitle id="responsive-dialog-title">
                    <IconButton onClick={handleClose}>
                        <CloseRoundedIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TweetForm isNav={true} number={2} onClose={handleClose}/>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateTweet;