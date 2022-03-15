import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import {Tooltip} from "@mui/material";
import api from "../../services/API";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    followButtonDone: {
        // position: "absolute",
        // left: "50px",
        // bottom: "250px",
        height: '32px !important',
        backgroundColor: "white !important",
        color: "red !important",
        borderRadius: '20px !important',
        border: "1px solid #cfd9de !important",
    },
    followButton: {
        // position: "absolute",
        // left: "50px",
        // bottom: "250px",
        height: '32px !important',
        borderRadius: '20px !important',
        fontSize: '15px !important',
        fontWeight: '700 !important',
        textTransform: 'lowercase !important',
        color: 'white !important',
        backgroundColor: "black !important",
        border: "1px solid black !important",
        '&:hover': {
            backgroundColor: "#000c !important",
        },
    },

});

const FollowModal = ({id, name, isFollowing, styles}) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [follow, setFollow] = useState(!!isFollowing);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    useEffect(() => {
        setFollow(isFollowing);
    }, [isFollowing])

    const handleClickOpen = (e, isOpen) => {
        if (isOpen) {
            setOpen(true);
        }

        e.preventDefault();

        if (!follow) {
            api.post(`/users/follow/${id}`);

            setFollow(prev => !prev);
        }

    };

    const handleClose = (unfollow) => {
        if (unfollow) {
            api.post(`/users/unfollow/${id}`);
            setFollow(prev => !prev);
        }
        setOpen(false);
    };

    const handleDefault = (e) => {
        e.preventDefault();
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    const [caption, setCaption] = useState(false);

    const handleMouseOverChange = () => {
        setCaption(true);
    };

    const handleMouseLeaveChange = () => {
        setCaption(false);
    };

    return (
        <React.Fragment>
            {follow ?
                <Button style={styles} className={classes.followButtonDone} onClick={(event) => handleClickOpen(event, true)}>
                        {!caption ?
                            <span onMouseOver={handleMouseOverChange} onMouseLeave={handleMouseLeaveChange} style={{textTransform: "lowercase", color: "#0f1419", fontWeight: "700"}}><span style={{textTransform: "uppercase"}}>F</span>ollowing</span>
                            :
                            <span onMouseOver={handleMouseOverChange} onMouseLeave={handleMouseLeaveChange} style={{textTransform: "lowercase", color: "red", fontWeight: "700"}}><span style={{textTransform: "uppercase"}}>U</span>nfollow</span>}
                </Button>
                : <Button style={styles} className={classes.followButton}  onClick={(event) => handleClickOpen(event, false)}>
                    <span style={{textTransform: "lowercase"}}><span style={{textTransform: "uppercase"}}>F</span>ollow</span>
                </Button>
            }
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={() => handleClose(false)}
                PaperProps={{style: { borderRadius: "20px", width: "260px" }}}
                onClick={handleDefault}
            >
                <DialogTitle style={{fontWeight: "700", fontSize: "20px"}}>Unfollow {name}?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Their Tweets will no longer show up in your home timeline. You can still view their profile, unless their Tweets are protected.
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Button
                        style={{width: "240px", height: "44px", borderRadius: "25px", backgroundColor: "black", color: "white"}}
                        onClick={() => handleClose(true)}>Unfollow</Button>
                    <Button
                        style={{width: "240px", height: "44px", borderRadius: "25px", border: "1px solid #999999", color: "black", margin: "5px 0 0 0"}}
                        onClick={() => handleClose(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default FollowModal;