import React from "react";
import {makeStyles} from "@mui/styles";
import {NotificationRegularIcon, typeToIcon} from "./Icons";
import {typeToText} from "./Texts";

const useStyles = makeStyles({
    singleNotification: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '30px 1fr',
        gridGap: '0px 10px',
        margin: '15px 0',
    },
});


export const NotificationItem = ({notification}) => {
    const classes = useStyles();
    const {submitter: {avatarUrl}} = notification;
    const Icon = typeToIcon[notification.type] || NotificationRegularIcon;
    const Text = typeToText[notification.type];
    const avatar = avatarUrl ?
        <img width={40} height={40} style={{objectFit: 'cover', borderRadius: '50%'}} src={avatarUrl} alt=""/> :
        <span/>;


    return (
        <li className={classes.singleNotification} key={notification.id}>
            <Icon/> {avatar}
            <hr/>
            <Text notification={notification}/>
        </li>
    )
}