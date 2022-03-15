import * as React from 'react';
import {useState} from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import {makeStyles} from '@mui/styles';
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ReplyModal from "../../modals/ReplyModal/ReplyModal";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import RetweetModal from "../../modals/RetweetModal/RetweetModal";
import LikeModal from "../../modals/LikeModal/LikeModal";
import moment from "moment";
import img from "../../blank.png";
import {useTheme} from "@mui/material/styles";
import TweetActions from "../Tweet/TweetActions";
import api from "../../services/API";
import {useHistory} from "react-router";

const useStyles = makeStyles({
    buttonBlock: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    main: {
        width: "100% !important",
        borderRadius: "0 !important",
        boxShadow: "none !important",
        '&:hover': {
            backgroundColor: "#eff3f4",
            cursor: "pointer"
        },
    },
    twitImg: {
        width: '-webkit-fill-available',
        borderRadius: '20px',
        border: '0',
        p: 4,
        marginLeft: '37px',
        maxWidth: "515px",
        maxHeight: "450px",
        objectFit: 'contain',
        ['@media (min-width:785px) and (max-width:1135px)']: {
            marginLeft: '5px',
        },
        ['@media (min-width:565px) and (max-width:785px)']: {
            marginLeft: '1px',
        },
        ['@media (max-width:565px)']: {
            marginLeft: '1px',
        },
    },
    twitBody: {
        marginLeft: '32px',
        // paddingRight:'1px'
    }
});

export default function Tweet({body, data, imgTwitUrl, tweetID, avatarUserUrl}) {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [expanded, setExpanded] = useState(false);
    const [following, setFollowing] = useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleFollow = () => {
        api.post(`/users/follow/${id}`);
    };

    const handleUnfollow = () => {
        api.post(`/users/unfollow/${id}`);
    };

    const redirectToTweetPage = (e) => {
        history.push(`/tweet/${data && data.id}`);
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div>
        {/*<NavLink style={{color: "black", textDecoration: "none"}} to={`/tweet/${data && data.id}`}>*/}
            <Grid sx={{minHeight: 100}} onClick={redirectToTweetPage} className={classes.main}>

                <Divider/>
                <CardHeader
                    avatar={<ProfileAvatar img={avatarUserUrl} route={`/user/${data.user && data.user.id}`}/>}
                    title={data.user && data.user.name}
                    subheader={moment(data.createdDate).format('MMM Do YYYY, h:mm:ss a')}
                    action={<TweetActions id={data.user && data.user.id} sub={data.user && data.user.isUserSubscribedByCurrentUser}/>}
                />
                <Container >
                    <CardContent className={classes.twitBody}>
                        <Typography style={{fontSize: theme.palette.primary.fontSizeCaption}} variant="subtitle1" color="text.secondary">
                            {body}
                        </Typography>
                    </CardContent>
                    {imgTwitUrl ? <img src={imgTwitUrl} alt="twit" className={classes.twitImg}/> : null}
                </Container>
                <CardActions className={classes.buttonBlock}>
                    <ReplyModal postID={tweetID} isBadgeInvisible={false} initialCount={data.numberOfComments} data={data && data}/>
                    <RetweetModal isBadgeInvisible={false} initialCount={data.numberOfRetweets}/>
                    <LikeModal postId={data.id} isBadgeInvisible={false} initialCount={data.numberOfLikes} likedByCurrentUser={data.isLikedByCurrentUser}/>
                </CardActions>
                <Divider/>
            </Grid>
        {/*</NavLink>*/}
        </div>
    );
}