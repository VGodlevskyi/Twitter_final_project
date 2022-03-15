import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ListItemButton from "@mui/material/ListItemButton";
import {IconButton, ListItem, ListItemIcon, ListItemText, Slider} from "@mui/material";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import {makeStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import {useContext, useState} from "react";
import Box from "@mui/material/Box";
import {Context} from "../../components/global/MuiThemeProvider";

const useStyles = makeStyles({
    colorsBg: {
        maxWidth: "400px !important",
        height: "55px !important",
        display: "flex !important",
        flexDirection: "row !important",
        justifyContent: "space-around !important",
        alignItems: "center !important",
        backgroundColor: "#f7f9f9 !important",
        borderRadius: "15px !important"
    },
    colorPick: {
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        display: "flex !important",
        justifyContent: "center !important",
        alignItems: "center !important",
    },
    caption: {
        fontWeight: "700",
        color: "#677682"
    },
    closeBtn: {
        borderRadius: "20px !important",
        backgroundColor: "red !important"
    },
    okBtn: {
        borderRadius: "20px !important",
    }
});

export default function ChangeTheme() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const {color, fz, setFz, setColor, colors} = useContext(Context);

    const colorIndex = colors.indexOf(color);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const choseColorForTheme = (i, color) => {
        setColor(color);

        localStorage.setItem("c", color);
    };

    const handleSlide = (e) => {
        setFz(e.target.value);

        localStorage.setItem("f", fz);
    };

    return (
        <div>
            <ListItem disablePadding secondaryAction={<IconButton disabled><ChevronRightRoundedIcon /></IconButton>}>
                <ListItemButton onClick={handleClickOpen}>
                    <ListItemText primary="Change theme" />
                </ListItemButton>
            </ListItem>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="changeTheme"
                PaperProps={{style: { borderRadius: `${fullScreen ? "0" : "20px"}`,}}}
            >
                <DialogTitle id="changeTheme">
                    {"Choose new theme"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span className={classes.caption}>Font size</span>
                        <Grid className={classes.colorsBg}>
                            <Box sx={{ width: 300, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <span style={{fontSize: "12px"}}>Aa</span>
                                <Slider
                                    aria-label="Temperature"
                                    defaultValue={18}
                                    step={3}
                                    marks
                                    min={18}
                                    max={24}
                                    style={{margin: "0 20px"}}
                                    onChange={handleSlide}
                                />
                                <span style={{fontSize: "24px"}}>Aa</span>
                            </Box>

                        </Grid>

                        <span className={classes.caption}>Color</span>
                        <Grid className={classes.colorsBg}>
                            {colors.map((item, i) => (i === colorIndex ?
                                <Grid onClick={() => choseColorForTheme(i, item)} key={i} style={{backgroundColor: `${item}`}} className={classes.colorPick}> <DoneRoundedIcon fontSize="large" sx={{color: "white"}}/> </Grid>
                                :
                                <Grid onClick={() => choseColorForTheme(i, item)} key={i} style={{backgroundColor: `${item}`}} className={classes.colorPick}/>
                                ))}
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.closeBtn} variant="contained" autoFocus onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={classes.okBtn} style={{backgroundColor: theme.palette.primary.main}} variant="contained" onClick={handleClose} autoFocus>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}