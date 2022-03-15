import React, {useState} from 'react';
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
import RepeatOnRoundedIcon from '@mui/icons-material/RepeatOnRounded';
import {ReactComponent as Retweet} from '../../components/Tweet/actionImg/retweet.svg';
import {ReactComponent as RetweetDone} from '../../components/Tweet/actionImg/retweetDone.svg';
import api from "../../services/API";

const RetweetModal = ({isBadgeInvisible, initialCount, data, disabled, tweetID}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [isCurrentUserMadeRetweet, setIsCurrentUserMadeRetweet] = useState(false);
    const [replyCounter, setReplyCounter] = useState(initialCount);

    const handleRetweet = (e) => {
        setIsCurrentUserMadeRetweet(!isCurrentUserMadeRetweet);
        setReplyCounter(!isCurrentUserMadeRetweet ? replyCounter + 1 : replyCounter - 1);
        setOpen(false);
        e.stopPropagation();
        api.post(`/post/retweet/${tweetID}`)
    };

    return (
        <div>
            <Badge
                invisible={replyCounter === 0 ? true : isBadgeInvisible}
                color="success"
                badgeContent={replyCounter}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {!disabled && <Tooltip title="Retweet" onClick={handleRetweet}>
                    <IconButton aria-label="reply">
                        {/*<RepeatOnRoundedIcon color={isCurrentUserMadeRetweet ? "success" : "default"}/>*/}
                        {isCurrentUserMadeRetweet ? <RetweetDone/> : <Retweet/>}
                    </IconButton>
                </Tooltip>}
                {disabled && <Tooltip title="Retweet">
                    <IconButton aria-label="reply">
                        {isCurrentUserMadeRetweet ? <RetweetDone/> : <Retweet/>}
                    </IconButton>
                </Tooltip>}
            </Badge>
        </div>
    );
};

export default RetweetModal;