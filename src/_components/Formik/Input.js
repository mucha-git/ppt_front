import React, { useState, useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { isWymagane } from "@/_helpers";

function Input(props) {
  const { label, name, className, wymagane, ...rest } = props;
  const [gwiazdka, setWymagane] = useState(wymagane ? isWymagane() : undefined);
  useEffect(() => {
    setWymagane(wymagane ? isWymagane() : undefined);
  }, [wymagane]);
  return (
    <div className={className != null ? className : "form-group col"}>
      <label htmlFor={name}>
        {label}
        {gwiazdka}
      </label>
      <Field
        id={name}
        name={name}
        {...rest}
        autoComplete="off"
        className="form-control"
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Input;
