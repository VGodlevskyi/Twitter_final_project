import useSockJS from "./useSockJS";
import {useCallback, useEffect, useMemo, useState} from "react";
import Stomp from "stompjs";
import useToken from "./useToken";

const tokenPrefix = "Bearer ";

const useStomp = (url) => {
    const socket = useSockJS(url);
    const token = useToken();
    const client = useMemo(() => Stomp.over(socket), [socket]);
    const [connected, setConnected] = useState(false);
    const jwtToken = `${tokenPrefix}${token}`

    useEffect(() => {
        client.connect({'Authorization': jwtToken}, () => setConnected(true), () => {})
        return () => client.disconnect();
    }, []);

    const disconnect = useCallback(() => {
        client.disconnect();
        setConnected(false);
    }, [client, setConnected])

    return {
        client,
        connected,
        disconnect,
    }
}

export default useStomp;