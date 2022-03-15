import React from "react";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/styles";

const ButtonStyled = ({children, ...rest}) => {
    const theme = useTheme();
    return (
        <Button fullWidth variant={rest.variant || 'outlined'} type={"submit"}
                style={{
                    borderRadius: '20px',
                    marginBottom: '1rem',
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    backgroundColor: theme.palette.primary.main
                }} {...rest}>
            {children}
        </Button>
    );
};

export default ButtonStyled;
