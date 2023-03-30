import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import {Switch as MuiSwitch} from '@mui/joy';
import Typography from '@mui/joy/Typography';

function SwitchMui(props) {
  const { label, name, ...rest } = props;
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
              <Typography {...rest} component="label" endDecorator={
                <MuiSwitch
                color={ value ? 'success' : 'neutral'}
                checked={value}
                variant="outlined"
                endDecorator={value ? 'Włączone' : 'Wyłączone'}
                slotProps={{
                  endDecorator: {
                    sx: {
                      minWidth: 24,
                    },
                  },
                }}
                onChange={(event) => setFieldValue(name, event.target.checked)}
                />
                } 
              >
                {label}
              </Typography>
          );
        }}
      </Field>
    </div>
  );
}

export default SwitchMui;
