import React, {useEffect, useRef, useState} from 'react';
import Page from "../components/global/Page";
import {useLocation, useParams} from "react-router";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {makeStyles} from '@mui/styles';
import {TextField} from "@mui/material";
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Comment from "../components/Comment/Comment";
import ReplyModal from "../modals/ReplyModal/ReplyModal";
import api from "../services/API";
import {useSelector} from "react-redux";
import LikeModal from "../modals/LikeModal/LikeModal";
import RetweetModal from "../modals/RetweetModal/RetweetModal";
import ProfileAvatar from "../components/ProfileAvatar/ProfileAvatar";
import moment from "moment";
import img from "../blank.png";
import InfiniteScroll from "react-infinite-scroll-component";
import Tweet from "../components/Tweet/Tweet";

const useStyles = makeStyles({
    buttonBlock: {
        display: "flex !important",
        justifyContent: "space-evenly !important",
        alignItems: "center !important"
    },
    main: {
        border: "0 !important",
        boxShadow: "none !important",
    },
    tweetBody: {
        color: 'black !important',
        fontSize: '24px !important',
        fontWeight: '400 !important',
        marginLeft:'50px'
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
    infoBlock: {
        padding: "10px !important"
    },
    reply: {
        display: "flex !important",
        justifyContent: "space-between !important",
        alignItems: "center !important",
        padding: "20px !important"
    },
    replyInput: {
        width: "60%",
    },
    twitImg: {
        borderRadius: '20px',
        objectFit: 'cover',
        border: '0',
        margin: "10px 0",
        ['@media (max-width:565px)']: {
            width: "250px"
        },
    },
    scrollComponent: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch"
    },
});

const TweetPage = () => {
    const classes = useStyles();
    const replyRef = useRef(null);
    const location = useLocation();
    const [view, setView] = useState(0);
    const [comments, setComments] = useState([]);
    const [tweetData, setTweetData] = useState({});
    const [commentMessage, setCommentMessage] = useState("");

    const currentPostId = location.pathname.split("/")[2];

    useEffect(() => {
        api.get(`/post/get/${currentPostId}`).then(r => setTweetData(r));
    }, []);

    useEffect(fetchComments, [view])

    async function fetchComments() {
        const res = await api.get(`/comments/list?post=${currentPostId}&page=${view}&limit=6`)
        setComments([...comments, ...res]);
    }

    const user = useSelector(state => state.auth.user);

    const handleReply = async (e, msg) => {
        e.preventDefault();
        api.post(`/comments/save/${currentPostId}`, {
            body: msg
        });
        await fetchComments();
    }

    return (
        <Page pageName={'Tweet'}>
            <Divider/>

            <Card sx={{minHeight: 100}} className={classes.main}>
                <CardHeader
                    avatar={<ProfileAvatar route={`/user/${tweetData.user && tweetData.user.id}`} img={tweetData.user && tweetData.user.avatarUrl}/>}
                    title={tweetData.user && tweetData.user.name}
                    subheader={moment(tweetData.createdDate).format('MMMM Do YYYY, h:mm:ss a')}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" className={classes.tweetBody}>
                        {tweetData.body}
                    </Typography>
                </CardContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                {tweetData.imgTwitUrl ? <img src={tweetData.imgTwitUrl} alt="twit" className={classes.twitImg}/> : null}
                </Grid>
                <Divider/>
                <Grid className={classes.infoBlock}>
                    <Typography variant="caption" className={classes.follow}><span
                        className={classes.number}>{tweetData.numberOfRetweets}</span>Retweets</Typography>
                    <Typography variant="caption" className={classes.follow}><span
                        className={classes.number}>{tweetData.numberOfLikes}</span>Likes</Typography>
                </Grid>
                <Divider/>
                <CardActions className={classes.buttonBlock}>
                    <ReplyModal isBadgeInvisible={true} data={tweetData}/>

                    <RetweetModal isBadgeInvisible={true} data={tweetData}/>

                    <LikeModal postId={tweetData.id} isBadgeInvisible={true} likedByCurrentUser={tweetData.isLikedByCurrentUser}/>
                </CardActions>
            </Card>

            <Divider/>
            <Box className={classes.reply}>
                <Avatar src={user.avatarUrl} sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField onChange={ e => (setCommentMessage(e.target.value))} ref={replyRef} className={classes.replyInput} id="input-with-sx" placeholder="Tweet your reply" variant="standard" />
                <Button variant="contained" onClick={(e) => handleReply(e ,commentMessage)}>Reply</Button>
            </Box>
            <Divider/>

            {
                comments.length &&
                <InfiniteScroll className={classes.scrollComponent} dataLength={comments.length} next={() => setView(view + 1)} hasMore={true} loader={null}>
                    {comments.map((c, index) => <Comment key={index} data={c} />) }
                </InfiniteScroll>
            }

        </Page>
    );
};

export default TweetPage;