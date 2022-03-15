import React, {useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { styled } from '@mui/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CopyrightRoundedIcon from '@mui/icons-material/CopyrightRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import axios from "axios";
import img from "../../blank.png"
import Popover from "@mui/material/Popover";
import Autocomplete from '@mui/material/Autocomplete';
import SearchTwitter from "../SearchTwitter/SearchTwitter";
import {NavLink} from "react-router-dom";
import List from "@mui/material/List";
import {ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import FollowModal from "../../modals/FollowModal/FollowModal";
import clsx from "clsx";
import {useFetch} from "../../hooks/useFetch";
import {useSelector} from "react-redux";
import api from "../../services/API";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";

const useStyles = makeStyles(theme => ({
    mainSearchBlock: {
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        maxWidth: "350px !important",
        minWidth: "300px !important",
        backgroundColor: "white",
        ['@media (max-width:1140px)']: {
            display: "none !important"
        },
    },
    searchBox: {
        width: "900px !important",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between !important",
        alignItems: "stretch !important"
    },
    findButton: {
        width: "115px",
    },
    searchInput: {
        width: "348px",
        height: "44px",
        borderRadius: "22px",
        border: "1px solid transparent",
        backgroundColor: "#eff3f4",
        textIndent: "44px",
        '&:focus': {
            outline: "none",
            backgroundColor: "white",
            border: "1px solid #1d9bf0"
        },
    },
    searchIcon: {
        position: "absolute",
        left: "12px",
        top: "12px",
        color: "#1d9bf0"
    },
    cancelIcon: {
        position: "absolute",
        right: "12px",
        top: "12px",
        color: "#1d9bf0"
    },
    followBox: {
        marginTop: "10px",
        width: "350px",
        borderRadius: "20px",
        backgroundColor: "#f7f9f9",
    },
    followBoxCaption: {
        fontSize: "20px !important",
        fontWeight: "700 !important",
        padding: "10px !important"
    },
    linkDefault: {
        width: "348px",
        height: "52px",
        textDecoration: "none !important",
        '&:hover': {
            backgroundColor: "#eff1f1",
            cursor: "pointer"
        },
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
    },
    followBoxMoreText: {
        color: theme.palette.primary.main,
        paddingLeft: "10px"
    },
    followerCard: {
        width: "348px",
        height: "72px",
        paddingLeft: "10px",
        '&:hover': {
            backgroundColor: "#eff1f1",
            cursor: "pointer"
        },
    },
    searchCard: {
        width: "100px",
        height: "25px",
        // paddingTop: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        '&:hover': {
            backgroundColor: "#eff1f1",
            cursor: "pointer"
        },
    },
    followerAvatar: {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: "black",
    },
    followerName: {
        fontWeight: "700 !important",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        '&:hover': {
            textDecoration: "underline",
        },
    },
    searchBoxUserName: {
        fontWeight: "700 !important",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    followerTagName: {
        color: "#575e5e",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    searchResults: {
        position: "absolute",
        zIndex: "1",
        top: "50px",
        // left: "-12px",
        width: "348px",
        // height: "100px",
        // borderRadius: "20px",
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        backgroundColor: "white"
    },
    breadCrumbLink: {
        fontSize: "14px !important",
        color: "rgb(138,126,126) !important",
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
    followButtonLink: {
        display: "flex !important",
        justifyContent: "center !important",
        alignItems: "center !important",
        textDecoration: "none !important",
        color: "black !important",
    },
    buttonWrapper: {
        position: "relative",
    }
}));

const FollowButton = styled(Button)(({ theme }) => ({
    marginRight: "10px",
    height: '32px',
    borderRadius: '20px',
    fontSize: '15px',
    fontWeight: '700',
    textTransform: 'lowercase',
    color: 'white',
    backgroundColor: "black",
    '&:hover': {
        backgroundColor: "#000c",
    },
}));

const FollowBox = () => {
    const classes = useStyles();
    const user = useSelector(state => state.auth.user);

    const [follow, setFollow] = useState(false);

    const handleFollow = (e) => {
        e.preventDefault();
        setFollow(prev => !prev);

    }

    const [{data, loading}, getData] = useFetch({
        instant: true,
        initData: {
            total: 0,
            list: []
        },
        url: `/users/withoutSubscribe`,
        method: 'GET'
    })


    return (
        <Grid container alignItems="center" justifyContent="space-between" className={classes.mainSearchBlock}>

            <Grid container alignItems="center" justifyContent="center" className={classes.searchBox} >

                <SearchTwitter/>

            </Grid>

            <Grid container
                direction="column"
                justifyContent="space-around"
                alignItems="flex-start"

                className={classes.followBox}>

                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center">
                <Typography className={classes.followBoxCaption}>{data.list && data.list.length === 0 ? "Nothing to follow" : "You might like"}</Typography>
                </Grid>

                <List sx={{ width: '100%', maxWidth: 360, backgroundColor: '#f7f9f9' }}>

                    {data.list && data.list.filter(u => u.id !== user.id).map((user, i) => (
                    <Link key={i} className={classes.followButtonLink} href={`/user/${user.id}`} >
                        <ListItem  className={classes.followerCard} disablePadding
                        secondaryAction={<FollowModal isFollowing={user.isUserFollowingByCurrentUser} name={user.name} id={user.id}/>}>

                        <ListItemAvatar>
                            <ProfileAvatar route={`/user/${user.id}`} img={user.avatarUrl}/>
                        </ListItemAvatar>

                        <ListItemText primary={user.name}/>

                        </ListItem>
                    </Link>))}

                </List>

                <NavLink to={'/explore'} className={classes.linkDefault}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    className={classes.linkDefault}>
                    <Typography className={classes.followBoxMoreText}>Show more</Typography>
                </Grid>
                </NavLink>
            </Grid>

            <Breadcrumbs separator=" ">
                <Link underline="hover" color="inherit" target="_blank" className={classes.breadCrumbLink}
                      href="https://twitter.com/en/tos"
                >
                    Terms of Service
                </Link>
                <Link underline="hover" color="inherit" target="_blank" className={classes.breadCrumbLink}
                      href="https://twitter.com/en/privacy"
                >
                    Privacy Policy
                </Link>
                <Link underline="hover" color="inherit" target="_blank" className={classes.breadCrumbLink}
                      href="https://help.twitter.com/en/rules-and-policies/twitter-cookies"
                >
                    Cookie Policy
                </Link>
                <Link underline="hover" color="inherit" target="_blank" className={classes.breadCrumbLink}
                      href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo"
                >
                    Ads info
                </Link>
                <Typography
                    sx={{ display: 'flex', alignItems: 'center'}}
                    className={classes.breadCrumbLink}
                >
                    <CopyrightRoundedIcon className={classes.breadCrumbLink} sx={{ mr: 0.5}} />
                    2021 Twitter, Inc.
                </Typography>
            </Breadcrumbs>
        </Grid>
    );
};

export default FollowBox;