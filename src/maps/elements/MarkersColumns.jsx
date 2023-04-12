import React from "react";
import PropTypes from "prop-types";
import { Type } from "@musicstory/react-bootstrap-table2-editor";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const kolumny = {
  KolumnaTitle,
  KolumnaDescription,
  KolumnaPinId,
};

function KolumnaTitle() {
  return {
    dataField: "title",
    text: "Tytuł",
    classes: "tdClassesMarkers p-3",
    editCellClasses: "editorClassesMarkers m-3",
    editable: true,
    editor: {
      type: Type.TEXTAREA,
    },
    editorClasses: "shadow-none",
  };
}

function KolumnaDescription() {
  return {
    dataField: "description",
    text: "Opis",
    classes: "tdClassesMarkers p-3",
    editCellClasses: "editorClassesMarkers m-3",
    editable: true,
    editor: {
      type: Type.TEXTAREA,
    },
    editorClasses: "shadow-none",
  };
}

function KolumnaPinId(options) {
  return {
    dataField: "pinId",
    text: "Pinezka",
    classes: "tdClassesMarkers p-3",
    formatter: (cell) => {
      return <img src={options.find((f) => f.id == cell)?.pinSrc} width={20} />;
    },
    headerStyle: { width: "70px" },
    editable: true,
    editCellClasses: "editorClassesMarkers",
    editorRenderer: (
      editorProps,
      value,
      row,
      column,
      rowIndex,
      columnIndex
    ) => (
      <QualityRanger
        {...editorProps}
        value={value}
        options={options}
        column={column}
      />
    ),
  };
}

class QualityRanger extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
  };
  static defaultProps = {
    value: 0,
  };

  render() {
    const { value, options, column, onUpdate, ...rest } = this.props;
    return (
      <Select
        {...rest}
        value={value}
        onChange={(val) => onUpdate(val.target.value)}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.id} value={option.id}>
              <img src={option.pinSrc} width={20} />
            </MenuItem>
          );
        })}
      </Select>
    );
  }
}
