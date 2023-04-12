import React from "react";
import { Field } from "formik";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import "dayjs/locale/pl";

function MuiDateTime(props) {
  const { label, name, options, margin, ...rest } = props;
  return (
    <div>
      <Field name={name} autoComplete="off">
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <LocalizationProvider
              adapterLocale={"pl"}
              {...rest}
              dateAdapter={AdapterDayjs}
            >
              <StaticDateTimePicker
                id={name}
                ampm={false}
                label={label}
                minDateTime={dayjs(Date.now())}
                slotProps={{ actionBar: { hidden: true }, toolbar: {} }}
                value={dayjs(value)}
                onChange={(newValue) => setFieldValue(name, newValue.$d)}
              />
            </LocalizationProvider>
          );
        }}
      </Field>
    </div>
  );
}

export default MuiDateTime;
