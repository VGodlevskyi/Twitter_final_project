import React, {useState} from 'react';
import {ReactComponent as Home} from '../../images/SideNav/Home.svg';
import {ReactComponent as Notifications} from '../../images/SideNav/Notifications.svg';
import {ReactComponent as Bookmarks} from '../../images/SideNav/Bookmark.svg';
import {ReactComponent as Messages} from '../../images/SideNav/Messages.svg';
import {ReactComponent as Hash} from '../../images/SideNav/Hash.svg';
import {ReactComponent as Profile} from '../../images/SideNav/Profile.svg';
import {ReactComponent as Help} from '../../images/SideNav/HelpCenter.svg';

import {ReactComponent as TwitterLogo} from '../../images/SideNav/Twitter.svg'

import {ReactComponent as HomeSelected} from '../../images/SideNavSelected/Home.svg';
import {ReactComponent as NotificationsSelected} from '../../images/SideNavSelected/Notifications.svg';
import {ReactComponent as BookmarksSelected} from '../../images/SideNavSelected/Bookmark.svg';
import {ReactComponent as MessagesSelected} from '../../images/SideNavSelected/Messages.svg';
import {ReactComponent as HashSelected} from '../../images/SideNavSelected/Hash.svg';
import {ReactComponent as ProfileSelected} from '../../images/SideNavSelected/Profile.svg';

import {ReactComponent as More} from '../../images/SideNav/More.svg';
import {ReactComponent as Topics} from '../../images/SideNav/Topics.svg';
import {ReactComponent as Settings} from '../../images/SideNav/Settings.svg';
import {NavLink} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {List, ListItem, ListItemIcon, ListItemText, Popover, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useHistory, useLocation} from "react-router";
import ProfileBar from "../ProfileBar/ProfileBar";
import CreateTweet from "../../modals/CreateTweet/CreateTweet";
import useProfile from "../../hooks/useProfile";

export const MENU_LIST = [
    {
        title: '',
        icon: <TwitterLogo/>,
        link: '/home',
    },
    {
        title: 'Home',
        icon: <Home/>,
        selectedIcon: <HomeSelected/>,
        link: '/home',
    },
    {
        title: 'Notifications',
        icon: <Notifications/>,
        selectedIcon: <NotificationsSelected/>,
        link: '/notifications',
    },
    {
        title: 'Explore',
        icon: <Hash/>,
        selectedIcon: <HashSelected/>,
        link: '/explore',
    },
    {
        title: 'Messages',
        icon: <Messages/>,
        selectedIcon: <MessagesSelected/>,
        link: '/messages',
    },
    {
        title: 'Bookmarks',
        icon: <Bookmarks/>,
        selectedIcon: <BookmarksSelected/>,
        link: '/bookmarks',
    },
    {
        title: 'Profile',
        icon: <Profile/>,
        selectedIcon: <ProfileSelected/>,
        link: '/profile',
    },
]

export const SUBMENU_LIST = {
    title: 'More',
    icon: <More/>,
    items: [
        {
            title: 'Topics',
            icon: <Topics/>,
            link: '/topics'
        },
        {
            title: 'Settings',
            icon: <Settings/>,
            link: '/settings'
        },
    ]
}

const useStyles = makeStyles((theme) => ({
    sideNavFS: {
        ['@media (min-width:785px) and (max-width:1135px)']: {},
        ['@media (min-width:565px) and (max-width:785px)']: {
            display: "none"
        },
        ['@media (max-width:565px)']: {
            display: "none"
        },
        ['@media (max-height:500px)']: {
            display: "none"
        },
    },
    sideNavMD: {
        ['@media (min-width:785px)']: {
            display: "none"
        },
        ['@media (min-width:565px) and (max-width:785px)']: {},
        ['@media (max-width:565px)']: {
            display: "none"
        },
        ['@media (max-height:500px)']: {
            display: "none"
        },
    },
    linkDefault: {
        textDecoration: "none",
        color: "black",
        fontSize: "24px"
    },
    listItemSize: {},
    listItemDefault: {
        borderRadius: "25px !important",
        ['@media (min-width:785px) and (max-width:1135px)']: {},
        ['@media (min-width:565px) and (max-width:785px)']: {},
        ['@media (max-width:565px)']: {},
        primaryBold: {
            fontWeight: "700 !important",
            color: "blue !important",
        }
    }
}));

class ImageIcon extends React.Component {
    render() {
        return null;
    }
}

