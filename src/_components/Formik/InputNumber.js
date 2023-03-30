import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { isWymagane } from "@/_helpers";
import { Box, TextField } from "@mui/material";

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
      <Field
        name={name}
        autoComplete="off"
      >
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
              <TextField
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'  }}
                error={form.errors[name] != null}
                helperText={form.errors[name]}
                type='number'
                id={name}
                label={label}
                value={value}
                onChange={(val) => setFieldValue(name, val.target.value) }
                {...rest}
              />
          );
        }}
      </Field>
    </div>
  );
}

export default InputNumber;
