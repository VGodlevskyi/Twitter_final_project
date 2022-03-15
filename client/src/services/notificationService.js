import api from "./API";


class NotificationService {
    getNotifications = (page, size) => {
        return api.get("notification/", {params: {page: page, size: size}});
    };
}

export default NotificationService;
