import {useLocation} from "react-router";

const useDefaultCredentials = () => {
    const search = useLocation().search;
    const params = new URLSearchParams(search);
    const email = params.get('email') || '';
    const password = params.get('password') || '';

    return {
        email,
        password,
    }
}

export default useDefaultCredentials;