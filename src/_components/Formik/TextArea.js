import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { isWymagane } from "@/_helpers";

function TextArea(props) {
  const { label, name, wymagane, ...rest } = props;
  return (
    <div className="form-group col">
      <label htmlFor={name}>
        {label}
        {wymagane ? isWymagane() : ""}
      </label>
      <Field
        component="textarea"
        rows="6"
        id={name}
        name={name}
        autoComplete="off"
        className="form-control"
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default TextArea;
