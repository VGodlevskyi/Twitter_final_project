import React, {useEffect, useState} from 'react';
import Page from "../components/global/Page";
import {makeStyles} from "@mui/styles";
import Tweet from "../components/Tweet/Tweet";
import InfiniteScroll from "react-infinite-scroll-component";
import api from "../services/API";

const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  pageLink: {
    display: "flex",
    width: "100%",
    justifyContent: "center"
  }
});

const Explore = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [viewNumber,   setViewNumber] = useState(0);
  const defaultLimit = 6;

  async function fetchPosts() {
    const data = await api.get(`/explore/list?page=${viewNumber}&limit=${defaultLimit}`)
    setPosts([...posts, ...data]);
  }

  useEffect(fetchPosts, [viewNumber])

  return (
    <Page pageName={'Explore'} >
      <InfiniteScroll className={classes.root} dataLength={posts.length} next={() => setViewNumber(viewNumber + 1)} hasMore={true} loader={null}>
            { posts.map(p => <Tweet key={p.id} body={p.body} data={p} likes={p.likes} imgTwitUrl={p.imgTwitUrl} avatarUserUrl={p.user.avatarUrl}/>) }
        </InfiniteScroll>
    </Page>
  );
};

export default Explore;