import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {wsURL} from "../utils/constants";


class LiveMessagesService {
    TOKEN_PREFIX = 'Bearer '
    MESSAGES_CHANNEL = '/user/messages'
    ws_url = wsURL();
    sockjs = new SockJS(this.ws_url);
    stomp = Stomp.over(this.sockjs);
    isConnected = false;

    getJWT = () => {
        return `${this.TOKEN_PREFIX}${this.getToken()}`
    }

    getToken = () => {
        return localStorage.getItem('authToken');
    }

    connect = (callback) => {
        this.stomp.debug = null
        this.stomp.connect({'Authorization': this.getJWT()}, () => {
            this.isConnected = true;
            callback();
        });
    }

    disconnect = () => {
        if (this.isConnected) this.stomp.disconnect();
    }

    subscribeForNewMessages = (callback) => {
        if (!this.isConnected) {
            this.connect(() => this.subscribeForNewMessages(callback));
            return;
        }
        this.stomp.subscribe(this.MESSAGES_CHANNEL, (payload) => {
            callback(JSON.parse(payload.body));
        })
    }
}

export default LiveMessagesService;