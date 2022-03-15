import React, {lazy, Suspense, useMemo, useState} from "react"
import {Redirect, Switch} from "react-router-dom"
import FollowBox from "../components/FollowBox/FollowBox";
import PrivateRoute from "../components/PrivateRoute"
import {Grid} from "@mui/material";
import SideNav from "../components/global/SideNav";
import {useSelector} from "react-redux";
import {makeStyles} from "@mui/styles";
import {useLocation} from "react-router";
import MobileFooterMenu from "../components/MobileFooterMenu/MobileFooterMenu";
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import LiveNotifications from "../components/LiveNotificaions";
import CreateTweet from "../modals/CreateTweet/CreateTweet";

const routes = [
  {
    isPublic: true,
    exact: true,
    path: "/login",
    component: lazy(() => import("../pages/Auth/LoginPage/LoginPage")),
  },
  {
    isPublic: true,
    path: "/oauth2/login",
    component: lazy(() => import("../pages/Auth/OauthLogin/OauthLogin")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/home",
    component: lazy(() => import("../pages/Home")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/explore",
    component: lazy(() => import("../pages/Explore")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/notifications",
    component: lazy(() => import("../pages/Notifications")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/messages/:msgId",
    component: lazy(() => import("../pages/Messages")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/messages",
    component: lazy(() => import("../pages/Messages")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/bookmarks",
    component: lazy(() => import("../pages/Bookmarks")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/profile",
    component: lazy(() => import("../pages/Profile")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/tweet/:tweetId",
    component: lazy(() => import("../pages/TweetPage")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/user/:userId",
    component: lazy(() => import("../pages/UserPage")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/topics",
    component: lazy(() => import("../pages/Topics")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/settings",
    component: lazy(() => import("../pages/Settings")),
  },
  {
    path: "/",
    notFound: true,
  }]

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    ['@media (min-width:785px) and (max-width:1135px)']: {

    },
    ['@media (min-width:565px) and (max-width:785px)']: {
      justifyContent: "flex-start",
    },
    ['@media (max-height:500px)']: {
      justifyContent: "center",
    },
  },
  mobileDisplaySides: {
    marginTop: "10px !important",
    ['@media (max-width:565px)']: {

    },

    },
    mainContentBlock: {
        borderLeft: "3px solid #f7f7f7",
        borderRight: "3px solid #f7f7f7",
        ['@media (min-width:785px)']: {
            width: "100%",
        },
        ['@media (min-width:565px) and (max-width:785px)']: {
            width: "100%",
        },
        ['@media (max-width:565px)']: {
            width: "100%",
            paddingBottom: '55px'
        },
    },
    sticky: {
      ['@media (min-width:565px)']: {
        position: 'sticky',
        top: 0,
      },
      ['@media (max-height:500px)']: {
        position: 'static',
        top: 0,
      },
    }

});


const AppContainer = () => {
  const classes = useStyles();


  const {authorized, loading} = useSelector((state) => state.auth)

    const [openModalTweet, setOpenModalTweet] = useState(false);

    const handleOpenModalTweet = () => {
        setOpenModalTweet(true);
    };

    const handleCloseModalTweet = () => {
        setOpenModalTweet(false);
    }

  const location = useLocation();
  // const showRightContainer = !['/messages'].includes(location.pathname);
  const showRightContainer = !location.pathname.includes('messages');


  const routeComponents = useMemo(
      () =>
          routes.map(({isPublic, isAdminRoute, ...route}) => (
              <PrivateRoute key={route.path} isPublic={isPublic} isAdminRoute={isAdminRoute} {...route} />
          )),
      []
  )

  const routeContainer = (
      <Suspense fallback={<CircularProgress/>}>
        <Switch>
          {routeComponents}
          <Redirect to='/home' />
        </Switch>
      </Suspense>
  );


  if (!authorized) return routeContainer;

    return (
        <div className={classes.container}>
            <div className={classes.sticky}>
                <CssBaseline/>
                <SideNav mainBlockStyles={{marginLeft: `${showRightContainer ? "0px" : "215px"}`}}/>
                <MobileFooterMenu/>

            </div>
            <Grid className={classes.mainContentBlock} style={{maxWidth: `${showRightContainer ? "600px" : "1200px"}`}}>
                {routeContainer}
            </Grid>
            <div className={classes.sticky}>
                {showRightContainer ? <FollowBox/> : ""}
            </div>
        <LiveNotifications/>
      </div>
    )
}

export default AppContainer;