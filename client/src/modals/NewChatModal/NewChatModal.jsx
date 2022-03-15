import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {makeStyles} from "@mui/styles";
import {useCallback, useEffect, useMemo, useState} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Grid from "@mui/material/Grid";
import {emphasize, styled} from "@mui/styles";
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';


import img from "../../blank.png"
import axios from "axios";
import {AppBar, Toolbar} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import api from "../../services/API";
import {useSelector} from "react-redux";
import debounce from 'lodash.debounce';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    borderRadius: '20px',
    border: '0',
    boxShadow: 24,
    p: 4,
    padding: "0",
    paddingBottom: "15px"
};

const NextModalButton = styled(Button)(({theme}) => ({
    position: "relative !important",
    // marginRight: "15px !important",
    width: '65px !important',
    height: '32px !important',
    borderRadius: '20px !important',
    fontSize: '15px !important',
    fontWeight: '700 !important',
    textTransform: 'lowercase !important',
    color: 'white !important',
    backgroundColor: "black !important",
    '&.Mui-disabled': {
        backgroundColor: "#0F1419 !important",
    },
    '&:hover': {
        backgroundColor: "#000c !important",
    },
}));

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: "30px",
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        border: "1px solid #999999",
        '&:hover, &:focus': {
            backgroundColor: "white",
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            // backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});

const useStyles = makeStyles(theme => ({
    conversationButton: {
        width: "100% !important",
        height: "50px !important",
        fontSize: "12px !important",
        borderRadius: "30px !important",
        backgroundColor: theme.palette.primary.main + " !important",
            ['@media (max-width:565px)']: {
                fontSize: "15px !important",
                margin: "10px 0px !important"
            }
        },
    breadCrumbAvatar: {
        width: "24px",
        height: "24px",
        borderRadius: "12px"
    },
    modalHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        marginTop: "10px",
    },
    userHover: {
        '&:hover': {
            backgroundColor: "#eff1f1",
            cursor: "pointer"
        },
    }
}));

export default function BasicModal({getData}) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);

    const [foundUsers, setUsersFound] = useState([]);
    const [chosenUsers, setChosenUsers] = useState([]);

    const user = useSelector(state => state.auth.user);

    const addChoiceUser = (user) => {
        setChosenUsers(prev => [...prev, user]);
    }

    const removeChoiceUser = (user) => {
        setChosenUsers(prev => prev.filter(u => u.id !== user.id));
    }

    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        if (searchName) handleSearch();
    }, [searchName])

    const handleSearch = () => {
        api.get(`/users/find?user=${searchName}&size=${3}&page=${0}`).then(r => {
            setUsersFound(r.list.filter(i => i.id !== user.id))
        });
    };

    const handleSearchName = (e) => {
        setSearchName(e.target.value);
    }

    const debouncedHandleSearchName = useCallback(
        () => debounce(handleSearchName, 300)
        , []);

    useEffect(() => {
        return () => {
            if (debouncedHandleSearchName && debouncedHandleSearchName.cancel) debouncedHandleSearchName.cancel();
        }
    }, []);

    const handleModal = () => setOpen(prev => !prev);

    const handleChatCreation = () => {
        api.post(`/chats/create`, {
            "initiatorId": user.id,
            "memberIds": chosenUsers.map(i => i.id)
        }).then(r => {
            handleModal();
            setUsersFound([]);
            setChosenUsers([]);
            getData();
        });
    }

    return (
        <div>
            <Button onClick={handleModal} variant="contained" className={classes.conversationButton}>Start a conversation</Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleModal}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{style: { borderRadius: `${fullScreen ? "0" : "20px"}`,}}}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: "white", boxShadow: "none", width: `${fullScreen ? "100%" : "600px"}`}}>
                    <Toolbar >
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleModal}
                            aria-label="close"
                        >
                            {fullScreen ? <ArrowBackRoundedIcon sx={{color: "black"}}/> : <CloseIcon sx={{color: "black"}}/>}
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1,color: "black", fontWeight: "700" }} variant="h6" component="div">
                            New conversation
                        </Typography>
                        <NextModalButton onClick={handleChatCreation} disabled={chosenUsers.length === 0} variant="contained" size="small">
                            <span style={{textTransform: 'uppercase'}}>N</span>ext
                        </NextModalButton>
                    </Toolbar>
                </AppBar>
                <DialogContent  sx={{ padding: "0 0 !important" }}>
                    <Grid container direction="column" alignItems="center" justifyContent="space-between">

                        <FormControl fullWidth variant="standard" >
                            {/*<InputLabel htmlFor="standard-adornment-amount"></InputLabel>*/}
                            <Input
                                placeholder="Search people"
                                id="standard-adornment-amount"
                                // value={searchName}
                                // onChange={debouncedHandleSearchName}
                                inputProps={{
                                    onChange: debouncedHandleSearchName()
                                }}
                                startAdornment={<InputAdornment position="start"
                                                                style={{marginLeft: "10px"}}><SearchRoundedIcon/></InputAdornment>}
                            />
                        </FormControl>

                        <div role="presentation" style={{width: "100% !important", display: "flex !important", justifyContent: "center !important", alignItems: "center !important",}}>
                            <Breadcrumbs separator=" " aria-label="breadcrumb" style={{marginTop: "10px", padding: "0 !important"}}>
                                {chosenUsers && chosenUsers.map(user =>
                                    <StyledBreadcrumb
                                        href="#"
                                        label={user.name}
                                        icon={<img src={user.avatarUrl} alt="avatar" className={classes.breadCrumbAvatar}/>}
                                        deleteIcon={<ClearRoundedIcon/>}
                                        onDelete={removeChoiceUser.bind(null, user)}
                                    />)}
                            </Breadcrumbs>
                        </div>

                        <List
                            sx={{
                                width: '100%',
                                bgcolor: 'background.paper',
                            }}
                            className={classes.usersFound}
                        >
                            {foundUsers && foundUsers.filter(u => !chosenUsers.some(cu => u.id === cu.id)).map(user =>
                                <ListItem className={classes.userHover} key={user.id}
                                          onClick={() => addChoiceUser(user)}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <img src={user.avatarUrl} alt="avatar"/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} secondary={user.surname}/>
                                </ListItem>)}

                        </List>


                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}