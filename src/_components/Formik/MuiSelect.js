import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { isWymagane } from "@/_helpers";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function MuiSelect(props) {
  const { label, name, options, className, wymagane, showLabel, ...rest } = props;
  return (
    <div>
      <Field
        name={name}
        autoComplete="off"
        {...rest}
      >
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id={name + "-label"}>{label}</InputLabel>
              <Select
                labelId={name + "-label"}
                id={name}
                value={value}
                onChange={(val) => setFieldValue(name, val) }
              >
                {options.map((option) => {
                  return <MenuItem value={option.value}>{option.key}</MenuItem>
                })}
              </Select>
            </FormControl>
          );
        }}
      </Field>
      <div className="clear" />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default MuiSelect;
