import {createTheme} from "@mui/material";

export const BLUE = '#1d9bf0';
export const BLUE_MAIN = '#1d9bf0';
export const DARK = '#1d9bf0';
export const TEXT_COLOR = '#000';
export const TEXT_COLOR_LIGHT = '#fff';
export const RED = '#F72828';
export const GREEN = '#00E05F';

export const defaultThemeOptions = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: BLUE,
            dark: BLUE,
        },
        secondary: {
            main: TEXT_COLOR_LIGHT,
            dark: TEXT_COLOR_LIGHT,
        },
        error: {
            main: RED,
            dark: RED,
        },
        warning: {
            main: BLUE_MAIN,
            dark: BLUE_MAIN,
        },
        info: {
            main: '#ff0000',
            dark: '#ff0000',
        },
        success: {
            main: GREEN,
            dark: GREEN,
        },
        background: {
            paper: BLUE,
            default: DARK,
        },
        text: {
            primary: TEXT_COLOR,
            secondary: BLUE,
            hint: DARK,
        },
        mode: 'light'
    },

    shape: {
        borderRadius: 10,
    },

    typography: {
        htmlFontSize: 12,
        fontFamily: 'Roboto',
    },
});

export const hexToRGBa = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
        return `rgb(${r}, ${g}, ${b})`;
    }
};