import React from 'react';
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
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Grid from "@mui/material/Grid";
import api from "../../services/API";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    chatItemRight: {
        // position: "absolute",
        // top: "2%",
        // left: "0",
        // width: "5px",
        // height: "5px",
    },
    chatItemLeft: {
        // position: "absolute",
        // top: "2%",
        // left: "98%",
        // width: "5px",
        // height: "5px",
    },
});

const DeleteMessageModal = ({msgId, onSuccess, side}) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        api.delete(`/chats/message/${msgId}`)
            .then(() => {
                onSuccess(msgId);
            });


        setOpen(false);
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

    return (
        <React.Fragment>
            <IconButton onClick={handleClickOpen} ><ClearRoundedIcon style={{color: "#536471", width: "15px", height: "15px"}} /></IconButton>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                PaperProps={{style: { borderRadius: "20px", width: "260px" }}}
            >
                <DialogTitle style={{fontWeight: "700", fontSize: "20px"}}>Delete Message?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This can’t be undone and it will be removed from chat. </DialogContentText>
                </DialogContent>
                <DialogActions style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Button
                        style={{width: "240px", height: "44px", borderRadius: "25px", backgroundColor: "red", color: "white"}}
                        onClick={handleClose}>Delete</Button>
                    <Button
                        style={{width: "240px", height: "44px", borderRadius: "25px", border: "1px solid #999999", color: "black", margin: "5px 0 0 0"}}
                        onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default DeleteMessageModal;