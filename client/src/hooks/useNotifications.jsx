import {useFetch} from "./useFetch";
import {useEffect, useState} from "react";

export const useNotifications = (page, size) => {
    const [notifications, setNotifications] = useState([]);
    const [{data, loading}] = useFetch({
        instant: true,
        initData: {total: 0, list: []},
        url: `/notification/?page=${page}&size=${size}`,
        method: "GET",
        dependencies: [page, size],
    });

    useEffect(() => {
        if (!loading && data.list) {
            setNotifications([...notifications, ...data.list]);
        }
    }, [loading]);

    return {
        isLoading: loading,
        notifications: notifications,
    }
};
