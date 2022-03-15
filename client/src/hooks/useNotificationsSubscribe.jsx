import useStompSubscribe from "./useStompSubscribe";
import {wsURL} from "../utils/constants";

const useNotificationsSubscribe = (onNotificationReceive) => {

    useStompSubscribe(`${wsURL()}`, '/user/notifications', onNotificationReceive);
}

export default useNotificationsSubscribe;