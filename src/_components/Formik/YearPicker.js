import React from "react";
import { Field, ErrorMessage } from "formik";
import { isWymagane } from "@/_helpers";
import TextError from "./TextError";
import dayjs from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function YearPicker(props) {
  const { label, name, className, inline, wymagane, excluded = [], ...rest } = props;
  return (
    <div className={className != null ? className : "form-group col"}>
      {inline == null ? (
        <div>
          <label htmlFor={name}>
            {label}
            {wymagane ? isWymagane() : ""}
          </label>
        </div>
      ) : (
        <label htmlFor={name}>
          {label}
          {wymagane ? isWymagane() : ""}
        </label>
      )}
      <Field name={name} autoComplete="off">
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker defaultValue={dayjs(value) } label={label} views={['year']} 
                  //onChange={(val) => {
                  //    console.log(val)
                  //    setFieldValue(name, val.$y.toString())
                  //  }}
                    minDate={dayjs(new Date().getFullYear().toString())}
                    shouldDisableYear={(year) => excluded.find(y => y == year.year()) }
                  />
                </LocalizationProvider>
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
export default YearPicker;
