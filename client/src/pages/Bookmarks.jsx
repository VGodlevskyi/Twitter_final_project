import React from 'react';
import Page from "../components/global/Page";
import {useFetch} from "../hooks/useFetch";
import Tweet from "../components/Tweet/Tweet";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
  pageList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
});

const Bookmarks = () => {
  const classes = useStyles();

  const [{data, loading}, getData] = useFetch({
    instant: true,
    initData: {
      total: 0,
      list: []
    },
    url: "/post/likes",
    method: 'GET'
  })

  return (
    <Page pageName={'Bookmarks'} className={classes.pageList}>

        {data.list.map(p => (
            <Tweet key={p.id} body={p.body} data={p} link={p.id} avatarUserUrl={p.user.avatarUrl}/>
        ))}

    </Page>
  );
};

export default Bookmarks;