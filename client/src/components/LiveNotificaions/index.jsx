import React, {useEffect, useMemo} from "react";
import 'material-react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "material-react-toastify";
import LiveNotificationService from "../../services/liveNotificationService";
import NotificationService from "../../services/notificationService";
import {useDispatch} from "react-redux";
import {
    NOTIFICATION_RECEIVED,
    NOTIFICATIONS_LOADING_INITIALIZE,
    NOTIFICATIONS_LOADING_SUCCESS
} from "../../redux/notifications/constants";
import useToken from "../../hooks/useToken";

const PAGE = 0;
const SIZE = 100000;


const initializeNotifications = (live) => (dispatch) => {
    const notificationService = new NotificationService();

    dispatch({type: NOTIFICATIONS_LOADING_INITIALIZE});

    notificationService.getNotifications(PAGE, SIZE).then(
        ({list}) => {
            dispatch({type: NOTIFICATIONS_LOADING_SUCCESS, payload: list});
        }
    )

    const receiveNotification = (notification) => {
        // toast.info('New notification received!');
        dispatch({type: NOTIFICATION_RECEIVED, payload: notification});
    }

    live.subscribeForNewNotifications(receiveNotification);
}

const useLiveNotificationsService = () => {
    const token = useToken();
    return useMemo(() => new LiveNotificationService(), [token]);
}

const LiveNotifications = () => {
    const live = useLiveNotificationsService();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeNotifications(live));
        return () => live.disconnect();
    }, [live]);


    return (
        <>
            <ToastContainer/>
        </>
    )
}

export default LiveNotifications;