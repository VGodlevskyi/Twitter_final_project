import * as React from 'react';
import {useState} from 'react';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {makeStyles, styled} from "@mui/styles";
import {Box, Grid, TextField} from "@mui/material";
import Media from "../../images/Tweet/Media";
import Gif from "../../images/Tweet/Gif";
import Poll from "../../images/Tweet/Poll";
import Emoji from "../../images/Tweet/Emoji";
import Schedule from "../../images/Tweet/Schedule";
import ButtonStyled from "../ButtonStyled/ButtonStyled";
import WhatsHappening from "../../images/Tweet/WhatsHappening";
import img from "../../blank.png";
import {objectToFormData} from "../../utils/formdata";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
import {postActions} from "../../redux/post/action";
import {useTheme} from "@mui/material/styles";

export default function TweetForm({number, onClose, updateRunner}) {
    const dispatch = useDispatch();
    const Input = styled('input')({
        display: 'none',
    });
    const theme = useTheme();
    const user = useSelector(state => state.auth.user);
    const classes = useStyles();
    const [data, setData] = useState({
        body: ''

    });
    const [uploadFile, setUploadFile] = useState({
        twitImg: {selectedFile: null, preview: null}
    })

    const handleChangeData = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const [openUploadImg, setOpenUploadImg] = useState(false);
    const handleClickOpen = () => {
        setOpenUploadImg(true);
    }
    const handleClose = () => {
        setOpenUploadImg(false);
        setUploadFile({twitImg: {selectedFile: null, preview: null}});
    }
    const saveTwit = (e) => {
        const formData = objectToFormData(data, '', []);
        if (uploadFile.twitImg.selectedFile) {
            formData.append('image', uploadFile.twitImg.selectedFile, uploadFile.twitImg.selectedFile.name)
        }
        if (data.body || uploadFile.twitImg.selectedFile) {
            dispatch(postActions.createPost(formData, updateRunner));
            if (onClose) onClose();
            handleClose();
            setData({body: ''});
            setUploadFile({twitImg: {selectedFile: null, preview: null}});
        }
    }

    const onFileChange = e => {
        let reader = new FileReader();
        const imgName = e.target.name;
        let file = e.target.files[0];
        reader.onloadend = () => {
            setUploadFile(prev => ({
                ...prev,
                [imgName]: {
                    selectedFile: file,
                    preview: reader.result
                }
            }));
            handleClickOpen();
        }
        reader.readAsDataURL(file);
    }

    return (
        <>
            <Grid marginLeft="8px" marginTop="10px" marginRight="5px">
                <IconButton aria-label="Avatar">
                    <Avatar src={user.avatarUrl} alt="Avatar"/>
                </IconButton>
            </Grid>

            <Grid width="500px">
                <form xs="auto" onSubmit={saveTwit}
                      noValidate autoComplete="off">
                    <TextField
                        sx={{ marginTop: '25px', paddingLeft:'8px'}}
                        style={{fontSize: theme.palette.primary.fontSizeCaption}}
                        className={classes.tweetField}
                        id="standard-textarea"
                        name="body"
                        onChange={handleChangeData}
                        value={data.body}
                        placeholder="What's happening?"
                        InputProps={{classes: {input: classes['input']}, disableUnderline: true}}
                        multiline variant="standard"
                    />
                </form>
                {openUploadImg ?
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            className={classes.iconClose}
                        >
                            <CloseIcon className={classes.closeIcon}/>
                        </IconButton>
                        <img src={uploadFile.twitImg.preview} alt="twit" className={classes.twitImg}/>
                    </> : null}
                <Grid container>
                    <IconButton disabled={true} aria-label="whats-happen"
                                sx={{ borderRadius: '20px', paddingLeft:'8px'}}>
                        <WhatsHappening/>
                        <Box className={classes.everyOneText}> Everyone can reply</Box>
                    </IconButton>
                </Grid>

                <Grid container className={classes.gridColumn}>
                    <Grid container
                          justifyContent="space-between">
                        <CardActions sx={{paddingLeft:'0px'}}>
                            <label htmlFor={"icon-button-file" + number}>
                                <Input accept="image/*" id={"icon-button-file" + number} type="file" name="twitImg"
                                       onChange={onFileChange}/>

                                <IconButton  aria-label="upload picture" component="span">
                                    <Media/>
                                </IconButton>
                            </label>
                            <IconButton className={classes.disabledIcon} disabled={true}>
                                <Gif/>
                            </IconButton>
                            <IconButton className={classes.disabledIcon} disabled={true}>
                                <Poll/>
                            </IconButton>
                            <IconButton className={classes.disabledIcon} disabled={true}>
                                <Emoji/>
                            </IconButton>
                            <IconButton className={classes.disabledIcon} disabled={true}>
                                <Schedule/>
                            </IconButton>
                        </CardActions>
                        <div>
                            <ButtonStyled onClick={saveTwit}
                                          variant="outlined"
                                          type="submit">
                                Tweet
                            </ButtonStyled>
                        </div>
                    </Grid>

                </Grid>

            </Grid>
        </>
    );
}

const useStyles = makeStyles({
    gridColumn: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        direction: 'column',

    },
    disabledIcon: {
        opacity: .5,
        margin: '0 !important',
    },
    tweetField: {
        width: '100%', border: 'none', margin: 20
    },
    'input': {
        '&::placeholder': {
            fontSize: '18px',
        }
    },
    everyOneText: {
        color: '#1E90FF',
        fontWeight: 'bold',
        marginLeft: '10px',
        fontSize: '13px'
    },
    twitImg: {
        width: 500,
        borderRadius: '20px',
        border: '0',
        p: 4
    },
    iconClose: {
        position: 'absolute',
        left: '12px',
        top: '40px'
    },
    closeIcon: {
        color: "#f7f2f2",
        borderRadius: '50%',
        backgroundColor: '#2b2828',
    }
});