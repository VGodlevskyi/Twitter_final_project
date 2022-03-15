import * as React from 'react';
import {makeStyles} from '@mui/styles';
import {useEffect, useState} from 'react';
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
import img from "../../images/defaultGray.png"
import {useDispatch, useSelector} from "react-redux";
import api from "../../services/API";
import moment from "moment";
import {authActions} from "../../redux/auth/action";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {AppBar, CircularProgress, Toolbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {objectToFormData} from "../../utils/formdata";
import {useFetch} from "../../hooks/useFetch";

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
};

const Input = styled('input')({
    display: 'none',
});

const EditModalOpen = styled(Button)(({theme}) => ({
    position: 'relative !important',
    // right: '50px !important',
    width: '112px !important',
    height: '36px !important',
    borderRadius: '20px !important',
    border: '1px solid #cfd9de !important',
    fontSize: '15px !important',
    fontWeight: '700 !important',
    textTransform: 'lowercase !important',
    color: 'black !important'
}));

const SaveModalButton = styled(Button)(({theme}) => ({
    position: "relative",
    left: "380px",
    width: '65px',
    height: '32px',
    borderRadius: '20px',
    fontSize: '15px',
    fontWeight: '700',
    textTransform: 'lowercase',
    color: 'white',
    backgroundColor: "black",
    '&:hover': {
        backgroundColor: "#000c",
    },
}));

const useStyles = makeStyles({
    backgroundImg: {
        position: "relative",
        marginTop: "10px",
        height: "193px",
        backgroundColor: "rgb(172,164,164)",
    },
    backgroundImgLabel: {
        position: "absolute",
        zIndex: 2
    },
    backgroundImgPic: {
        position: "absolute",
        objectFit: "cover",
        zIndex: 1,
        width: "100%",
        height: "100%",
    },
    avatarImgPic: {
        position: "absolute",
        objectFit: "cover",
        zIndex: 3,
        width: "100%",
        height: "100%",
        borderRadius: "50% !important",
        border: 0,
    },
    avatarImgLabel: {
        position: "absolute",
        zIndex: 4,
    },
    avatar: {
        position: "absolute",
        zIndex: "3",
        left: "2%",
        top: "80%",
        display: "flex !important",
        justifyContent: "center !important",
        alignItems: "center !important",
        height: "112px",
        width: "112px",
        borderRadius: "50%",
        border: "4px solid white",
        backgroundColor: "black"
    },
    inputField: {
        marginTop: "25px !important"

    },
    photoMargin: {
        marginTop: "15%"
    },
    editPosition: {
        position: "absolute",
        right: "10px",
        top: "105%"
    },
    saveButton: {
        // position: "relative",
        // left: "380px",
        width: '65px !important',
        height: '32px !important',
        borderRadius: '20px !important',
        fontSize: '15px !important',
        fontWeight: '700 !important',
        textTransform: 'lowercase !important',
        color: 'white !important',
        backgroundColor: "black !important",
        '&:hover': {
            backgroundColor: "#000c !important",
        },
    }
});

