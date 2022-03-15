import React from 'react';
import Page from "../components/global/Page";
import {makeStyles} from "@mui/styles";
import {NotificationsList} from "../components/NotificationsList/NotificationsList";

const useStyles = makeStyles({
    pageList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch"
    },
});


const NotificationsPage = () => {
    const classes = useStyles();

    return (
        <Page pageName={'Notifications'} className={classes.pageList}>
            <NotificationsList/>
        </Page>
    );
};

export default NotificationsPage;