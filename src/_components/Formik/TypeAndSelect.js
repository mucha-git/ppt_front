import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import Select from "react-select";
import { isWymagane } from "@/_helpers";
import { PopupWindow } from "../../views/elements/Popup";

function TypeAndSelect(props) {

  const {
    label,
    name,
    options,
    className,
    classNameSelect,
    setValue,
    value,
    wymagane,
    inline,
    placeholder,
    setLista,
    yearId,
    ...rest
  } = props;
  let propValue = value;
  const list = options//.map((x) => {
  //  return { label: x.key, value: x.value.toString() };
  //});
  const filterOption = (option, inputValue) => {
    const { label, value } = option;
    const otherKey = list.filter(
      (opt) =>
        opt.label === label &&
        opt.label
          .toUpperCase()
          .replaceAll(" ", "")
          .includes(inputValue.toUpperCase().replaceAll(" ", ""))
    );
    return value.includes(inputValue) || otherKey.length > 0;
  };

  return (
    <div>
      {inline != true ? (
        <label htmlFor={name}>
          {label}
          {wymagane ? isWymagane() : ""}
        </label>
      ) : null}
      <div style={{ display: "none" }}>
        <Field
          type="number"
          id={name}
          name={name}
          autoComplete="off"
          {...rest}
          className="form-control disabled"
        >
          {({ field }) => {
            propValue = field.value;
            return <p>{propValue}</p>;
            //}
          }}
        </Field>
      </div>
      <div>
        <div
          className={
            className != null ? className + " left" : "form-group col left"
          }
        >
          {inline == true ? (
            <div className="left mt-2">
              <label htmlFor={name}>
                {label}
                {wymagane ? isWymagane() : ""}{" "}
              </label>
            </div>
          ) : null}
          <Select
            id={"tas-" + name}
            className={inline == true ? classNameSelect : null}
            classNamePrefix={name}
            value={value ? list.filter((x) => x.value == propValue) : null}
            placeholder={
              placeholder
                ? placeholder
                : "Wybierz"
            }
            noOptionsMessage={() => {
              return "Brak opcji";
            }}
            filterOption={filterOption}
            options={list}
            onChange={(value) => {
              setValue(parseInt(value.value, 10));
            }}
          />
        </div>
        {setLista ? (
          <div className="left lh-2">
            <PopupWindow
              name={name}
              yearId={yearId}
              options={options}
              setLista={setLista}
            ></PopupWindow>
          </div>
        ) : null}
        <div className="clear" />
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default TypeAndSelect;