const SideNav = ({history, mainBlockStyles}) => {
    const classes = useStyles();
    const theme = useTheme();
    const breakPoint = useMediaQuery(theme.breakpoints.down('md'));
    const historyPath = useHistory();
    const location = useLocation();

    const [currentActiveNav, setCurrentActiveNav] = useState(1);

    let madeNavLinkThick = (i) => {

        switch (historyPath.location.pathname) {
            case '/home':
                setCurrentActiveNav(1);
                break;
            case '/notifications':
                setCurrentActiveNav(2);
                break;
            case '/explore':
                setCurrentActiveNav(3);
                break;
            case '/messages':
                setCurrentActiveNav(4);
                break;
            case '/bookmarks':
                setCurrentActiveNav(5);
                break;
            case '/profile':
                setCurrentActiveNav(6);
                break;
            default:
                6;
        }

    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTwitterLogoClick = () => {
        historyPath.push('/home');
        setCurrentActiveNav(0);
    };

    const handleTwitterSubMenuClick = (e) => {
        setCurrentActiveNav(0);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [openModalTweet, setOpenModalTweet] = useState(false);
    const handleCloseModalTweet = () => {
        setOpenModalTweet(false);
    }
    const handleOpenModalTweet = () => {
        setOpenModalTweet(true);
    };

    const {logoutCallback} = useProfile();

    return (
        <>
            <List className={classes.sideNavFS} style={mainBlockStyles}>

                {MENU_LIST.map((item, i) =>
                    i === 0 ?
                        <IconButton key={i} style={{marginLeft: "10px"}}
                                    onClick={handleTwitterLogoClick}>{item.icon}</IconButton>
                        :
                        <ListItem className={classes.listItemSize} disablePadding key={i}
                                  onClick={() => madeNavLinkThick(i)}>
                            <NavLink className={classes.linkDefault} to={item.link}>
                                <ListItemButton className={classes.listItemDefault}>
                                    <Tooltip title={item.title}>
                                        <ListItemIcon>
                                            {location.pathname.includes(item.link) ? item.selectedIcon : item.icon}
                                        </ListItemIcon>
                                    </Tooltip>
                                    <ListItemText primary={<span style={{
                                        fontWeight: `${location.pathname.includes(item.link) ? "900" : "400"}`,
                                        fontSize: "20px"
                                    }}>{item.title}</span>}/>
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                )}

                <ListItem disablePadding onClick={() => handleTwitterSubMenuClick()}>
                    <ListItemButton aria-describedby={id} onClick={handleClick} className={classes.listItemDefault}>
                        <ListItemIcon>
                            {SUBMENU_LIST.icon}
                        </ListItemIcon>
                        <ListItemText primary={<span style={{fontSize: "20px"}}>More</span>}/>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            {/*{SUBMENU_LIST.items.map((item, i) => <NavLink key={i} className={classes.linkDefault} to={item.link}><Typography sx={{ p: 2, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>{item.icon}&nbsp;{item.title}</Typography></NavLink>)}*/}
                            <NavLink className={classes.linkDefault} to={SUBMENU_LIST.items[1].link}><Typography sx={{
                                p: 2,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}>{SUBMENU_LIST.items[1].icon}&nbsp;{SUBMENU_LIST.items[1].title}</Typography></NavLink>
                            <a target="_blank" href="https://help.twitter.com/en"
                               className={classes.linkDefault}><Typography sx={{
                                p: 2,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}><Help/>&nbsp;Help Center</Typography></a>

                        </Popover>
                    </ListItemButton>
                </ListItem>
                <ProfileBar/>
            </List>

            <List className={classes.sideNavMD}>

                {MENU_LIST.map((item, i) =>
                    i === 0 ?
                        <IconButton key={i} style={{marginLeft: "17px"}}
                                    onClick={handleTwitterLogoClick}>{item.icon}</IconButton>
                        :
                        <ListItem key={i} onClick={() => madeNavLinkThick(i)}>
                            <NavLink className={classes.linkDefault} to={item.link}>
                                <Tooltip title={item.title}>
                                    <IconButton>
                                        {location.pathname.includes(item.link) ? item.selectedIcon : item.icon}
                                    </IconButton>
                                </Tooltip>
                            </NavLink>
                        </ListItem>)}

                <ListItem onClick={() => handleTwitterSubMenuClick()}>
                    <IconButton>

                        <More aria-describedby={id} onClick={handleClick}/>

                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            {/*{SUBMENU_LIST.items.map((item, i) => <NavLink key={i} className={classes.linkDefault} to={item.link}><Typography sx={{ p: 2, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>{item.icon}&nbsp;{item.title}</Typography></NavLink>)}*/}
                            <NavLink className={classes.linkDefault} to={SUBMENU_LIST.items[1].link}><Typography sx={{
                                p: 2,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}>{SUBMENU_LIST.items[1].icon}&nbsp;{SUBMENU_LIST.items[1].title}</Typography></NavLink>

                            <Typography onClick={logoutCallback} sx={{
                                p: 2,
                                marginLeft: "2px",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}>@&nbsp;Log Out</Typography>

                            <a target="_blank" href="https://help.twitter.com/en"
                               className={classes.linkDefault}><Typography sx={{
                                p: 2,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}><Help/>&nbsp;Help Center</Typography></a>
                        </Popover>
                    </IconButton>
                </ListItem>

            </List>
            {/*<TweetModal open={openModalTweet} onClose={handleCloseModalTweet}/>*/}
            <CreateTweet/>
        </>
    );
};

export default SideNav;