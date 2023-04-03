import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import { isWymagane } from "@/_helpers";
import TextError from "./TextError";
import { SketchPicker } from "react-color";
import { MuiColorInput } from 'mui-color-input'

import reactCSS from 'reactcss'
import { InputLabel, FormControl, createTheme, ThemeProvider, CssBaseline, Typography } from "@mui/material";

function ColorPicker(props) {
  const { label, name, className, inline, wymagane, ...rest } = props;
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [mouseOver, setMouseOver] = useState(false)
  const [mouseClick, setMouseClick] = useState(false)

  const palette = {
    red: '#ff0000',
    blue: '#0000ff',
    green: '#00ff00',
    yellow: 'yellow',
    cyan: 'cyan',
    lime: 'lime',
    gray: 'gray',
    orange: 'orange',
    purple: 'purple',
    black: 'black',
    white: 'white',
    pink: 'pink',
    darkblue: 'darkblue',
  };

  const handleClick = () => {
    setMouseClick(true)
    setDisplayColorPicker(!displayColorPicker)
  };

  const handleClose = () => {
    setDisplayColorPicker(false )
  };

  window.addEventListener('click', function(e){   
    if (document.getElementById(name + "-box").contains(e.target)){
      // Clicked in box
    } else{
      setMouseClick(false)
    }
  });

  return (
    <div className={className != null ? className : "form-group col"}>
      <Field name={name} autoComplete="off">
        {(dat) => {
          const { setFieldValue } = dat.form;
          const { value } = dat.field;
          const styles = reactCSS({
            'default': {
              color: {
                width: '24px',
                height: '24px',
                borderRadius: '12px',
                background: value,
              },
              swatch: {
                padding: '4px',
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                left: "-1px",
                zIndex: '2',
                marginTop: '10px',
                width: '-webkit-fill-available',
                pointerEvents: 'all'
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
          });

return (
  <div id={name + "-box"} onMouseOver={() => setMouseOver(true)} onMouseOut={() => {setMouseOver(false)}} className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth css-1iledgx-MuiFormControl-root position-relative" onClick={handleClick}>
  <label className={mouseClick?"MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-focused MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined css-1jy569b-MuiFormLabel-root-MuiInputLabel-root": "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined css-1jy569b-MuiFormLabel-root-MuiInputLabel-root"} data-shrink="true" htmlFor="link-to-navigation-color" id="link-to-navigation-color-label">{label}</label>
  <div className={mouseClick?" MuiInputBase-root MuiOutlinedInput-root MuiOutlinedInput-notchedOutline MuiInputBase-colorPrimary MuiInputBase-fullWidth Mui-focused MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": "MuiInputBase-root MuiOutlinedInput-root MuiOutlinedInput-notchedOutline MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root"}>
    <div className="MuiInputBase-input MuiOutlinedInput-imput css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input rounded">
    <fieldset aria-hidden="true" style={mouseClick? {border: '2px solid #1976d2'}: {}} className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline  overflow-visible mui-border">
      <legend className="css-14lo706">
                    <span>{label}</span>
                  </legend>
                  <div>
                    <div className="d-flex">
                      <div style={ styles.swatch } >
                        <div style={ styles.color } />
                      </div>
                      <div className="pl-2 align-self-center">{value}</div>
                    </div>
                    {displayColorPicker ? <div style={ styles.popover }>
                      <div style={ styles.cover } onClick={handleClose}/>
                      <SketchPicker 
                      {...dat.field} 
                      {...rest}
                        id={name}
                        disableAlpha={true}
                        color={ value} 
                        onChangeComplete={(val, e) => setFieldValue(name, val.hex) } 
                      />
                    </div> : null }
                  </div>
                </fieldset>
                </div>
              </div>
            </div>
            
            // <ChromePicker
            // {...field}
            // {...rest}
            // id={name}
            // disableAlpha={true}
            // color={value}
            // //className="form-control"
            // onChangeComplete={(val, e) => setFieldValue(name, val.hex)}
            // />
          );
          return (
            <MuiColorInput
            error={form.errors[name] != null}
            label={label} 
            format={'hex'}
            id={name} 
            value={value} 
            helperText={form.errors[name]}
            isAlphaHidden={true}
            onChange={(val, e) => setFieldValue(name, e.hex) } 
            {...rest}
          />
          )

          
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
export default ColorPicker;
