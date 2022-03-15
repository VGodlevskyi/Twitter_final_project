import React, {useEffect, useState} from 'react';
import Tweet from "../components/Tweet/Tweet";
import {Grid, IconButton} from "@mui/material";
import TopTweets from "../images/Tweet/TopTweets";
import {makeStyles} from "@mui/styles";
import Page from "../components/global/Page";
import {useDispatch, useSelector} from "react-redux";
import {postActions} from "../redux/post/action";
import InfiniteScroll from "react-infinite-scroll-component";
import TweetForm from "../components/TweetForm/TweetForm";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";

const useStyles = makeStyles({
    pageList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        position: "relative"
    },
    topTweets: {
        position: "absolute !important",
        top: "20px !important",
        right: "15px !important",
    },
    tweetForm: {
        borderTop: "1px solid #eff3f4",
        borderBottom: "2px solid #eff3f4",
    },
    scrollComponent: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch"
    },
});

const Home = () => {

    const classes = useStyles();
    const defaultLimit = 6;
    const [view, setView] = useState(0);

    const dispatch = useDispatch();
    const postList = useSelector(state => state.post.postsList);

    const loading = false;

    useEffect(() => {
        dispatch(postActions.getAllPosts({view, limit: defaultLimit}));
    }, [view])

    return (
        <>
            <Page pageName={'Home'} className={classes.pageList}>
                <LoadingComponent visible={loading}/>
                <Grid container>
                    <IconButton aria-label="top-tweets" className={classes.topTweets}>
                        <TopTweets/>
                    </IconButton>

                    <Grid container
                          className={classes.tweetForm}
                    >
                        <TweetForm/>
                    </Grid>
                </Grid>
                <InfiniteScroll className={classes.scrollComponent} dataLength={postList.length}
                                next={() => setView(view + 1)} hasMore={true} loader={null}>
                    {postList
                        .sort(function (a, b) {
                            return new Date(b.createdDate) - new Date(a.createdDate);
                        })
                        .map(p => <Tweet tweetID={p.id} key={p.id} body={p.body} data={p} likes={p.likes} imgTwitUrl={p.imgTwitUrl}
                                         avatarUserUrl={p.user.avatarUrl}/>)}
                </InfiniteScroll>
            </Page>
        </>
    );
};

export default Home;