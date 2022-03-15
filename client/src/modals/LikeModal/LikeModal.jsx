import React, {useEffect, useState} from 'react';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import {AppBar, Divider, Toolbar, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import img from "../../blank.png";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import moment from "moment";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Badge from '@mui/material/Badge';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import api from "../../services/API";
import {useSelector} from "react-redux";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import {ReactComponent as Like} from '../../components/Tweet/actionImg/like.svg';
import {ReactComponent as LikeDone} from '../../components/Tweet/actionImg/likeDone.svg';


const LikeModal = ({isBadgeInvisible, initialCount, likedByCurrentUser, postId}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [isCurrentUserMadeLike, setIsCurrentUserMadeLike] = useState(likedByCurrentUser);
    const [likeCounter, setLikeCounter] = useState(initialCount);

    useEffect(() => {
        setIsCurrentUserMadeLike(likedByCurrentUser)
    }, [likedByCurrentUser]);

    const user = useSelector(state => state.auth.user);

    const handleLike = (e) => {
        setIsCurrentUserMadeLike(!isCurrentUserMadeLike);
        if (!isCurrentUserMadeLike) {
            api.post(`/post/like?id=${postId}`).then(r => {
            });
        } else {
            api.post(`/post/unlike?id=${postId}`).then(r => {
            });
        }
        !isCurrentUserMadeLike ? setLikeCounter(likeCounter + 1) : setLikeCounter(likeCounter - 1);
        setOpen(false);
        e.stopPropagation();
    };

    return (
        <div>
            <Badge
                invisible={likeCounter === 0 ? true : isBadgeInvisible}
                color="error"
                badgeContent={likeCounter}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                style={{color: "#f91880 !important"}}
            >
            <Tooltip title="Like" onClick={handleLike}>
                <IconButton aria-label="reply">
                    {/*<FavoriteRoundedIcon color={isCurrentUserMadeLike ? "error" : "default"}/>*/}
                    {isCurrentUserMadeLike ? <LikeDone/> : <Like/>}
                </IconButton>
            </Tooltip>
            </Badge>
        </div>
    );
};

export default LikeModal;