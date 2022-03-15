import React from "react";
import useProfile from "../../hooks/useProfile";
import {makeStyles} from "@mui/styles";
import {ReactComponent as DotsIcon} from './dots.svg';
import {Popover} from "@mui/material";
import ProfileList from "./ProfileList";
import ProfileAvatar from "./ProfileAvatar";


const useStyles = makeStyles({
    profileBarContainer: {
        display: 'grid',
        minWidth: '270px',
        gridTemplateColumns: '40px 1fr 30px',
        alignItems: 'center',
        fontSize: '18px',
        gap: '12px',
        marginTop: '50px',
        borderRadius: '34px',
        padding: '12px',
        cursor: 'pointer',

        ['&:hover']: {
            background: 'rgba(217,217,217,0.1)',
        },

        ['& > p']: {
            fontWeight: 'bold',
        }
    },
    popover: {
        ['& > .MuiPaper-rounded']: {
            borderRadius: '20px',
        }
    }
})


const ProfileFullName = ({name, surname}) => {
    return <p>{name} {surname}</p>
}

const ProfileBarToggle = () => {
    return <DotsIcon/>;
}


const ProfileBar = () => {
    const classes = useStyles();
    const {user, logoutCallback} = useProfile();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <div className={classes.profileBarContainer} onClick={handleClick}>
                <ProfileAvatar/>
                <ProfileFullName {...user}/>
                <ProfileBarToggle/>
            </div>
            <Popover
                id={id}
                open={open}
                className={classes.popover}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <ProfileList user={user} logoutCallback={logoutCallback}/>
            </Popover>
        </>
    )
}

export default ProfileBar;