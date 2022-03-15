import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../redux/auth/action";
import {useCallback} from "react";

const useProfile = () => {
    const user = useSelector(({auth}) => auth.user);
    const dispatch = useDispatch();

    user.surname = user.surname ? user.surname : '';
    user.name = user.name ? user.name : '';

    const logoutCallback = useCallback(() => {
        localStorage.removeItem("authToken");
        dispatch(authActions.logOut());
    }, [dispatch]);

    return {
        user,
        logoutCallback,
    }
};

export default useProfile;