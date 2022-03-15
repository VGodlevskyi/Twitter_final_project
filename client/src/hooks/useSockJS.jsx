import {useMemo} from "react";
import SockJS from "sockjs-client";

const useSockJS = (url) => {
    return useMemo(() => new SockJS(url), [url]);
};

export default useSockJS;