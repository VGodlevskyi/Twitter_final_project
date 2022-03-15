import React from "react";
import {NotificationItem} from "../NotificationItem/NotificationItem";
import {useSelector} from "react-redux";
import notificationsTypes from '../NotificationItem/types';

const NotificationsLoading = () => (
    <ul>
        <p>Loading...</p>
    </ul>
)

const NotificationsIsEmpty = () => (
    <ul>
        <p>No notifications yet</p>
    </ul>
)

export const NotificationsList = () => {
    const {notifications, isLoading} = useSelector(({notifications}) => notifications);
    const filteredNotifications = notifications.filter(
        notification => Object.values(notificationsTypes).includes(notification.type)
    );

    if (filteredNotifications.length === 0 && isLoading) {
        return <NotificationsLoading/>;
    } else if (filteredNotifications.length === 0) {
        return <NotificationsIsEmpty/>;
    }

    return (
        <ul>
            {
                filteredNotifications.sort((n1, n2) => new Date(n2.createdDate) - new Date(n1.createdDate)).map((notification) => (
                    <NotificationItem notification={notification} key={notification.id}/>
                ))
            }
        </ul>
    );
}