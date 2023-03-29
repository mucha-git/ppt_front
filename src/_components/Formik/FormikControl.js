import React from "react";
import Input from "./Input";
import RadioButtons from "./RadioButtons";
import Select from "./Select";
import TextArea from "./TextArea";
import DatePicker from "./DatePicker";
import YearPicker from "./YearPicker";
import InputNumber from "./InputNumber";
import TypeAndSelect from "./TypeAndSelect";
import ColorPicker from "./ColorPicker"
import HtmlEditor from "./HtmlEditor";
import MuiSelect from "./MuiSelect";
import SwitchMui from "./Switch";
import MuiDateTime from "./MuiDateTime";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "inputNumber":
      return <InputNumber {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "switch":
      return <SwitchMui {...rest} />;
    case "muiSelect":
      return <MuiSelect {...rest} />
    case "typeSelect":
      return <TypeAndSelect {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "dateTime":
      return <MuiDateTime {...rest} />;
    case "year":
      return <YearPicker {...rest} />;
    case "color":
      return <ColorPicker {...rest} />;
    case "html":
      return <HtmlEditor {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
