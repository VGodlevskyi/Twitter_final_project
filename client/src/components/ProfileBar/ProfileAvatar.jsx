import React from "react";
import {useSelector} from "react-redux";

const ProfileAvatar = ({width = 40, height = 40}) => {
    const {avatarUrl} = useSelector(({auth}) => auth.user);

    return <img
        width={width}
        height={height}
        style={{objectFit: 'cover', borderRadius: '50%'}}
        src={avatarUrl}
        alt=""
    />
}

export default ProfileAvatar;