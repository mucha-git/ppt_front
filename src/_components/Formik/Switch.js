import React from "react";
import { Field } from "formik";
import { Switch as MuiSwitch } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Tooltip } from "@mui/material";

function SwitchMui(props) {
  const {
    label,
    name,
    disabled = false,
    tooltip = "Operacja zabroniona",
    showTooltip = false,
    ...rest
  } = props;
  return (
    <Tooltip
      arrow
      componentsProps={{ tooltip: { className: "m-0" } }}
      title={tooltip}
      placement="bottom"
      disableInteractive
      disableTouchListener={!disabled && !showTooltip}
      disableHoverListener={!disabled && !showTooltip}
      disableFocusListener={!disabled && !showTooltip}
    >
      <span>
        <Field name={name} autoComplete="off">
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <Typography
                {...rest}
                component="label"
                endDecorator={
                  <MuiSwitch
                    color={value ? "success" : "neutral"}
                    checked={value}
                    variant="outlined"
                    disabled={disabled}
                    endDecorator={value ? "Włączone" : "Wyłączone"}
                    slotProps={{
                      endDecorator: {
                        sx: {
                          minWidth: 24,
                        },
                      },
                    }}
                    onChange={(event) =>
                      setFieldValue(name, event.target.checked)
                    }
                  />
                }
              >
                {label}
              </Typography>
            );
          }}
        </Field>
      </span>
    </Tooltip>
  );
}

export default SwitchMui;
