import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { isWymagane } from "@/_helpers";

function RadioButtons(props) {
  const {
    label,
    name,
    options,
    wymagane,
    className,
    podpowiedz,
    ...rest
  } = props;
  return (
    <div className={className != null ? className : "form-group col"}>
      <label htmlFor={name}>
        {label}
        {wymagane ? isWymagane() : ""}
        {
          <div className="tooltip m-2">
            ?
            <span className="tooltiptext radio-button">
              <div className="clear" />
              <p>{podpowiedz}</p>
            </span>
          </div>
        }
      </label>
      <div>
        <Field name={name} {...rest} className="form-control">
          {({ field }) => {
            return options.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <span className="p-2">
                    <input
                      type="radio"
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked={field.value === option.value}
                    />{" "}
                    <label htmlFor={option.value}>{option.key}</label>
                  </span>
                </React.Fragment>
              );
            });
          }}
        </Field>
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default RadioButtons;
