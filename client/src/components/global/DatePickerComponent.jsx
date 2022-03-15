import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import enLocale from 'date-fns/locale/en-GB';
import {useState} from "react";

export default function DatePickerComponent({label, parentHandler, disableFuture}) {

    const [value, setValue] = useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale = {enLocale}>
            <DatePicker
                label= {label}
                value={value}
                disableFuture= {disableFuture}
                onChange= {(newValue) => {
                    try {
                        setValue(newValue);
                        parentHandler(newValue.toISOString());
                    } catch (e) {}
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}