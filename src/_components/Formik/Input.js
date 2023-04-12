import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";

function Input(props) {
  const { label, name, className, wymagane, ...rest } = props;

  return (
    <div className={className != null ? className : "form-group col"}>
      <Field name={name} autoComplete="off">
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;

          const setValue = (val) => {
            if (val.includes("https://drive.google.com/file/d/")) {
              val = val.replace("https://drive.google.com/file/d/", "");
              val = val.split("/")[0];
              val = "http://drive.google.com/uc?export=view&id=" + val;
            }
            setFieldValue(name, val);
          };
          return (
            <TextField
              id={name}
              error={form.errors[name] != null}
              value={value}
              label={label}
              variant="outlined"
              onChange={(val) =>
                setValue(val.target.value.replace(/^\s+/g, ""))
              }
              helperText={form.errors[name]}
              {...rest}
            />
          );
        }}
      </Field>
    </div>
  );
}

export default Input;
