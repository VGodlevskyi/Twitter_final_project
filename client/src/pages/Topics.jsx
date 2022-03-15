import React from 'react';
import Page from "../components/global/Page";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
  pageList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
});

const Topics = () => {
  const classes = useStyles();

  return (
    <Page pageName={'Topics'} className={classes.pageList}>

    </Page>
  );
};

export default Topics;