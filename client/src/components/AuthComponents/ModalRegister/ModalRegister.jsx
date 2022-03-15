import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import {TEXT_COLOR_LIGHT} from "../../../material/MaterialTheme";
import Logo from "../../SvgIcons/Logo";
import Modal from "@mui/material/Modal";
import {FormControl, TextField} from "@mui/material";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import schema from "./registrationSchema";
import DatePickerComponent from "../../global/DatePickerComponent";
import {authActions} from "../../../redux/auth/action";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CloseIconMod = styled(CloseIcon)`
  cursor: pointer;
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  width: 50%;
  background-color: ${TEXT_COLOR_LIGHT};
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 1.5rem 1rem;
  height: 90vh;

  @media (min-width: 320px) and (max-width:785px) {
    width: 90%;
    padding: 1em;
    height: 95vh;
  }
  @media (min-width: 1600px) {
    height: 75vh;
  }
`;

const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BodyModal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const FormControlStyled = styled(FormControl)`
  && {
    margin-bottom: 15px;
  }
`;

const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TypographyMessage = styled(Typography)`
  && {
    margin-bottom: 1em;
    font-size: 1.2em;
    font-weight: bold
  }
`

const TypographyError = styled(Typography)`
  && {
    margin-bottom: 1em;
    font-size: 1em;
    color: red;
    font-weight: bold;
  }
`

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 2em;
`

const ModalRegister = ({ closeFn }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthdate: ""
    },

    onSubmit: values => {
      dispatch(authActions.signUp(mapToRequest(values)));
    },
    validationSchema: schema.registrationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    dirty: true
  });

  const dispatch = useDispatch();

  const mapToRequest = formikValues => {
    const {firstName, lastName, email, birthdate, password} = formikValues;
    return  {
      name: firstName,
      surname: lastName,
      email,
      birthdate,
      password
    }
  }

  const resetState = () => dispatch(authActions.resetRegisterState());

  const signupMessage = useSelector(state => state.auth.message);
  const signupError   = useSelector(state => state.auth.errors);
  const {loading}     = useSelector(state => state.auth);
  const setBirthday = isodate => {
    const date = isodate.split("T")[0];
    formik.values.birthdate = date;
  }

  return (
     <>
    <LoadingComponent visible={loading} />
    <Modal open onClose={closeFn}>
      <ModalContainer>
        <ModalWrapper>
          <HeaderModal>
            <CloseIconMod onClick={closeFn} />
            <Logo width={36} height={25} />
            <div />
          </HeaderModal>
          <BodyModal>

            {signupMessage &&
                <MessageContainer>
                  <TypographyMessage>
                    {signupMessage}
                  </TypographyMessage>

                  <Button
                      variant="outlined"
                      onClick={() => {
                        closeFn();
                        resetState();
                      }}>
                    Ok
                  </Button>
                </MessageContainer>
            }

            {signupError &&
            <MessageContainer>
              <Typography>
                Can not proceed:
              </Typography>
              <TypographyError>
                {signupError}
              </TypographyError>

              <Button
                  variant="outlined"
                  onClick={() => {
                    closeFn();
                    resetState();
                  }}>
                Ok
              </Button>

            </MessageContainer>
            }


            {!signupMessage && !signupError &&
            <form onSubmit={formik.handleSubmit}>
              <FormControlStyled
              fullWidth
              variant="standard"
              >
              <TextField
                error={formik.touched.email && formik.errors.email}
                onBlur={formik.handleBlur}
                type={"email"}
                onChange={formik.handleChange}
                value={formik.values.email}
                label="Email"
                name={"email"}
                variant="outlined"
                helperText={formik.touched.email && formik.errors.email}
              />
              </FormControlStyled>

              <FormControlStyled
                fullWidth
                variant="standard"
              >
              <TextField
                error={formik.touched.firstName && formik.errors.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                label="First name"
                name={"firstName"}
                variant="outlined"
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              </FormControlStyled>

              <FormControlStyled
                fullWidth
                variant="standard"
              >
              <TextField
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && formik.errors.lastName}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                label="Last name"
                name={"lastName"}
                variant="outlined"
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              </FormControlStyled>

              <FormControlStyled fullWidth>
              <DatePickerComponent
                disableFuture={true}
                label="Birthday"
                parentHandler={setBirthday}
              />
              </FormControlStyled>

              <FormControlStyled
                fullWidth
                variant="standard"
              >
              <TextField
                error={formik.touched.password && formik.errors.password}
                type={"password"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                label="Password"
                name={"password"}
                variant="outlined"
                helperText={formik.touched.password && formik.errors.password}
              />
              </FormControlStyled>

              <FormControlStyled
                fullWidth
                variant="standard"
              >
              <TextField
                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                onBlur={formik.handleBlur}
                type={"password"}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                label="Confirm password"
                name={"confirmPassword"}
                variant="outlined"
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
              </FormControlStyled>

              <WrapperButton>
              <Button variant="contained" type="submit">
              Continue
              </Button>
              </WrapperButton>
              </form>

            }
          </BodyModal>
        </ModalWrapper>
      </ModalContainer>
    </Modal>
     </>
  );
};

export default ModalRegister;
