import React, {useEffect, useState} from 'react';
import Page from "../components/global/Page";
import {makeStyles} from "@mui/styles";
import {useFetch} from "../hooks/useFetch";
import Grid from "@mui/material/Grid";
import img from "../images/defaultGray.png";
import Typography from '@mui/material/Typography';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";
import moment from "moment";
import {useSelector} from "react-redux";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FollowModal from "../modals/FollowModal/FollowModal";
import {useLocation} from "react-router";
import api from "../services/API";
import Avatar from '@mui/material/Avatar';
import {CircularProgress} from "@mui/material";

const useStyles = makeStyles({
    pageList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch"
    },
    userPics: {
        position: "relative",
        height: "200px",
        backgroundColor: "black",
    },
    bgiAdjust: {
        objectFit: "cover !important",
        height: "200px",
        width: "100%",
    },
    avatarImgPic: {
        width: "130px !important",
        height: "130px !important",
        position: "absolute !important",
        bottom: "-65px !important",
        left: "10px !important",
        borderRadius: "50% !important",
        border: "4px solid white !important",
    },
    userInfo: {
        marginTop: "70px",
        border: "none !important",
        display: "flex !important",
        flexDirection: "column !important",
    },
    fullName: {
        fontSize: "20px !important",
        fontWeight: "700 !important"
    },
    tagName: {
        fontSize: "14px !important",
        color: "#677682 !important"
    },
    bio: {
        display: "flex !important",
        fontSize: "14px !important",
        margin: "10px 0 10px !important"
    },
    regDate: {
        color: "#677682 !important",
        display: "flex !important",
        alignItems: "center !important",
    },
    followerBlock: {
        marginTop: "10px !important",
        display: "flex !important"
    },
    follow: {
        marginLeft: "5px !important",
        color: "#677682 !important",
        fontSize: "16px !important"
    },
    number: {
        marginRight: "5px !important",
        fontSize: "18px !important",
        fontWeight: "700 !important",
        color: "black !important"
    },
    default: {
        borderRadius: "0 !important",
        border: "none !important"
    }
});

const UserPage = () => {
    const classes = useStyles();

    const location = useLocation();

    let [usersPageData, setUsersPageData] = useState(null);

    useEffect(() => {
        api.get(`/users/get/${location.pathname.split("/")[2]}`).then(r => setUsersPageData(r));
    }, []);

    const [follow, setFollow] = useState(false);
    const handleFollow = () => {
        setFollow(prev => !prev);
    }

    const user = useSelector(state => state.auth.user);
    // console.log(usersPageData)
    if (!usersPageData) return <CircularProgress/>;



    return (
        <Page pageName={'User Page'} className={classes.pageList}>
            <Grid className={classes.userPics}>
                <img className={classes.bgiAdjust} src={usersPageData.profileBackgroundUrl} alt="bg"/>
                <Avatar className={classes.avatarImgPic}  src={usersPageData.avatarUrl} alt="Avatar" />
                <FollowModal id={usersPageData.id} styles={{position: "absolute", bottom: "-42px", right: "10px"}} isFollowing={usersPageData && usersPageData.isUserFollowingByCurrentUser}/>
            </Grid>

            <Box className={classes.userInfo}>
                <Card variant="outlined" className={classes.default}>
                    <CardContent className={classes.default}>
                        <Typography variant="caption"
                                    className={classes.fullName}>{usersPageData.name} {usersPageData.surname}</Typography>
                        <Typography variant="caption" className={classes.bio}>{usersPageData.bio}</Typography>
                        <Typography variant="caption"
                                    className={classes.regDate}><CalendarTodayRoundedIcon/>&nbsp;Joined {moment(usersPageData.createdDate).format('yyyy-MM-DD')}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            <ProfileTabs userId={usersPageData.id}/>

        </Page>
    );
};

export default UserPage;