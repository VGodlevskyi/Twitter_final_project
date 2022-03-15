import React from "react";
import notificationTypes from './types';
import moment from "moment";

const NotificationLikeText = ({notification}) => {
    const {submitter} = notification;
    const {name, surname} = submitter;

    return <p>
        {name} {surname} liked your <a href={`/tweet/${notification.post.id}`}>tweet</a>
        <br/>
        <small>{moment(notification.createdDate).format('yyyy-MM-DD HH:mm')}</small></p>;
}

const NotificationRepostText = ({notification}) => {
    const {submitter} = notification;
    const {name, surname} = submitter;

    return <p>{name} {surname} retweet your <a href={`/tweet/${notification.post.id}`}>tweet</a>
        <br/>
        <small>{moment(notification.createdDate).format('yyyy-MM-DD HH:mm')}</small></p>;
}

const NotificationCommentText = ({notification}) => {
    const {submitter} = notification;
    const {name, surname} = submitter;

    return <p>{name} {surname} commented your <a href={`/tweet/${notification.post.id}`}>tweet</a>
        <br/>
        <small>{moment(notification.createdDate).format('yyyy-MM-DD HH:mm')}</small></p>;
}

const NotificationSubscribeText = ({notification}) => {
    const {submitter} = notification;
    const {name, surname} = submitter;

    return <p>{name} {surname} subscribed your profile
        <br/>
        <small>{moment(notification.createdDate).format('yyyy-MM-DD HH:mm')}</small></p>;
}

export const typeToText = {
    [notificationTypes.LIKE]: NotificationLikeText,
    [notificationTypes.REPOST]: NotificationRepostText,
    [notificationTypes.COMMENT]: NotificationCommentText,
    [notificationTypes.SUBSCRIBE]: NotificationSubscribeText,
}