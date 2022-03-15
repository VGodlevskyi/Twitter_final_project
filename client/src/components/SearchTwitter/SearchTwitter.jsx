import React, {useEffect, useMemo, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {makeStyles} from "@mui/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import axios from "axios";
import {useFetch} from "../../hooks/useFetch";
import api from "../../services/API";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import img from "../../blank.png";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import {NavLink} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import {useSelector} from "react-redux";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import debounce from 'lodash.debounce';

const icon = <CancelRoundedIcon fontSize="small" />;


const useStyles = makeStyles({
    searchByName: {
        width: "100% !important"
    },
    textField: {
        borderRadius: "30px !important",
        border: "0",
        outline: "none !important",
        backgroundColor: "#eff3f4",
        '&.Mui-focused': {
            backgroundColor: "white",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid transparent",
        },

    },

});


const SearchTwitter = () => {
    const  classes = useStyles();
    const [searchResult, setSearchResult] = useState([]);

    const user = useSelector(state => state.auth.user);

    const handleChange = (e) => {
        if (!e.target.value) return setSearchResult([]);
        api.get(`/users/find?user=${e.target.value}&size=${5}&page=${0}`).then(r => setSearchResult(r.list.filter(i => i.id !== user.id)));
    };

    const debouncedChangeHandler = useMemo(
        () => debounce(handleChange, 300)
        , []);

    useEffect(() => {
        return () => {
            debouncedChangeHandler.cancel();
        }
    }, []);

    return (
        <Autocomplete
            className={classes.searchByName}

            freeSolo
            id="search-twitter-by-name"
            disableClearable
            options={searchResult.map((option) => ({
                name: option.name,
                avatarUrl: option.avatarUrl,
                id: option.id,
            }))}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => {
                return (
                    <NavLink style={{color: "black", textDecoration: "none"}} key={option.id} to={`/user/${option.id}`}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar src={option.avatarUrl}/>
                            </ListItemAvatar>

                            <ListItemText primary={option.name} />
                        </ListItem>
                    </NavLink>)
            }}

            renderInput={(params) => (
                <TextField
                    className={classes.textField}
                    {...params}
                    placeholder="Search Twitter"
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        startAdornment: <InputAdornment variant="standard" position="start"><SearchRoundedIcon /></InputAdornment>,
                        disableUnderline: true,
                        style: {border: "none !important"},
                        className: classes.textField,
                        onChange: debouncedChangeHandler
                    }}
                />
            )}
            clearIcon={icon}
        />
    );
};

export default SearchTwitter;