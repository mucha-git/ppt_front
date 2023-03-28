import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function MuiSelect(props) {
  const { label, name, options, margin, ...rest } = props;
  return (
    <div>
      <Field
        name={name}
        autoComplete="off"
        
      >
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <FormControl margin={margin} {...rest} >
              <InputLabel id={name + "-label"}>{label}</InputLabel>
              <Select
                labelId={name + "-label"}
                label={label}
                id={name}
                value={value}
                onChange={(val) => {
                  setFieldValue(name, val.target.value) }}
                {...rest} 
              >
                {options.map((option) => {
                  return <MenuItem key={option.value} value={option.value}>{option.key}</MenuItem>
                })}
              </Select>
            </FormControl>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default MuiSelect;
