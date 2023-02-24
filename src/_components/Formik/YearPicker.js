import React from "react";
import DateView, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import { isWymagane } from "@/_helpers";
import TextError from "./TextError";
import pl from "date-fns/locale/pl"; // the locale you want

registerLocale("pl", pl); // register it with the name you want
function YearPicker(props) {
  const { label, name, className, inline, wymagane, ...rest } = props;
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
          return (
            <DateView
              className="form-control"
              locale="pl"
              autoComplete="off"
              dateFormat="yyyy"
              placeholderText={"Wybierz rok"}
              todayButton={"Aktualny rok"}
              id={name}
              {...field}
              {...rest}
              //inline={inline == null}
              selected={value}
              showYearPicker
              showFullYearPicker
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
export default YearPicker;
