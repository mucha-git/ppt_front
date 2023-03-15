import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { isWymagane } from "@/_helpers";

function Select(props) {
  const { label, name, options, className, wymagane, showLabel, ...rest } = props;
  return (
    <div className={className != null ? className : "form-group col"}>
      {showLabel != false && (<label htmlFor={name}>
        {label}
        {wymagane ? isWymagane() : ""}
      </label>)}
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        autoComplete="off"
        className={"form-control "}
      >
        {options.map((option) => {
          return (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          );
        })}
      </Field>
      <div className="clear" />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Select;
