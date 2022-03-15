import React, {useState} from 'react';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import {AppBar, Toolbar, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import moment from "moment";
import InputAdornment from "@mui/material/InputAdornment";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Badge from '@mui/material/Badge';
import ProfileAvatar from "../../components/ProfileAvatar/ProfileAvatar";
import {useSelector} from "react-redux";
import {ReactComponent as Reply} from '../../components/Tweet/actionImg/reply.svg';
import {ReactComponent as ReplyDone} from '../../components/Tweet/actionImg/replyDone.svg';
import api from "../../services/API";
import Avatar from "@mui/material/Avatar";

const ReplyModal = ({isBadgeInvisible, initialCount, data, postID}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [isCurrentUserMadeReply, setIsCurrentUserMadeReply] = useState(false);
    const [replyCounter, setReplyCounter] = useState(initialCount);
    const [message, setMessage] = useState("");
    const user = useSelector(state => state.auth.user);

    const handleClickOpen = (e) => {
        setOpen(true)
        e.stopPropagation();
    };

    const handleClose = (e) => {
        setOpen(false);
        e.stopPropagation();
    };

    const handleReply = (e) => {
        setIsCurrentUserMadeReply(true);
        setReplyCounter(replyCounter + 1);
        setOpen(false);

        api.post(`/comments/save/${postID}`, {
            body: message
        });
        e.stopPropagation();
    };

    return (
        <div>
            <Badge
                invisible={replyCounter === 0 ? true : isBadgeInvisible}
                color="primary"
                badgeContent={replyCounter}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}

            >
            <Tooltip title="Reply" onClick={handleClickOpen}>
                <IconButton aria-label="reply">
                    {isCurrentUserMadeReply ? <ReplyDone/> : <Reply/>}
                </IconButton>
            </Tooltip>
            </Badge>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{style: { borderRadius: `${fullScreen ? "0" : "20px"}` }}}
                onClick={(e) => e.stopPropagation()}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: "white", boxShadow: "none", width: `${fullScreen ? "100%" : "600px"}`}}>
                    <Toolbar >
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            {fullScreen ? <ArrowBackRoundedIcon sx={{color: "black"}}/> : <CloseIcon sx={{color: "black"}}/>}
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1,color: "black", fontWeight: "700" }} variant="h6" component="div">
                            Replying
                        </Typography>
                        <Button onClick={handleReply} style={{borderRadius: "20px", fontWeight: "700"}} variant="contained" size="small">
                            <span style={{textTransform: 'uppercase'}}>R</span><span style={{textTransform: 'lowercase'}}>eply</span>
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", borderTop: "1px solid #eff3f4"}}>
                    <CardHeader
                        avatar={<Avatar src={data.user && data.user.avatarUrl} route={`/user/${data.user && data.user.id}`}/>}
                        title={data.user && data.user.name}
                        subheader={moment(data.createdDate).format('MMM Do YYYY, h:mm:ss a')}
                    />
                    <CardContent>
                        <Typography variant="body2" color="black" style={{paddingLeft: "40px", borderLeft: "3px solid #cfd9de", marginLeft: "15px", lineHeight: "40px"}}>
                            {data && data.body}
                        </Typography>
                    </CardContent>

                    <TextField
                        onChange={e => setMessage(e.target.value)}
                        sx={{ m: 1, width: '90%'}}
                        placeholder="Post your reply"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Avatar src={user && user.avatarUrl} route={`/user/${user && user.id}`}/></InputAdornment>,
                            style: {border: "none !important"}
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ReplyModal;