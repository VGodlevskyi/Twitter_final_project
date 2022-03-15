import {NOTIFICATION_RECEIVED, NOTIFICATIONS_LOADING_INITIALIZE, NOTIFICATIONS_LOADING_SUCCESS} from "./constants";

const INITIAL_STATE = {
    notifications: [],
    messages: [],
    isLoading: false,
}

const getSortedNotifications = (notifications) => {
    return notifications.sort(({createdDate}) => + new Date(createdDate));
}

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case NOTIFICATIONS_LOADING_INITIALIZE:
            return {
                ...state,
                notifications: [],
                isLoading: true,
            }
        case NOTIFICATIONS_LOADING_SUCCESS:
            return {
                ...state,
                notifications: getSortedNotifications(payload),
                isLoading: false,
            }
        case NOTIFICATION_RECEIVED:
            return {
                ...state,
                notifications: getSortedNotifications([payload, ...state.notifications]),
            }
        default:
            return state;
    }
};