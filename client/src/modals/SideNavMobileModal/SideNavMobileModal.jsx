import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import {MENU_LIST, SUBMENU_LIST} from "../../components/global/SideNav";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from "@mui/material/IconButton";
import Divider from '@mui/material/Divider';
import {ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import List from "@mui/material/List";

//Dialog
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import FollowerListModal from "../FollowerListModal/FollowerListModal";
import api from "../../services/API";

import {ReactComponent as Help} from '../../images/SideNav/HelpCenter.svg';
import useProfile from "../../hooks/useProfile";


const useStyles = makeStyles({
    sideNavMobileContainer: {
        display: "none",
        margin: "0 30px 0 10px",
        ['@media (max-width:565px)']: {
            display: "block"
        },
        ['@media (max-height:500px)']: {
            display: "block"
        },
    },
    body: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "9",
        width: "100%",
        height: "100%",
    },
    hide: {
        display: "none"
    },
    nav: {
        backgroundColor: "white",
        width: "280px",
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        zIndex: "3",
        overflow: "auto"
    },
    navHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 10px"
    },
    navBody: {},
    shortInfo: {
        marginTop: "10px",
        marginLeft: "16px"
    },
    followerBlock: {
        display: "flex",
        alignItems: "center",
    },
    follow: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: "5px !important",
        color: "black",
        fontSize: "14px !important"
    },
    number: {
        marginRight: "5px",
        fontSize: "16px",
        fontWeight: "700",
        color: "black"
    },
    userName: {
        fontWeight: "700"
    },
    linkDefault: {
        textDecoration: "none",
        color: "black",
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

export default function SideNavMobileModal() {
    const classes = useStyles();

    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    let getUsers = () => {
        api.get(`/users/profile/following`).then(r => setFollowing(r))
        api.get(`/users/profile/followers`).then(r => setFollowers(r))
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const user = useSelector(state => state.auth.user);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const {logoutCallback} = useProfile();

    return (
        <div className={classes.sideNavMobileContainer}>
            <Avatar onClick={handleOpen} src={user.avatarUrl}/>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Grid className={classes.nav}>
                    <Grid className={classes.navHeader}>
                        <h4>Account Info</h4>
                        <IconButton onClick={() => handleClose()}>
                            <CloseRoundedIcon/>
                        </IconButton>
                    </Grid>
                    <Divider/>
                    <Grid className={classes.navBody}>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={user.avatarUrl}/>
                                </ListItemAvatar>
                            </ListItem>

                            <ListItem>
                                <ListItemText primary={<span className={classes.userName}>{user.name}</span>}/>
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Grid className={classes.followerBlock}>
                                            <FollowerListModal isFollowing={true} followingUsers={following}/>
                                            <FollowerListModal isFollowing={false} followingUsers={followers}/>
                                        </Grid>}
                                />
                            </ListItem>
                        </List>


                        <List>
                            <NavLink className={classes.linkDefault} to={MENU_LIST[6].link}>
                                <ListItem>
                                    <IconButton>
                                        {MENU_LIST[6].icon}
                                    </IconButton>
                                    <ListItemText primary="Profile"/>
                                </ListItem>
                            </NavLink>

                            <NavLink className={classes.linkDefault} to={MENU_LIST[5].link}>
                                <ListItem>
                                    <IconButton>
                                        {MENU_LIST[5].icon}
                                    </IconButton>
                                    <ListItemText primary="Bookmarks"/>
                                </ListItem>
                            </NavLink>

                            <a className={classes.linkDefault} target="_blank" href="https://help.twitter.com/en">
                                <ListItem>
                                    <IconButton>
                                        <Help/>
                                    </IconButton>
                                    <ListItemText primary="Help Center"/>
                                </ListItem>
                            </a>

                            <NavLink className={classes.linkDefault} to={SUBMENU_LIST.items[1].link}>
                                <ListItem>
                                    <IconButton>
                                        {SUBMENU_LIST.items[1].icon}
                                    </IconButton>
                                    <ListItemText primary="Settings"/>
                                </ListItem>
                            </NavLink>

                            <Divider/>
                            <ListItem onClick={logoutCallback}>
                                <ListItemText primary="Log Out"/>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}