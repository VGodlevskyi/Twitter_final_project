import * as React from 'react';
import {makeStyles} from '@mui/styles';
import {useEffect, useRef, useState} from 'react';
import {styled} from '@mui/styles';
import axios from "axios";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import img from "../../blank.png"
import {useDispatch, useSelector} from "react-redux";
import {useFetch} from "../../hooks/useFetch";
import api from "../../services/API";
import moment from "moment";
import {authActions} from "../../redux/auth/action";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {AppBar, ListItem, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DeleteMessageModal from "../DeleteMessageModal/DeleteMessageModal";
import LeaveChatModal from "../LeaveChatModal/LeaveChatModal";
import {AvatarGroup} from "@mui/lab";
import ProfileAvatar from "../../components/ProfileAvatar/ProfileAvatar";
import DottedMenu from "../../components/DottedMenu/DottedMenu";
import Badge from "@mui/material/Badge";

const useStyles = makeStyles({
    chatItemRight: {
        color: "white",
        backgroundColor: "#1d9bf0",
        padding: "10px",
        borderRadius: "20px",
        borderBottomRightRadius: "0"
    },
    chatItemLeft: {
        color: "white",
        backgroundColor: "#eff3f4",
        padding: "10px",
        borderRadius: "20px",
        borderBottomLeftRadius: "0"
    },
    nameList: {
        height: "70vh",
        overflow: "auto",
        padding: "0 !important",
    },
    sendMessageInput: {
        borderRadius: "30px !important",
    },
    mobileInput: {
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTop: "1px solid #999999"

    },
    nameCaption: {
        color: 'black !important',
        fontWeight: "400 !important",
        fontSize: "14px !important",
        display: "inline !important",
    },
});

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: "22px !important",
    height: "22px !important",
    border: `2px solid white !important`,
}));

const MobileDialogModal = ({data, onSendMessage: sendMessage, onSuccessDelete, updateFn, handleChangeMessage, messageTextMap}) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const user = useSelector(state => state.auth.user);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {setOpen(true)};
    const handleClose = () => setOpen(false);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const [messageText, setMessageText] = useState('');

    const messages = data.messages;

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom()
        }, 0)
    }, [open, messages]);

    const currentUserId = user.id;
    const membersWithoutCurrentUser = data.chatMembers.filter(cm => cm.id !== currentUserId);


    return (
        <div className={classes.editPosition}>

            <ListItem button style={{overflow: "auto"}} onClick={handleClickOpen}
                      secondaryAction={data.messages.length > 0 ? <span style={{fontSize: "12px"}}>{moment(data.messages[data.messages.length - 1].createdAt).format("LT")}</span> : ''}
            >
                <ListItemIcon>
                    <AvatarGroup max={2}>
                        {data.chatMembers.length === 3 ?
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <SmallAvatar alt={membersWithoutCurrentUser[0].name} src={membersWithoutCurrentUser[0].avatarUrl} />
                                }
                            >
                                <ProfileAvatar alt={membersWithoutCurrentUser[1].name} route={`/user/${membersWithoutCurrentUser[1].id}`} img={membersWithoutCurrentUser[1].avatarUrl} />
                            </Badge>
                            : data.chatMembers.map(cm => cm.id === user.id ? "" : <ProfileAvatar key={cm.id} route={`/user/${cm.id}`} img={cm.avatarUrl} />)}
                    </AvatarGroup>
                </ListItemIcon>

                <ListItemText
                    primary={
                        data.chatMembers.map(member => {
                            return (member.id === user.id ? "" : <Typography type="body2" key={member.id} className={classes.nameCaption}>{member.name}&nbsp;</Typography>);
                        })
                    }
                    secondary={data.messages.length > 0 && data.messages.length > 0 ?
                        (data.messages[data.messages.length - 1].messageBody.length > 30 ? data.messages[data.messages.length - 1].messageBody.slice(0, 30) + "..." : data.messages[data.messages.length - 1].messageBody  )
                        : ''}
                />
            </ListItem>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{style: { borderRadius: `${fullScreen ? "0" : "20px"}`, paddingBottom: "93px" }}}
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
                            Send message
                        </Typography>
                        <DottedMenu handleClose={() => setOpen(false)} updateFn={updateFn} chatId={data.chatId}/>
                    </Toolbar>
                </AppBar>
                <DialogContent>

                    <Grid item sm={9}>
                        <List className={classes.messageArea}>

                            {data && data.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((item, index) =>
                                item.sender.id === user.id ?
                                    <ListItem key={index}
                                              secondaryAction={<DeleteMessageModal onSuccess={onSuccessDelete} side={false} msgId={item.messageId}/>}
                                    >
                                        <Grid container className={classes.chatItemRight}>

                                            <ListItemText align="right"
                                                          primary={item.messageBody}
                                                          secondary={<span style={{color: "white"}}>{moment(item.lastUpdated).format('MMM Do YYYY, h:mm:ss a')}</span>}
                                            />

                                        </Grid>
                                    </ListItem>
                                    :
                                    <ListItem key={index}
                                              // secondaryAction={<DeleteMessageModal onSuccess={onSuccessDelete} side={true} msgId={item.messageId}/>}
                                    >
                                        <ListItemIcon>
                                            <ProfileAvatar route={`/user/${item.sender.id}`} img={item.sender.avatarUrl} />
                                        </ListItemIcon>
                                        <Grid container className={classes.chatItemLeft}>

                                            <ListItemText align="left"
                                                          primary={<span style={{color: "#383d41"}}>{item.messageBody}</span>}
                                                          secondary={<span style={{color: "#383d41"}}>{moment(item.lastUpdated).format('MMM Do YYYY, h:mm:ss a')}</span>}
                                            />
                                        </Grid>
                                    </ListItem>
                            )}
                            <div ref={messagesEndRef}/>
                        </List>
                        <Grid
                            className={classes.mobileInput}
                        >
                            <TextField
                                sx={{ m: 1, width: '90%',}}
                                placeholder="Start a new message"
                                fullWidth
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                InputProps={{
                                    // startAdornment: <InputAdornment position="start"><Avatar/></InputAdornment>,
                                    endAdornment: <InputAdornment position="end"><IconButton onClick={(e) => sendMessage({...e, target: {...e.target, value: messageText},}, false, data.chatId, true, () => setMessageText(''))}><SendRoundedIcon style={{color: "#87c1d2"}}/></IconButton></InputAdornment>,
                                    className: classes.sendMessageInput,
                                    onKeyPress: (e) => sendMessage(e, true, data.chatId, true)
                                }}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MobileDialogModal;