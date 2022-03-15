import React from 'react';
import {NavLink} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {useHistory} from "react-router";

const ProfileAvatar = ({route, img, key}) => {
    const history = useHistory();

    return (<Avatar key={key} onClick={(e) => {history.push(route); e.stopPropagation();}} src={img}/>);
};

export default ProfileAvatar;