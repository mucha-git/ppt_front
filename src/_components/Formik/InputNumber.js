import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";

function InputNumber(props) {
  const { label, name, className, wymagane, ...rest } = props;

  return (
    <div className={className != null ? className : "form-group col"}>
      <Field name={name} autoComplete="off">
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              error={form.errors[name] != null}
              helperText={form.errors[name]}
              type="number"
              id={name}
              label={label}
              value={value}
              onChange={(val) => setFieldValue(name, val.target.value)}
              {...rest}
            />
          );
        }}
      </Field>
    </div>
  );
}

export default InputNumber;
