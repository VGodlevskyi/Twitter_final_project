import {NOTIFICATIONS_LOADING_START, NOTIFICATIONS_LOADING_SUCCESS} from "./constants";
import NotificationService from "../../services/notificationService";

const PAGE = 0;
const SIZE = Math.pow(10, 10);
const notificationService = new NotificationService();

const initializeNotifications = (dispatch) => {
    dispatch({type: NOTIFICATIONS_LOADING_START});

    notificationService.getNotifications(PAGE, SIZE).then(
        ({list}) => {
            dispatch({type: NOTIFICATIONS_LOADING_SUCCESS, payload: list})
        }
    );
}