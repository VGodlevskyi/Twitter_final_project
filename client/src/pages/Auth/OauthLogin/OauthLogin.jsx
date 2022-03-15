import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {authActions} from "../../../redux/auth/action";
import {Redirect} from "react-router-dom";

const OauthLogin = (props) => {

    const getUrlParameters = (paramName) => {
        paramName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + paramName + '=([^&#]*)');
        const results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = getUrlParameters('access_token');
        const refreshToken = getUrlParameters('refresh_token');

        accessToken && refreshToken
            ? dispatch(authActions.oauthLogin({accessToken, refreshToken}))
            : void 0;
    }, [])

    return (
            <Redirect to="/home"/>
    );
}

export default OauthLogin;
