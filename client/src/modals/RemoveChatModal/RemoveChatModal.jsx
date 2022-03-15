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
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import api from "../../services/API";

const RemoveChatModal = ({chatID}) => {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (deleteChat) => {
        if (deleteChat) {
            api.delete(`/chats/remove/${chatID}`);
        }
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
            <IconButton onClick={handleClickOpen} >
                <ExitToAppRoundedIcon />
            </IconButton>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={() => handleClose(false)}
                PaperProps={{style: { borderRadius: "20px", width: "260px" }}}
            >
                <DialogTitle style={{fontWeight: "700", fontSize: "20px"}}>Delete Chat?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This can’t be undone and it will delete all messages.
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Button
                        style={{width: "240px", height: "44px", borderRadius: "25px", backgroundColor: "red", color: "white"}}
                        onClick={() => handleClose(true)}>Delete</Button>
                    <Button
                        style={{width: "240px", height: "44px", borderRadius: "25px", border: "1px solid #999999", color: "black", margin: "5px 0 0 0"}}
                        onClick={() => handleClose(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default RemoveChatModal;