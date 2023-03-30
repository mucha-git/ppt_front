import React from "react";
import DateView, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import { isWymagane } from "@/_helpers";
import TextError from "./TextError";
import pl from "date-fns/locale/pl"; // the locale you want

registerLocale("pl", pl); // register it with the name you want
function DatePicker(props) {
  const {
    label,
    name,
    className,
    inline,
    wymagane,
    setValue,
    ...rest
  } = props;
  return (
    <div className={className != null ? className : "form-group col"}>
      {inline == null ? (
        <div>
          <label htmlFor={name}>
            {label}
            {wymagane ? isWymagane() : ""}{" "}
          </label>
        </div>
      ) : (
        <label htmlFor={name}>
          {label + " "}
          {wymagane ? isWymagane() : ""}{" "}
        </label>
      )}
      <Field name={name} className="form-control">
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              className="form-control"
              locale="pl"
              autoComplete="off"
              dateFormat="yyyy-MM-dd"
              placeholderText={"Podaj datę"}
              todayButton={"Dziś"}
              id={name}
              {...field}
              {...rest}
              inline={inline == null}
              selected={value}
              onChange={(val) => {
                setFieldValue(name, val);
              }}
            />
          );
        }}
      </Field>
    </div>
  );
}
export default DatePicker;
