import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MenuItem from "@mui/material/MenuItem";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {makeStyles, styled} from "@mui/styles";
import Menu from "@mui/material/Menu";
import {alpha} from "@mui/material";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LeaveChatModal from "../../modals/LeaveChatModal/LeaveChatModal";
import DeleteChatModal from "../../modals/DeleteChatModal/DeleteChatModal";
import {useEffect, useState} from "react";
import api from "../../services/API";
import {useSelector} from "react-redux";

import {ReactComponent as Follow} from '../Tweet/actionImg/follow.svg'
import {ReactComponent as Unfollow} from '../Tweet/actionImg/follow.svg';
import {classes} from "@mui/lab/ClockPicker/ClockNumber";

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
        marginTop: "0px",
        minWidth: 150,

        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '-0px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                // color: theme.palette.text.secondary,
                // marginRight: theme.spacing(0),
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

const useStyles = makeStyles({
    listBtn: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "10px 0px",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#f7f7f7"
        }
    },
    listIcon: {
        margin: "0px 5px"
    }
});

export default function DottedMenu({id, sub}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [chat, setChat] = useState(null);
    const [subbed, setSubbed] = useState(sub);

    useEffect(() => {
        setSubbed(sub);
    }, [sub]);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };

    const handleClose = (event) => {
        setAnchorEl(null);
        event.stopPropagation();
    };
    const [following, setFollowing] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [followingUsers, setFollowingUsers] = useState([]);

    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (id === user.id) {
            setCurrentUser(true);
        } else {
            setCurrentUser(false);
        }

        // let temp = followingUsers && followingUsers.find(u => u.id === id).length + " ///";
        // console.log(followingUsers.find(u => u.id === id ))
        // if (temp === 1) {
        //     setFollowing(true);
        // } else {
        //     setFollowing(false);
        // }

    }, [])

    const handleFollow = (e) => {
        e.stopPropagation();
        setSubbed(prev => !prev);
        api.post(`/users/follow/${id}`);
    };

    const handleUnfollow = (e) => {
        e.stopPropagation();
        setSubbed(prev => !prev)
        api.post(`/users/unfollow/${id}`);
    };

    return (
        <div>
            {!currentUser ?
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

                {/*{following ? <Follow onClick={handleFollow}>Follow</Follow> : <Unfollow onClick={handleUnfollow}>Unfollow</Unfollow>}*/}
                {subbed ?
                    <p onClick={handleFollow} className={classes.listBtn}><Follow className={classes.listIcon}/>Follow</p> :
                    <p onClick={handleUnfollow} className={classes.listBtn}><Unfollow className={classes.listIcon}/>Unfollow</p>}
            </StyledMenu>
        </div>
    );
}