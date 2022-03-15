import React from 'react';
import Page from "../components/global/Page";
import {makeStyles} from "@mui/styles";
import List from '@mui/material/List';
import ChangeTheme from "../modals/ChangeTheme/ChangeTheme";
import ChangePassword from "../modals/ChangePassword/ChangePassword";

const useStyles = makeStyles({
  pageList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  settingsList: {
    borderTop: "1px solid #eff3f4"
  }
});

const Settings = () => {
  const classes = useStyles();

  return (
    <Page pageName={'Settings'} className={classes.pageList}>
      <List disablePadding className={classes.settingsList}>
        <ChangeTheme/>
        <ChangePassword/>
      </List>
    </Page>
  );
};

export default Settings;