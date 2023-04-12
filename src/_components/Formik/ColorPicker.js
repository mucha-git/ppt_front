import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { MuiColorInput } from "mui-color-input";

function ColorPicker(props) {
  const { label, name, className, inline, wymagane, ...rest } = props;

  return (
    <div className={className != null ? className : "form-group col"}>
      <Field name={name} autoComplete="off">
        {(dat) => {
          const { setFieldValue } = dat.form;
          const { value } = dat.field;
          return (
            <MuiColorInput
              error={dat.form.errors[name] != null}
              label={label}
              format={"hex"}
              id={name}
              value={value}
              helperText={dat.form.errors[name]}
              isAlphaHidden={true}
              onChange={(val, e) => setFieldValue(name, e.hex)}
              {...rest}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
export default ColorPicker;
