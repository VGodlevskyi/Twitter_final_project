import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MenuItem from "@mui/material/MenuItem";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {styled} from "@mui/styles";
import Menu from "@mui/material/Menu";
import {alpha} from "@mui/material";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LeaveChatModal from "../../modals/LeaveChatModal/LeaveChatModal";
import DeleteChatModal from "../../modals/DeleteChatModal/DeleteChatModal";
import {useEffect, useState} from "react";
import api from "../../services/API";
import {useSelector} from "react-redux";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                // color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function DottedMenu({chatId, updateFn, handleClose: closeModal}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [chat, setChat] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        api.get(`/chats/single/${chatId}`).then(r => setChat(r));
    }, []);

    return (
        <div>
            {chat && chat.initiatorId !== user && user.id ?
            <IconButton aria-label="settings" onClick={handleClick}>
                <MoreHorizRoundedIcon />
            </IconButton> : ""}
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                 <DeleteChatModal handleCloseModal={closeModal} updateFn={updateFn} chatID={chatId}/>

                {/*<LeaveChatModal handleCloseModal={closeModal} updateFn={updateFn} chatID={chatId}/>*/}

            </StyledMenu>
        </div>
    );
}