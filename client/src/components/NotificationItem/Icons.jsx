import React from "react";
import {ReactComponent as LikeIcon} from './icons/likeIcon.svg';
import {ReactComponent as ReportIcon} from './icons/reportIcon.svg';
import {ReactComponent as CommentIcon} from './icons/commentIcon.svg';
import {ReactComponent as SubscribeIcon} from './icons/subscribeIcon.svg';
import {ReactComponent as RegularIcon} from './icons/regularIcon.svg';
import notificationTypes from './types';

export const NotificationRegularIcon = () => {
    return (
        <RegularIcon width={'auto'} height={'auto'}/>
    )
}

export const NotificationLikeIcon = () => {
    return (
        <LikeIcon width={'auto'} height={'auto'}/>
    )
}

export const NotificationRepostIcon = () => {
    return (
        <ReportIcon width={'auto'} height={'auto'}/>
    )
}

export const NotificationCommentIcon = () => {
    return (
        <CommentIcon width={'auto'} height={'auto'}/>
    )
}

export const NotificationSubscribeIcon = () => {
    return (
        <SubscribeIcon width={'auto'} height={'auto'}/>
    )
}

export const typeToIcon = {
    [notificationTypes.LIKE]: NotificationLikeIcon,
    [notificationTypes.REPOST]: NotificationRepostIcon,
    [notificationTypes.COMMENT]: NotificationCommentIcon,
    [notificationTypes.SUBSCRIBE]: NotificationSubscribeIcon,
};