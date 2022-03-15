import React from 'react';
import {NavLink} from "react-router-dom";
import {MENU_LIST} from "../global/SideNav";
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import {useLocation} from "react-router";
import CreateTweet from "../../modals/CreateTweet/CreateTweet";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";

const useStyles = makeStyles({
    footerMobileNav: {
        position: "fixed",
        bottom: "0",
        zIndex: "999 !important",
        display: "none",
        width: "100%",
        height: "55px",
        backgroundColor: "black !important",
        borderTop: "1px solid #eff3f4",
        ['@media (max-width:565px)']: {
            // marginTop: "10px !important",
            display: "flex !important",
            justifyContent: "space-evenly !important",
            alignItems: "center !important",
            position: "fixed !important",
            bottom: "0 !important",
            zIndex: "999 !important",
            // display: "none",
            width: "100% !important",
            height: "55px !important",
            backgroundColor: "white !important",
            borderTop: "1px solid #eff3f4 !important",
        },
        ['@media (max-height:500px)']: {
            display: "none !important",
            // justifyContent: "space-between !important",
            // alignItems: "center !important",
            // position: "fixed !important",
            // bottom: "0 !important",
            // zIndex: "999 !important",
            // // display: "none",
            // width: "100% !important",
            // height: "55px !important",
            // backgroundColor: "white !important",
            // borderTop: "1px solid #eff3f4 !important",
        },
    }
});

const MobileFooterMenu = () => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const location = useLocation();
    return (
        <>
            <Grid className={classes.footerMobileNav}>
                {MENU_LIST.filter((item, i) => ["Home", "Explore", "Notifications", "Messages"].includes(item.title))
                    .map((item, i) => (
                        <NavLink key={i} to={item.link}>
                            <Tooltip title={item.title}>
                                <IconButton>
                                    {location.pathname.includes(item.link) ? item.selectedIcon : item.icon}
                                </IconButton>
                            </Tooltip>
                        </NavLink>
                    ))}
            </Grid>
            {/*<CreateTweet extraHide={!fullScreen}/>*/}
        </>
    );
};

export default MobileFooterMenu;