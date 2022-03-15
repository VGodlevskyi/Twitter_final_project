import React, {useState} from 'react';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import {AppBar, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText, Toolbar, Tooltip} from "@mui/material";
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
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {makeStyles} from "@mui/styles";
import List from "@mui/material/List";
import ImageIcon from '@mui/icons-material/Image';
import {NavLink} from "react-router-dom";
import FollowModal from "../FollowModal/FollowModal";
import ProfileAvatar from "../../components/ProfileAvatar/ProfileAvatar";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    follow: {
        marginLeft: "5px !important",
        color: "#677682 !important",
        fontSize: "16px !important",
        "&:hover": {
            borderBottom: "1px solid black !important",
            cursor: "pointer !important"
        }
    },
    number: {
        marginRight: "5px !important",
        fontSize: "18px !important",
        fontWeight: "700 !important",
        color: "black !important",
    },
    followButton: {
        height: '32px !important',
        borderRadius: '20px !important',
        fontSize: '15px !important',
        fontWeight: '700 !important',
        textTransform: 'lowercase !important',
        color: 'white !important',
        backgroundColor: "black !important",
        border: "1px solid black !important",
        '&:hover': {
            backgroundColor: "#000c !important",
        },
    },
    followButtonDone: {
        height: '32px !important',
        backgroundColor: "white !important",
        color: "red !important",
        borderRadius: '20px !important',
        border: "1px solid #cfd9de !important",
    },
    followButtonLink: {
        display: "flex !important",
        justifyContent: "center !important",
        alignItems: "center !important",
        textDecoration: "none !important",
        color: "black !important",
    },
    followerCard: {
        padding: "10px",
        '&:hover': {
            backgroundColor: "#eff1f1",
            cursor: "pointer"
        },
    },
});


const FollowerListModal = ({isFollowing, followingUsers}) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    const [follow, setFollow] = useState(true);
    const handleFollow = (e) => {
        e.preventDefault();
        setFollow(prev => !prev);

    }

    const {numberOfSubscriptions, numberOfSubs} = useSelector(state => state.auth.user)

    const handleClickOpen = () => {setOpen(true)};
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Typography variant="caption" className={classes.follow} onClick={followingUsers.length > 0 ? handleClickOpen : ""}>
                <span className={classes.number}>{isFollowing? numberOfSubscriptions : numberOfSubs}</span>{isFollowing ? "Following" : "Followers"}
            </Typography>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{style: { borderRadius: `${fullScreen ? "0" : "20px"}` }}}
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
                            {isFollowing ? "Following" : "Followers"}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", borderTop: "1px solid #eff3f4", padding: "0"}}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                        {followingUsers.length === 0 ? <h2 style={{marginLeft: "15px", color: "red"}}>Empty</h2> :
                            followingUsers.map(i => {return (
                                <NavLink key={i.id} className={classes.followButtonLink} to={`/user/${i.id}`} >
                                    <ListItem  className={classes.followerCard} disablePadding
                                               secondaryAction={<FollowModal id={i.id} name={i.name} isFollowing={i.isUserFollowingByCurrentUser}/>}>

                                        <ListItemAvatar>
                                            <ProfileAvatar route={`/user/${i.id}`} img={i.avatarUrl}/>
                                        </ListItemAvatar>

                                        <ListItemText primary={i.name} />

                                    </ListItem>
                                </NavLink>)})}

                    </List>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FollowerListModal;