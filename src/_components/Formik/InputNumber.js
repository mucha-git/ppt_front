import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { isWymagane } from "@/_helpers";

function InputNumber(props) {
  const { label, name, className, wymagane, ...rest } = props;
  let myNumber = document.getElementById(name);
  if (myNumber != null) {
    let v = commify(myNumber.value);
  }

  function commify(value) {
    var chars = value.split("").reverse();
    var withCommas = [];
    for (var i = 1; i <= chars.length; i++) {
      withCommas.push(chars[i - 1]);
      if (i % 3 == 0 && i != chars.length) {
        withCommas.push(" ");
      }
    }
    var val = withCommas.reverse().join("");
    if (myNumber != null) myNumber.parentNode.setAttribute("comma-value", val);
  }

  return (
    <div className={className != null ? className : "form-group col"}>
      <label htmlFor={name}>
        {label}
        {wymagane ? isWymagane() : ""}
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

export default InputNumber;
