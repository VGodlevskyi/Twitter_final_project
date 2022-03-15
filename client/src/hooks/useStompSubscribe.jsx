import useStomp from "./useStomp";
import {useEffect} from "react";


const useStompSubscribe = (url, channel, receiveCallback) => {
    const {client, connected, disconnect} = useStomp(url);

    useEffect(() => {
        if (!connected) return;

        client.subscribe(channel, (payload) => {
            receiveCallback(JSON.parse(payload.body));
        })
    }, [connected]);

    return {
        client, connected, disconnect
    };
};

export default useStompSubscribe;
