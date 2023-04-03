import React from 'react';
import PropTypes from "prop-types";
import DefaultTableView from '../../_components/DefaultTableView';
import  { Type } from '@musicstory/react-bootstrap-table2-editor';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useGridApiContext } from '@mui/x-data-grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const kolumny = {
    KolumnaTitle,
    KolumnaDescription,
    KolumnaPinId
}

function KolumnaTitle(){return{
        dataField: "title",
        text: "Tytuł",
        classes: "tdClassesMarkers p-3",
        editCellClasses: "editorClassesMarkers m-3",
        //headerClasses: "header-class",
        editable: true,
        editor: {
            type: Type.TEXTAREA
          },
        editorClasses: "shadow-none"
    }}

function KolumnaDescription(){return{
        dataField: "description",
        text: "Opis",
        classes: "tdClassesMarkers p-3",
        editCellClasses: "editorClassesMarkers m-3",
        //headerClasses: "header-class",
        editable: true,
        editor: {
            type: Type.TEXTAREA,
            
          },
        editorClasses: "shadow-none"
    }}

function KolumnaPinId(options){return{
        dataField: "pinId",
        text: "Pinezka",
        classes: "tdClassesMarkers p-3",
        //classes: "height1 pt-3 pb-3",
        //headerClasses: "header-class",
        formatter: (cell) => {
            return <img src={options.find(f => f.id == cell)?.pinSrc} width={20} />
        },
        headerStyle: { width: "70px"},
        editable: true,
        editCellClasses: "editorClassesMarkers",
        editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
            <QualityRanger { ...editorProps } value={ value } options={options} column={column} />
        )
        // editor: {
        //     type: Type.SELECT,
        //     options: options.map(m => { return {value: m.id, label: m.name}}) 
        //   }
    }}


    class QualityRanger extends React.Component {
        static propTypes = {
          value: PropTypes.number,
          onUpdate: PropTypes.func.isRequired
        }
        static defaultProps = {
          value: 0
        }

        render() {
          const { value, options, column, onUpdate, ...rest } = this.props;
          return (<Select
                {...rest}
                //key="id"
                //ef={ node => this.range = node }
                //name={rowIndex}
                value={value}
                onChange={(val) => onUpdate(val.target.value)}
              >
                {options.map((option) => {
                  return <MenuItem key={option.id} value={option.id}><img src={option.pinSrc} width={20} /></MenuItem>
                })}
              </Select>)
        }
      }



    export const kolumnyMui = {
        KolumnaTitleMui,
        KolumnaDescriptionMui,
        KolumnaPinIdMui
    }
    
    function KolumnaTitleMui(){return{
            field: "title",
            headerName: "Tytuł",
            // headerClasses: "header-class",
            editable: true,
            // editor: {
            //     type: Type.TEXTAREA
            //   }
        }}
    
    function KolumnaDescriptionMui(){return{
            field: "description",
            headerName: "Opis",
            editable: true
            // headerClasses: "header-class",
            // editable: true,
            // editor: {
            //     type: Type.TEXTAREA,
    
            //   }
        }}
    
    function KolumnaPinIdMui(options){
        return{
            field: "pinId",
            width: 70,
            headerName: "Pinezka",
            editable: true,
            //classes: "height1 pt-3 pb-3",
            //headerClasses: "header-class",
            renderCell: (params) => {
                return <img src={options.find(f => f.id == params.value)?.pinSrc} width={20} />
            },
            renderEditCell: (params) => {
                const { id, value, field } = params;
                const apiRef = useGridApiContext();
              
                const handleChange = (newValue) => {
                  apiRef.current.setEditCellValue({ id, field, value: newValue });
                };
                return (
                    <Select
                    name={"mapPins"}
                    value={value}
                    onChange={(val) => handleChange(val.target.value)}
                  >
                    {options.map((option) => {
                      return <MenuItem key={option.id} value={option.id}><img src={option.pinSrc} width={20} /></MenuItem>
                    })}
                  </Select>
                );
            },
            //headerStyle: { width: "110px"},
            //editable: true,
            //editor: {
            //    type: Type.SELECT,
            //    options: options.map(m => { return {value: m.id, label: m.name}}) 
            //  }
        }}

        const renderRatingEditInputCell = (params, options) => {
            return RatingEditInputCell(params, options );
          };

        function RatingEditInputCell(props, options) {
            
          }