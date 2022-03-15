import React, {useEffect, useMemo, useRef, useState} from 'react';
import Page from "../components/global/Page";
import {makeStyles} from "@mui/styles";
import NewChatModal from "../modals/NewChatModal/NewChatModal";
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import {ListItem, ListItemIcon, ListItemText, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Paper from '@mui/material/Paper';
import MobileDialogModal from "../modals/MobileDialogModal/MobileDialogModal";
import {useDispatch, useSelector} from "react-redux";
import {useFetch} from "../hooks/useFetch";
import api from "../services/API";
import moment from "moment";
import DeleteMessageModal from "../modals/DeleteMessageModal/DeleteMessageModal";
import {AvatarGroup} from "@mui/lab";
import ProfileAvatar from "../components/ProfileAvatar/ProfileAvatar";
import DottedMenu from "../components/DottedMenu/DottedMenu";
import {styled} from '@mui/material/styles';
import Badge from "@mui/material/Badge";
import {useHistory, useLocation} from "react-router";
import { useTheme } from '@mui/material/styles';
import useToken from "../hooks/useToken";
import LiveNotificationService from "../services/liveNotificationService";
import LiveMessagesService from "../services/liveMessagesService";
import NotificationService from "../services/notificationService";
import {
  NOTIFICATION_RECEIVED,
  NOTIFICATIONS_LOADING_INITIALIZE,
  NOTIFICATIONS_LOADING_SUCCESS
} from "../redux/notifications/constants";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    border: "0 !important",
    ['@media (max-width:565px)']: {
      display: "none !important",
    }
  },
  hideTimeMD: {
    ['@media (max-width:1168px)']: {
      display: "none !important",
    }
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  chatMemberName: {
    fontSize: "14px !important",
    fontWeight: "700 !important",
  },
  chatItemRight: {
    position: "relative",
    color: "white",
    // backgroundColor: "#1d9bf0",
    padding: "10px",
    borderRadius: "20px",
    borderBottomRightRadius: "0"
  },
  chatItemLeft: {
    position: "relative",
    margin: "0 !important",
    color: "white",
    backgroundColor: "#eff3f4",
    padding: "10px",
    borderRadius: "20px",
    borderBottomLeftRadius: "0"
  },
  nameList: {
    height: "75vh",
    overflow: "auto",
    padding: "0 !important",

  },
  sendMessageInput: {
    marginTop: '20px !important',
    borderRadius: "30px !important",
  },
  mobileChat: {
    display: "none !important",
    ['@media (max-width:565px)']: {
      display: "block !important",
    }
  },
  nameCaption: {
    color: 'black !important',
    fontWeight: "700 !important",
    fontSize: "14px !important",
    display: "inline !important",
  },
  deleteMsg: {
    width: "50px",
    height: "50px",
  },
  chatHeader: {
    position: "absolute",
    right: "0px",
    top: "0px",
    width: "75.1%",
    height: "75px",
    borderLeft: "1px solid #eff3f4",
    backgroundColor: "white",
    ['@media (max-width:565px)']: {
      display: "none !important",
    }
  }
});

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));


