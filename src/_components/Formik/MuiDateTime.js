import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import 'dayjs/locale/pl';
import FormControl from '@mui/material/FormControl';

function MuiDateTime(props) {
  const { label, name, options, margin, ...rest } = props;
  return (
    <div>
      <Field
        name={name}
        autoComplete="off"
        
      >
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <LocalizationProvider adapterLocale={"pl"} {...rest} dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              id={name}
              ampm={false}
              label={label}
              minDateTime={dayjs(Date.now())}
              slotProps={{actionBar: {hidden: true},
                          toolbar: {}}}
              value={dayjs(value)}
              onChange={(newValue) => setFieldValue(name, newValue.$d)}
            />
    </LocalizationProvider>
          )
        }}
      </Field>
    </div>
  );
}

export default MuiDateTime;
