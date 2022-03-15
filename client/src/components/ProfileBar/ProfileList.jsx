import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ProfileAvatar from "./ProfileAvatar";

export default function ProfileList({user, logoutCallback}) {
    return (
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.white', borderRadius: '20px'}}>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ProfileAvatar/>
                            </ListItemIcon>
                            <ListItemText primary={`${user.name} ${user.surname}`}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Divider/>
            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding onClick={logoutCallback}>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemText primary="Logout"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    );
}