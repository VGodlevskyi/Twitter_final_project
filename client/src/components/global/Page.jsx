import React from 'react';
import {useHistory, useLocation} from "react-router";
import {useTitle} from "../../utils/useTitle";
import {Box, Tooltip} from "@mui/material";
import * as PropTypes from "prop-types";
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import CssBaseline from '@mui/material/CssBaseline';
import SideNavMobileModal from "../../modals/SideNavMobileModal/SideNavMobileModal";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {MENU_LIST} from "./SideNav";
import {NavLink} from "react-router-dom";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    width: "100%",
    borderBottom: "1px solid #eff3f4",
    position: "relative"
  },
  header: {
    width: "300px",
    display: "flex",
    alignItems: "center"
  },
  footerMobileNav: {
    position: "fixed",
    bottom: "0",
    zIndex: "8",
    display: "none",
    width: "100%",
    height: "55px",
    backgroundColor: "white",
    borderTop: "1px solid #eff3f4",
    ['@media (max-width:565px)']: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    }
  }
}))

function CircleButton(props) {
  return null;
}

CircleButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string
};
const Page = ({pageName, controls, children, backRoute}) => {
  const classes = useStyles();
  const {state} = useLocation();
  const history = useHistory();
  useTitle(pageName);

  const handleBack = () => {
    if (state?.from) {
      history.push(state.from.pathname)
    } else {
      history.push(backRoute)
    }
  }

  return (
    <div className={classes.headerContainer}>
      <CssBaseline/>
      <header className={classes.header}>
        <SideNavMobileModal/>
        <h2 style={{marginLeft: "20px"}}>{pageName}</h2>
      </header>

      {children}


    </div>
  );
};

export default Page;