const EditProfile = ({avatarUrl,profileBackgroundUrl}) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {setOpen(true)};
    const handleClose = () => setOpen(false);
    const [isLoading, setLoading] = useState(false);


    const [{data: profileData, loading, modifyData}, getData] = useFetch({
        instant: true,
        method: 'GET',
        url: 'users/profile',
        initData: null,
        dataTransformer: (user => ({
            avatarImg: {selectedFile: null, preview: avatarUrl},
            bgImg: {selectedFile: null, preview: profileBackgroundUrl},
            name: user.name || '',
            surname: user.surname || '',
            bio: user.bio,
            location: user.location,
            website: user.website,
            birthdate: moment(user.birthdate).format('x')
        }))
    })

    if (loading || !profileData) return <CircularProgress/>;


    const handleChange = (e) => {
        modifyData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleChangeDate = (e) => {
        modifyData(prev => ({
            ...prev,
            [e.target.name]: moment(e.target.value, 'yyyy-MM-DD').format('x')
        }))
    }

    let onFileChange = e => {

        let reader = new FileReader();
        const imgName = e.target.name;
        let file = e.target.files[0];
        reader.onloadend = () => {
            modifyData(prev => ({
                ...prev,
                [imgName]: {
                    selectedFile: file,
                    preview: reader.result
                }
            }));
        }
        reader.readAsDataURL(file)

    };




    const dispatch = useDispatch();

    let saveSubmit = () => {
        const formData = objectToFormData({
            name: profileData.name,
            surname: profileData.surname,
            bio: profileData.bio,
            location: profileData.location,
            website: profileData.website,
            birthdate: moment(profileData.birthdate, 'x').format("YYYY-MM-DD"),
        }, '', []);
        if (profileData.bgImg.selectedFile) {
            formData.append('bgImg', profileData.bgImg.selectedFile, profileData.bgImg.selectedFile.name
            );
        }
        if (profileData.avatarImg.selectedFile) {
            formData.append('avatarImg', profileData.avatarImg.selectedFile, profileData.avatarImg.selectedFile.name
            );
        }

        setLoading(true);
        api.put('users/edit', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(() => {
            dispatch(authActions.getProfile());
            handleClose();
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className={classes.editPosition}>
            <EditModalOpen onClick={handleClickOpen}><span style={{textTransform: "uppercase"}}>E</span>dit profile</EditModalOpen>
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
                            Edit profile
                        </Typography>
                        <Button disabled={isLoading} className={classes.saveButton} variant="contained" size="small" onClick={saveSubmit}>
                            {isLoading ? (<CircularProgress/>) : (<><span style={{textTransform: 'uppercase'}}>S</span>ave</>)}
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>

                    <Grid container style={{borderRadius: "20px !important"}}>

                        <Grid container alignItems="center" justifyContent="center" className={classes.backgroundImg}>

                            <img src={profileData.bgImg.preview} className={classes.backgroundImgPic} alt="bg"/>

                            <label htmlFor="icon-button-file1" className={classes.backgroundImgLabel}>
                                <Input accept="image/*" id="icon-button-file1" type="file" name="bgImg"
                                       onChange={onFileChange}/>
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera style={{color: "white"}}/>
                                </IconButton>
                            </label>

                            <Grid className={classes.avatar}>

                                <img src={profileData.avatarImg.preview} className={classes.avatarImgPic} alt="Avatar"/>

                                <label style={{display: "block"}} htmlFor="icon-button-file2"
                                       className={classes.avatarImgLabel}>
                                    <Input accept="image/*" id="icon-button-file2" type="file" name="avatarImg"
                                           onChange={onFileChange}/>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera style={{color: "white"}}/>
                                    </IconButton>

                                </label>
                            </Grid>

                        </Grid>

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-around"
                            alignItems="stretch"
                            className={classes.photoMargin}>

                            <TextField
                                id="outlined-name"
                                label="Name"
                                name="name"
                                value={profileData.name}
                                onChange={handleChange}
                                className={classes.inputField}
                            />

                            <TextField
                                id="outlined-surname"
                                label="Surname"
                                name="surname"
                                value={profileData.surname}
                                onChange={handleChange}
                                className={classes.inputField}
                            />

                            <TextField
                                id="outlined-bio"
                                label="Bio"
                                name="bio"
                                value={profileData.bio}
                                onChange={handleChange}
                                className={classes.inputField}
                            />

                            <TextField
                                id="outlined-Location"
                                label="Location"
                                name="location"
                                value={profileData.location}
                                onChange={handleChange}
                                className={classes.inputField}
                            />

                            <TextField
                                id="outlined-web"
                                label="Website"
                                name="website"
                                value={profileData.website}
                                onChange={handleChange}
                                className={classes.inputField}
                            />

                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                name="birthdate"
                                sx={{width: 220}}
                                onChange={handleChangeDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={moment(profileData.birthdate, 'x').format('yyyy-MM-DD')}
                                className={classes.inputField}
                            />

                        </Grid>

                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditProfile;