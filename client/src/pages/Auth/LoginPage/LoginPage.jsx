import React, {useEffect, useState} from "react";
import ModalLogin from "../../../components/AuthComponents/ModalLogin/components/ModalLogin";
import {useStyles} from "./styles";
import ModalRegister from "../../../components/AuthComponents/ModalRegister/ModalRegister";
import {GOOGLE_AUTH_URL} from "../../../utils/constants";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logo from "../../../components/SvgIcons/Logo";
import useDefaultCredentials from "../../../hooks/useDefaultCredentials";
import {setAuthToken, setRefreshToken} from "../../../utils";


const LoginPage = () => {
  const {email, password} = useDefaultCredentials();
  const loginOpenDefault = email !== '' & password !== '';
  const [loginOpen, setLoginOpen]       = useState(!!loginOpenDefault);
  const [registerOpen, setRegisterOpen] = useState(false);
  const classes = useStyles();
  const toggleLoginOpen    = () => setLoginOpen(!loginOpen);
  const toggleRegisterOpen = () => setRegisterOpen(!registerOpen);

  useEffect(() => {
    setAuthToken();
    setRefreshToken();
  }, [])
  
  return (
      <>
              {loginOpen    && <ModalLogin email={email} password={password} handleClose={toggleLoginOpen} />}
              {registerOpen && <ModalRegister closeFn={toggleRegisterOpen} />}
              <div className={classes.rootContainer}>
                <div className={classes.imageWrapper} />
                <div className={classes.contentWrapper}>
                  <div className={classes.contentHeader}>
                    <div className={classes.logoWrapper}>
                      <Logo width={57} height={45} />
                    </div>
                    <div className={classes.contentTitle}>
                      <div className={classes.headerText}>
                        <Typography className={classes.headerTextTitle} variant="h1">
                          Happening now
                        </Typography>
                      </div>
                      <div>
                        <Typography className={classes.headerTextTitleSecondary} variant="h4">
                          Join Twitterapp today.
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className={classes.buttons}>
                    <a className={classes.googleLogin} href={GOOGLE_AUTH_URL()}>
                      <div className={classes.googleLoginContent}>
                        <div className={classes.googleLoginIcon}>
                          <img width={20} height={20} src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="google-login"/>
                        </div>
                        <div>
                          <Typography className={classes.googleButtonText}>
                            Sign up with Google
                          </Typography>
                        </div>
                      </div>
                    </a>
                    <div className={classes.orInsert}>
                      <div className={classes.orLineLeft} />
                      <Typography>или</Typography>
                      <div className={classes.orLineRight} />
                    </div>
                    <Button onClick={() => toggleRegisterOpen()} className={classes.registerButton} variant="contained">
                      Sign up with email
                    </Button>
                    <div className={classes.signInBlock}>
                      <Typography className={classes.alreadySignedText}>
                        Already have an account?
                      </Typography>
                      <Button onClick={() => toggleLoginOpen()} className={classes.signInButton} fullWidth variant="outlined">
                        Sign in
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
      </>
  );
};


export default LoginPage;