const Messages = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const handleClickOpen = () => {setOpen(true)};
  const handleClose = () => setOpen(false);
  const user = useSelector(state => state.auth.user);
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();

  const [messageTextMap, setMessageTextMap] = useState({});


  const useLiveMessagesService = () => {
    const token = useToken();
    return useMemo(() => new LiveMessagesService(), [token]);
  }


  const [selectedChat, setSelectedChat] = useState(0);

  const [{data, loading, modifyData}, getData] = useFetch({
    initData:  {
      list: [],
      total: 0
    },
    onCompleted: (d) => {
      setSelectedChat(d.list.length > 0 && d.list[0].chatId || 0);
    },
    url: `/chats/list?page=0&limit=50`,
    method: 'GET'
  })

  const live = useLiveMessagesService();



  useEffect(() => {
    const receiveMessage = (message) => {
      const isMessage = !!message.messageId;

      if (isMessage) {
        modifyData((d) => ({
          ...d,
          list: d.list.map(chat => chat.chatId === message.chatId ? ({
            ...chat,
            messages: [message, ...chat.messages]
          }): chat)
        }))
      } else {
        modifyData((d) => {
          return {
            total: d.total + 1,
            list: [message, ...d.list]
          }
        })
      }
    }

    live.subscribeForNewMessages(receiveMessage);

    return () => live.disconnect();
  }, [live]);


  const handleChangeMessage = (e) => {
    setMessageTextMap(prev => ({
      ...prev,
      [selectedChat]: e.target.value
    }));
  }

  useEffect(() => {
    if (location.pathname.split("/").length === 3) {
      setSelectedChat(location.pathname.split("/")[location.pathname.split("/").length - 1]);
    }
  }, []);

  let handleListItemClick = (index, chatId) => {
    setSelectedChat(chatId);
    // history.push(`/messages/${chatId}`);
  }

  const onSuccessDeleteMessage = (id) => {

    modifyData(d => ({
      ...d,
      list: d.list.map(c => ({
        ...c,
        messages: c.messages.filter(m => m.messageId !== id)
      }))
    }))
  }

  let sendMessage = (event, fromKeyboard, id = selectedChat, mobile=false, callback = () => {}) => {
    if((messageTextMap[selectedChat] || mobile) && (!fromKeyboard || event.key === 'Enter')){
      api.post(`/chats/message`, {
        "chatId": id,
        "senderId": user.id,
        "body": mobile ? event.target.value : messageTextMap[id]
      }).then(d => {
        if (!mobile) {
          setMessageTextMap(prev => ({
            ...prev,
            [id]: ''
          }));
        }
        callback();
        modifyData(data => ({
          ...data,
          list: data.list.map(oldChat => oldChat.chatId === d.chatId ? d : oldChat)
        }))
      });

      event.target.value = "";
    }

  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const messages = selectedChat > 0 && data.list.find(c => c.chatId === selectedChat);

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

    return (
        <Page pageName={'Messages'}>
          <Divider/>
          <Grid className={classes.chatHeader}>
            <ListItem style={{marginTop: "10px"}}
                secondaryAction={selectedChat > 0 ? <DottedMenu handleClose={() => {}} updateFn={getData} chatId={selectedChat}/> : ""}
            >
              <ListItemIcon>
                <AvatarGroup max={4}>
                  {selectedChat > 0 && data.list.find(c => c.chatId === selectedChat)?.chatMembers.flatMap(cm => cm.id === user.id ? "" : <ProfileAvatar route={`/user/${cm.id}`} img={cm.avatarUrl} />)}
                </AvatarGroup>
              </ListItemIcon>
              <ListItemText
                  primary={selectedChat > 0 && data.list.find(c => c.chatId === selectedChat)?.chatMembers.flatMap(cm => cm.id === user.id ? "" : <span style={{margin: "0 0 0 10px"}}>{cm.name}</span> )}
              />
            </ListItem>
          </Grid>
          <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
              <Grid item xs={12} style={{padding: '10px'}}>
                <NewChatModal getData={getData}/>
              </Grid>
              <Divider/>

              <List className={classes.nameList}>
                {data.list && data.list.map((item, index) => {
                  const currentUserId = user.id;
                  const membersWithoutCurrentUser = item.chatMembers.filter(cm => cm.id !== currentUserId);
                  return (<ListItem
                      key={item.chatId}
                      button
                      style={{overflow: "hidden"}}
                      selected={item.chatId === selectedChat}
                      onClick={() => {handleListItemClick(index, item.chatId)}}
                      secondaryAction={item.messages.length > 0 ? <span className={classes.hideTimeMD} style={{fontSize: "12px"}}>{moment(item.messages[item.messages.length - 1].createdAt).format("LT")}</span> : ''}
                  >
                    <ListItemIcon>
                      <AvatarGroup max={2}>
                        {item.chatMembers.length === 3 ?
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                  <SmallAvatar alt={membersWithoutCurrentUser[0].name}  src={membersWithoutCurrentUser[0].avatarUrl} />
                                }
                            >
                              <ProfileAvatar alt={membersWithoutCurrentUser[1].name} route={`/user/${membersWithoutCurrentUser[1].id}`} img={membersWithoutCurrentUser[1].avatarUrl} />
                            </Badge>

                            : item.chatMembers.map(s => s.id === user.id ? "" : <ProfileAvatar key={s.id} route={`/user/${s.id}`} img={s.avatarUrl} />)}
                      </AvatarGroup>
                    </ListItemIcon>
                    <ListItemText
                        primary={item.chatMembers.flatMap(cm => cm.id === user.id ? "" : cm.name + " ")}
                        secondary={item.messages.length > 0 ?
                            (item.messages[item.messages.length - 1].messageBody.length > 10 ? item.messages[item.messages.length - 1].messageBody.slice(0, 9) + "..." : item.messages[item.messages.length - 1].messageBody  )
                            : ''}
                    />
                  </ListItem>)
                })}

              </List>

            </Grid>
            <Grid item xs={9}>
              <List className={classes.messageArea}>
                {data.list && data.list.length === 0 ? <h2 style={{margin: "10px 0 0 10px"}}>No conversations have begun yet.</h2> : "" }
                {selectedChat > 0 && data.list.find(c => c.chatId === selectedChat)?.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((item, index) =>
                    item.sender.id === user.id ?
                        <ListItem key={index}
                                  secondaryAction={<DeleteMessageModal onSuccess={onSuccessDeleteMessage} side={false} msgId={item.messageId}/>}
                        >
                          <Grid container className={classes.chatItemRight}
                                style={{backgroundColor: theme.palette.primary.main}}>

                              <ListItemText align="right"
                                            primary={item.messageBody}
                                            secondary={<span style={{color: "white"}}>{moment(item.lastUpdated).format('MMM Do YYYY, h:mm:ss a')}</span>}
                              />

                          </Grid>
                        </ListItem>
                        :
                        <ListItem key={index}
                                  // secondaryAction={<DeleteMessageModal side={true} onSuccess={onSuccessDeleteMessage} msgId={item.messageId}/>}
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
              <Divider/>
              <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                {selectedChat > 0 ? <TextField
                    sx={{ m: 1, width: '90%',}}
                    placeholder="Start a new message"
                    fullWidth
                    onChange={handleChangeMessage}
                    value={messageTextMap[selectedChat] || ''}
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><IconButton onClick={sendMessage}><SendRoundedIcon style={{color: "#87c1d2"}}/></IconButton></InputAdornment>,
                      className: classes.sendMessageInput,
                      onKeyPress: (e) => sendMessage(e, true)
                    }}
                /> : ""}

              </Grid>
            </Grid>
          </Grid>

          <Grid className={classes.mobileChat}>
            <Grid item xs={12} style={{padding: '10px'}}>
              <NewChatModal getData={getData}/>
            </Grid>
            <Divider/>

            <List className={classes.nameList}>
                {data.list && data.list.length === 0 ? <h2 style={{margin: "10px 0 0 10px"}}>No conversations have begun yet.</h2> : "" }
                {data.list && data.list.map((item, index) => <MobileDialogModal handleChangeMessage={handleChangeMessage} messageTextMap={messageTextMap} updateFn={getData} onSendMessage={sendMessage} onSuccessDelete={onSuccessDeleteMessage} key={index} data={item} />)}

            </List>


          </Grid>

        </Page>
    );
};

export default Messages;