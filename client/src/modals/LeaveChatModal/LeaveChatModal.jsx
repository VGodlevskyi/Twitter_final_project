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
import {useSelector} from "react-redux";

const LeaveChatModal = ({chatID, updateFn, handleCloseModal}) => {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const user = useSelector(state => state.auth.user);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (removeUser) => {
        if (removeUser) {
            api.delete(`/chats/single/${chatID}`, {data: [user.id]}).then(() => {
                updateFn();
                handleCloseModal();
            });
        }
        setOpen(false);
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    return (
        <React.Fragment>
            <MenuItem disableRipple onClick={handleClickOpen}>
                <ExitToAppRoundedIcon style={{color: "black"}} />
                Leave conversation
            </MenuItem>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={() => handleClose(false)}
                PaperProps={{style: { borderRadius: "20px", width: "260px" }}}
            >
                <DialogTitle style={{fontWeight: "700", fontSize: "20px"}}>Leave?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to leave conversation?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Button
                        style={{width: "240px", height: "44px", borderRadius: "25px", backgroundColor: "black", color: "white"}}
                        onClick={() => handleClose(true)}>Leave</Button>
                    <Button
                        style={{width: "240px", height: "44px", borderRadius: "25px", border: "1px solid #999999", color: "black", margin: "5px 0 0 0"}}
                        onClick={() => handleClose(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default LeaveChatModal;