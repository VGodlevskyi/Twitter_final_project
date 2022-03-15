import React, {useMemo, useState} from 'react';
import {ThemeProvider} from "@mui/styles";
import {createTheme} from "@mui/material";
import { useContext, createContext } from 'react';

export const Context = createContext({
    color: '',
    setColor: () => {},
    fz: '',
    setFz: () => {},
});

export const BLUE = '#1d9bf0';
export const BLUE_MAIN = '#1d9bf0';
export const DARK = '#1d9bf0';
export const TEXT_COLOR = '#000';
export const TEXT_COLOR_LIGHT = '#fff';
export const RED = '#F72828';
export const GREEN = '#00E05F';

const MuiThemeProvider = ({children}) => {
    const colors = ["#1d9bf0", "#ffd400", "#f91880", "#7856ff", "#ff7a00", "#00ba7c"];
    const [color, setColor] = useState(localStorage.getItem("c") || "#1d9bf0");
    const [fz, setFz] = useState(localStorage.getItem("f") || 18);
    const value = useMemo(
        () => ({ color, setColor, fz, setFz, colors }),
        [color, fz]
    );


    const theme = {
        palette: {
            primary: {
                main: color,
                fontSizeCaption: fz,
            },
        },
    };

    return (
        <ThemeProvider theme={createTheme(theme)}>
            <Context.Provider value={value}>
                {children}
            </Context.Provider>
        </ThemeProvider>
    );
};

export default MuiThemeProvider;