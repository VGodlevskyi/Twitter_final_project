import React, {useEffect, useState} from 'react';
import Page from "../components/global/Page";
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import img from "../images/defaultGray.png";
import EditProfile from "../modals/EditProfile/EditProfile";
import Typography from '@mui/material/Typography';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FollowerListModal from "../modals/FollowerListModal/FollowerListModal";
import api from "../services/API";
import Avatar from "@mui/material/Avatar";
import InfiniteScroll from "react-infinite-scroll-component";
import Tweet from "../components/Tweet/Tweet";
import {postActions} from "../redux/post/action";

export const useStyles = makeStyles({
    pageList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch"
    },
    userPics: {
        position: "relative",
        height: "200px",
        // backgroundColor: "rgb(172,164,164)",
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
    },
    scrollComponent: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch"
    },
});

const Profile = () => {
    const classes = useStyles();

    const user = useSelector(state => state.auth.user);
    const defaultLimit = 6;
    const [view, setView] = useState(0);

    const dispatch = useDispatch();
    const postList = useSelector(state => state.post.postsList);
    let date = new Date(user.createdDate);

    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        dispatch(postActions.getUserPosts({view, limit: defaultLimit}));
    }, [view])


    let getUsers = () => {
        api.get(`/users/profile/following`).then(r => setFollowing(r))
        api.get(`/users/profile/followers`).then(r => setFollowers(r))
    }

    return (
        <Page pageName={'Profile'} className={classes.pageList}>
            <Grid className={classes.userPics}>
                <img className={classes.bgiAdjust} src={user.profileBackgroundUrl || img} alt="bg"/>

                {/*<img src={img} alt="avatar" className={classes.avatarImgPic}/>*/}
                <Avatar className={classes.avatarImgPic} src={user.avatarUrl} alt="Avatar"/>
                <EditProfile avatarUrl={user.avatarUrl} profileBackgroundUrl={user.profileBackgroundUrl}/>
            </Grid>

            <Box className={classes.userInfo}>
                <Card variant="outlined" className={classes.default}>
                    <CardContent className={classes.default}>
                        <Typography variant="caption"
                                    className={classes.fullName}>{user.name} {user.surname}</Typography>
                        {/*<Typography variant="caption" className={classes.tagName}>@Tagname</Typography>*/}
                        <Typography variant="caption" className={classes.bio}>{user.bio}</Typography>
                        <Typography variant="caption" className={classes.bio}>{user.location}</Typography>
                        <Typography variant="caption" className={classes.bio}>{user.website}</Typography>

                        <Typography variant="caption"
                                    className={classes.regDate}><CalendarTodayRoundedIcon/>&nbsp;Joined {moment(user.createdDate).format('yyyy-MM-DD')}
                        </Typography>

                        <Grid className={classes.followerBlock}>
                            <FollowerListModal isFollowing={true} followingUsers={following}/>
                            <FollowerListModal isFollowing={false} followingUsers={followers}/>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>

            {/*<InfiniteScroll className={classes.scrollComponent} dataLength={postList.length}*/}
            {/*                next={() => setView(view + 1)} hasMore={true} loader={null}>*/}
            <ProfileTabs userId={user}/>
            {/*</InfiniteScroll>*/}

        </Page>
    );
};

export default Profile;