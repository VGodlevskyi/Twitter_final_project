import React from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import {makeStyles} from "@mui/styles";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import IconButton from "@mui/material/IconButton";
import DeleteTweetModal from "../../modals/DeleteTweetModal/DeleteTweetModal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CardActions from "@mui/material/CardActions";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import moment from "moment";

const useStyles = makeStyles({
    buttonBlock: {
        display: "flex !important",
        justifyContent: "space-evenly !important",
        alignItems: "center !important"
    },
    main: {
        borderBottom: "1px solid #eff3f4 !important",
        boxShadow: "none !important",
    },
    tweetBody: {
        color: 'black !important',
        fontSize: '12px !important',
        fontWeight: '400 !important'
    },
    follow: {
        marginLeft: "5px !important",
        color: "#677682 !important",
        fontSize: "16px !important"
    },

});

const Comment = ({data}) => {
    const classes = useStyles();

    return (
            <Card sx={{minHeight: 100}} className={classes.main}>
                <CardHeader
                    avatar={<ProfileAvatar route={`/user/${data.authorId}`} img={data.postedByAvatar} />}
                    title={data.postedByName}
                    subheader={moment(data.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}
                    // action={}
                    // <DeleteTweetModal actionPic={<ClearRoundedIcon style={{color: "red"}} />}/>
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" className={classes.tweetBody}>
                        {data.body}
                    </Typography>
                </CardContent>
            </Card>
    );
};

export default Comment;