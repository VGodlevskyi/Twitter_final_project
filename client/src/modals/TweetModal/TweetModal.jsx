import React  from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { TEXT_COLOR_LIGHT } from "../../material/MaterialTheme";
import Logo from "../../components/SvgIcons/Logo";
import Modal from "@mui/material/Modal";
import { FormControl } from "@mui/material";
import TweetForm from "../../components/TweetForm/TweetForm";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ModalWrapper = styled.div`
  width: 40%;
  background-color: ${TEXT_COLOR_LIGHT};
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 1.5rem 1rem;
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


const TweetModal = ({open, onClose }) => {
    const onSubmit = values => {

    };



    return (
        <Modal open={open} onClose={onClose} >
            {/*<ModalContainer >*/}
                <ModalWrapper style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'}}>
                    <HeaderModal >
                        <CloseIcon onClick={onClose} />
                        <Logo width={36} height={25} />
                        <div />
                    </HeaderModal>
                    <BodyModal>
                        <TweetForm onClose={onClose} number={2}/>
                    </BodyModal>
                </ModalWrapper>
             {/*</ModalContainer>*/}
        </Modal>
    );
};

export default TweetModal;


