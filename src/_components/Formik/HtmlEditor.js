import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import { isWymagane } from "@/_helpers";
import TextError from "./TextError";
import { TextEditor } from "./Editor";

function HtmlEditor(props) {
  const { label, name, className, inline, wymagane, ...rest } = props;
  return (
    <div className={className != null ? className : "form-group col"}>
      {inline == null ? (
        <div>
          <label htmlFor={name}>
            {label}
            {wymagane ? isWymagane() : ""}
          </label>
        </div>
      ) : (
        <label htmlFor={name}>
          {label}
          {wymagane ? isWymagane() : ""}
        </label>
      )}
      <Field name={name} autoComplete="off">
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <TextEditor
              setFieldValue={(val) => setFieldValue(name, val)}
              value={value}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
export default HtmlEditor;
