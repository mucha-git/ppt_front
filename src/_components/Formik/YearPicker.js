import React from "react";
import { Field } from "formik";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function YearPicker(props) {
  const {
    label,
    name,
    className,
    inline,
    wymagane,
    excluded = [],
    ...rest
  } = props;
  return (
    <div className={className != null ? className : "form-group col"}>
      <Field name={name} autoComplete="off">
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                defaultValue={dayjs(value)}
                label={label}
                views={["year"]}
                minDate={dayjs(new Date().getFullYear().toString())}
                shouldDisableYear={(year) =>
                  excluded.find((y) => y == year.year())
                }
                onChange={(val) => setFieldValue(name, val.$y)}
                {...rest}
              />
            </LocalizationProvider>
          );
        }}
      </Field>
    </div>
  );
}
export default YearPicker;
